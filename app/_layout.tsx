import { Slot, useRouter, useSegments } from 'expo-router';
import { TamaguiProvider, YStack, Spinner } from 'tamagui';
import { useEffect } from 'react';
import tamaguiConfig from '../src/theme/tamagui.config';
import { AuthProvider, useAuth } from '../src/auth/AuthContext';
import { StatusBar } from 'expo-status-bar';

function AuthGuard() {
  const { isAuthenticated, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    // Check if we are inside the (auth) route group
    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && !inAuthGroup) {
      // Redirect to login if user is not authenticated and trying to access private routes
      router.replace('/login');
    } else if (isAuthenticated && inAuthGroup) {
      // Redirect to home if user is authenticated and trying to access login/signup
      router.replace('/');
    }
  }, [isAuthenticated, isLoading, segments]);

  if (isLoading) {
    return (
      <YStack style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#121212' }}>
        <Spinner size="large" color="#ffffff" />
      </YStack>
    );
  }

  return <Slot />;
}

export default function RootLayout() {
  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="dark">
      <StatusBar style="light" />
      <AuthProvider>
        <AuthGuard />
      </AuthProvider>
    </TamaguiProvider>
  );
}
