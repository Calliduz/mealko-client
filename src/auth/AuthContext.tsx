import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut,
  updateProfile
} from 'firebase/auth';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { auth, onAuthChange } from './firebase';

// Web-safe storage helpers since expo-secure-store throws on Web platform
const setAuthToken = async (token: string) => {
  if (Platform.OS === 'web') {
    try {
      localStorage.setItem('auth_token', token);
    } catch (e) {}
  } else {
    await SecureStore.setItemAsync('auth_token', token);
  }
};

const getAuthToken = async (): Promise<string | null> => {
  if (Platform.OS === 'web') {
    try {
      return localStorage.getItem('auth_token');
    } catch (e) {
      return null;
    }
  } else {
    return await SecureStore.getItemAsync('auth_token');
  }
};

const deleteAuthToken = async () => {
  if (Platform.OS === 'web') {
    try {
      localStorage.removeItem('auth_token');
    } catch (e) {}
  } else {
    await SecureStore.deleteItemAsync('auth_token');
  }
};

interface AuthContextType {
  user: User | null;
  idToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signUp: (email: string, password: string, displayName?: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInMock: (mockUserId: string) => Promise<void>;
}

const mockUsersList = [
  {
    uid: 'mock-user-1',
    email: 'alice@mealko.com',
    displayName: 'Alice Meal Planner',
  },
  {
    uid: 'mock-user-2',
    email: 'bob@mealko.com',
    displayName: 'Bob Meal Planner',
  },
  {
    uid: 'mock-user-3',
    email: 'charlie@mealko.com',
    displayName: 'Charlie Meal Planner',
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for cached token on startup
    async function loadCachedToken() {
      try {
        const cachedToken = await getAuthToken();
        if (cachedToken) {
          setIdToken(cachedToken);
          if (cachedToken.startsWith('mock-user-')) {
            const mockUserData = mockUsersList.find(u => u.uid === cachedToken);
            if (mockUserData) {
              const mockFirebaseUser = {
                uid: mockUserData.uid,
                email: mockUserData.email,
                displayName: mockUserData.displayName,
                getIdToken: async () => mockUserData.uid,
              } as any;
              setUser(mockFirebaseUser);
              setIsAuthenticated(true);
            }
          }
        }
      } catch (err) {
        console.error('Failed to load cached auth token:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadCachedToken();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      // If we have a cached mock token, do not let standard firebase listener clear it
      const currentToken = await getAuthToken();
      if (currentToken && currentToken.startsWith('mock-user-')) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken(true);
          await setAuthToken(token);
          setIdToken(token);
          setUser(firebaseUser);

          // Provision user in Neon DB
          const response = await fetch(`${API_URL}/auth/provision`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
            }),
          });

          if (!response.ok) {
            console.error('Failed to provision user in Neon DB:', response.status);
          }

          setIsAuthenticated(true);
        } catch (err) {
          console.error('Error handling auth state change:', err);
          setIsAuthenticated(false);
          setUser(null);
          setIdToken(null);
        }
      } else {
        await deleteAuthToken();
        setUser(null);
        setIdToken(null);
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string, displayName?: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName && userCredential.user) {
        await updateProfile(userCredential.user, { displayName });
      }
    } catch (error) {
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  const signInMock = async (mockUserId: string) => {
    try {
      const mockUserData = mockUsersList.find(u => u.uid === mockUserId);
      if (!mockUserData) {
        throw new Error(`Mock user ${mockUserId} not found.`);
      }

      const mockFirebaseUser = {
        uid: mockUserData.uid,
        email: mockUserData.email,
        displayName: mockUserData.displayName,
        getIdToken: async () => mockUserData.uid,
      } as any;

      const token = mockUserData.uid;
      await setAuthToken(token);
      setIdToken(token);
      setUser(mockFirebaseUser);

      // Provision user in Neon DB
      const response = await fetch(`${API_URL}/auth/provision`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: mockFirebaseUser.email,
          displayName: mockFirebaseUser.displayName,
        }),
      });

      if (!response.ok) {
        console.error('Failed to provision user in Neon DB:', response.status);
      }

      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error during mock sign in:', error);
      setIsAuthenticated(false);
      setUser(null);
      setIdToken(null);
      throw error;
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      const cachedToken = await getAuthToken();
      if (cachedToken && cachedToken.startsWith('mock-user-')) {
        await deleteAuthToken();
        setUser(null);
        setIdToken(null);
        setIsAuthenticated(false);
      } else {
        await firebaseSignOut(auth);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        idToken,
        isAuthenticated,
        isLoading,
        signUp,
        signIn,
        signOut,
        signInMock,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

