import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { YStack, XStack, Text, Input, Button, H1, Spinner } from 'tamagui';
import { useAuth } from '../../src/auth/AuthContext';
import { getAuthErrorMessage } from '../../src/auth/errorUtils';

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
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <YStack style={{ flex: 1, backgroundColor: '#080D0B', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
      {/* Background radial highlight simulation */}
      <YStack
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: 300,
          backgroundColor: '#10B981',
          opacity: 0.03,
          filter: 'blur(100px)',
          top: '10%',
          left: '10%',
          pointerEvents: 'none',
        }}
      />
      <YStack
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: 300,
          backgroundColor: '#059669',
          opacity: 0.02,
          filter: 'blur(120px)',
          bottom: '10%',
          right: '10%',
          pointerEvents: 'none',
        }}
      />

      <YStack style={{ width: '100%', maxWidth: 420, gap: 24 }}>
        {/* Brand Header */}
        <YStack style={{ alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <YStack
            style={{
              width: 72,
              height: 72,
              borderRadius: 36,
              backgroundColor: '#111815',
              borderWidth: 1.5,
              borderColor: '#10B981',
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: '#10B981',
              shadowOpacity: 0.15,
              shadowRadius: 12,
              shadowOffset: { width: 0, height: 4 },
            }}
          >
            <Text style={{ fontSize: 36, lineHeight: 40 }}>🥗</Text>
          </YStack>
          <H1
            style={{
              color: '#ffffff',
              fontWeight: '900',
              fontSize: 32,
              letterSpacing: -0.8,
              textAlign: 'center',
            }}
          >
            Create Account
          </H1>
          <Text style={{ color: '#7C938A', fontSize: 15, fontWeight: '500', textAlign: 'center' }}>
            Join MealKo to start planning healthy meals
          </Text>
        </YStack>

        {/* Signup Card */}
        <YStack
          style={{
            backgroundColor: '#111815',
            borderColor: '#1C2E26',
            borderWidth: 1,
            borderRadius: 24,
            padding: 32,
            gap: 20,
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 16 },
            shadowOpacity: 0.4,
            shadowRadius: 32,
          }}
        >
          {error && (
            <XStack
              style={{
                backgroundColor: '#2A1414',
                borderColor: '#5C1D1D',
                borderWidth: 1,
                borderRadius: 12,
                padding: 14,
                gap: 10,
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 18 }}>⚠️</Text>
              <Text style={{ color: '#FCA5A5', fontSize: 13, fontWeight: '500', flex: 1, lineHeight: 18 }}>
                {error}
              </Text>
            </XStack>
          )}

          {/* Form Inputs */}
          <YStack style={{ gap: 14 }}>
            <Input
              placeholder="Full Name (optional)"
              value={displayName}
              onChangeText={setDisplayName}
              autoCapitalize="words"
              placeholderTextColor="#4B665A"
              style={{
                backgroundColor: '#16221E',
                borderColor: '#243A30',
                borderWidth: 1,
                borderRadius: 12,
                color: '#ffffff',
                height: 48,
                paddingHorizontal: 16,
                fontSize: 14,
              }}
              focusStyle={{
                borderColor: '#10B981',
                backgroundColor: '#182722',
                borderWidth: 1.5,
              }}
            />

            <Input
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#4B665A"
              style={{
                backgroundColor: '#16221E',
                borderColor: '#243A30',
                borderWidth: 1,
                borderRadius: 12,
                color: '#ffffff',
                height: 48,
                paddingHorizontal: 16,
                fontSize: 14,
              }}
              focusStyle={{
                borderColor: '#10B981',
                backgroundColor: '#182722',
                borderWidth: 1.5,
              }}
            />

            <Input
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              placeholderTextColor="#4B665A"
              style={{
                backgroundColor: '#16221E',
                borderColor: '#243A30',
                borderWidth: 1,
                borderRadius: 12,
                color: '#ffffff',
                height: 48,
                paddingHorizontal: 16,
                fontSize: 14,
              }}
              focusStyle={{
                borderColor: '#10B981',
                backgroundColor: '#182722',
                borderWidth: 1.5,
              }}
            />
          </YStack>

          {/* Actions */}
          <YStack style={{ gap: 12, marginTop: 4 }}>
            <Button
              onPress={handleSignup}
              disabled={loading}
              style={{
                backgroundColor: '#10B981',
                borderRadius: 12,
                height: 48,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              hoverStyle={{ backgroundColor: '#059669' }}
              pressStyle={{ scale: 0.97, opacity: 0.9 }}
            >
              {loading ? (
                <Spinner color="#111815" />
              ) : (
                <Text style={{ color: '#080D0B', fontWeight: 'bold', fontSize: 15 }}>Sign Up</Text>
              )}
            </Button>
          </YStack>
        </YStack>

        {/* Footer Link */}
        <XStack style={{ justifyContent: 'center', gap: 6, marginTop: 8 }}>
          <Text style={{ color: '#7C938A', fontSize: 14 }}>Already have an account?</Text>
          <Text
            onPress={() => router.push('/login')}
            style={{ color: '#10B981', fontWeight: 'bold', fontSize: 14, textDecorationLine: 'underline' }}
          >
            Sign In
          </Text>
        </XStack>
      </YStack>
    </YStack>
  );
}
