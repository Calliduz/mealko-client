import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { YStack, XStack, Text, Input, Button, H1, Spinner } from 'tamagui';
import { useAuth } from '../../src/auth/AuthContext';

export default function SignupScreen() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async () => {
    if (!email || !password) {
      setError('Email and password are required fields.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await signUp(email, password, displayName || undefined);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to sign up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <YStack style={{ flex: 1, backgroundColor: '#121212', justifyContent: 'center', padding: 24 }}>
      <YStack style={{ gap: 24, maxWidth: 400, width: '100%', alignSelf: 'center' }}>
        <YStack style={{ alignItems: 'center', gap: 8 }}>
          <Text style={{ fontSize: 48 }}>🥗</Text>
          <H1 style={{ color: '#ffffff', fontWeight: 'bold' }}>Create Account</H1>
          <Text style={{ color: '#aaaaaa', fontSize: 16 }}>Sign up to start planning meals</Text>
        </YStack>

        <YStack style={{ gap: 12 }}>
          {error && (
            <Text style={{ color: '#ff4d4d', fontSize: 14, textAlign: 'center' }}>
              {error}
            </Text>
          )}

          <Input
            placeholder="Full Name (optional)"
            value={displayName}
            onChangeText={setDisplayName}
            autoCapitalize="words"
            style={{ backgroundColor: '#1e1e1e', borderColor: '#333333', color: '#ffffff' }}
          />

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
            onPress={handleSignup}
            disabled={loading}
            style={{ backgroundColor: '#ffffff', color: '#121212', fontWeight: 'bold', marginTop: 12 }}
          >
            {loading ? <Spinner color="#121212" /> : 'Sign Up'}
          </Button>
        </YStack>

        <XStack style={{ justifyContent: 'center', gap: 6, marginTop: 16 }}>
          <Text style={{ color: '#aaaaaa' }}>Already have an account?</Text>
          <Text
            onPress={() => router.push('/login')}
            style={{ color: '#ffffff', fontWeight: 'bold', textDecorationLine: 'underline' }}
          >
            Sign In
          </Text>
        </XStack>
      </YStack>
    </YStack>
  );
}
