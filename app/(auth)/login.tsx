import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { YStack, XStack, Text, Input, Button, H1, Spinner } from 'tamagui';
import { useAuth } from '../../src/auth/AuthContext';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await signIn(email, password);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    // Placeholder for native Google Sign-in trigger
    setError('Google Sign-In will be initialized on the device using Google Play Services.');
  };

  return (
    <YStack style={{ flex: 1, backgroundColor: '#121212', justifyContent: 'center', padding: 24 }}>
      <YStack style={{ gap: 24, maxWidth: 400, width: '100%', alignSelf: 'center' }}>
        <YStack style={{ alignItems: 'center', gap: 8 }}>
          <Text style={{ fontSize: 48 }}>🥗</Text>
          <H1 style={{ color: '#ffffff', fontWeight: 'bold' }}>Welcome to MealKo</H1>
          <Text style={{ color: '#aaaaaa', fontSize: 16 }}>Sign in to plan your meals</Text>
        </YStack>

        <YStack style={{ gap: 12 }}>
          {error && (
            <Text style={{ color: '#ff4d4d', fontSize: 14, textAlign: 'center' }}>
              {error}
            </Text>
          )}

          <Input
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={{ backgroundColor: '#1e1e1e', borderColor: '#333333', color: '#ffffff' }}
          />

          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            style={{ backgroundColor: '#1e1e1e', borderColor: '#333333', color: '#ffffff' }}
          />

          <Button
            onPress={handleLogin}
            disabled={loading}
            style={{ backgroundColor: '#ffffff', color: '#121212', fontWeight: 'bold', marginTop: 12 }}
          >
            {loading ? <Spinner color="#121212" /> : 'Sign In'}
          </Button>

          <Button
            onPress={handleGoogleSignIn}
            style={{ backgroundColor: '#4285F4', color: '#ffffff', fontWeight: 'bold', marginTop: 8 }}
          >
            Sign In with Google
          </Button>
        </YStack>

        <XStack style={{ justifyContent: 'center', gap: 6, marginTop: 16 }}>
          <Text style={{ color: '#aaaaaa' }}>Don't have an account?</Text>
          <Text
            onPress={() => router.push('/signup')}
            style={{ color: '#ffffff', fontWeight: 'bold', textDecorationLine: 'underline' }}
          >
            Sign Up
          </Text>
        </XStack>
      </YStack>
    </YStack>
  );
}
