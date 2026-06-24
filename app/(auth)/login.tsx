import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { YStack, XStack, Text, Input, Button, H1, Spinner } from 'tamagui';
import { useAuth } from '../../src/auth/AuthContext';
import { getAuthErrorMessage } from '../../src/auth/errorUtils';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn, signInMock } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both your email address and password.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await signIn(email, password);
    } catch (err: any) {
      console.error(err);
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleMockLogin = async (mockId: string) => {
    setError(null);
    setLoading(true);
    try {
      await signInMock(mockId);
    } catch (err: any) {
      console.error(err);
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setError('Google Sign-In will be initialized on the device using Google Play Services.');
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
            MealKo
          </H1>
          <Text style={{ color: '#7C938A', fontSize: 15, fontWeight: '500', textAlign: 'center' }}>
            Plan, shop, and prep your meals with ease
          </Text>
        </YStack>

        {/* Login Card */}
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
              onPress={handleLogin}
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
                <Text style={{ color: '#080D0B', fontWeight: 'bold', fontSize: 15 }}>Sign In</Text>
              )}
            </Button>

            <Button
              onPress={handleGoogleSignIn}
              style={{
                backgroundColor: '#16221E',
                borderColor: '#243A30',
                borderWidth: 1,
                borderRadius: 12,
                height: 48,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              hoverStyle={{ backgroundColor: '#1C2E26', borderColor: '#345244' }}
              pressStyle={{ scale: 0.97 }}
            >
              <XStack gap="$2" alignItems="center">
                {/* Simulated Google Logo Icon */}
                <Text style={{ color: '#ffffff', fontSize: 13, fontWeight: '700' }}>G</Text>
                <Text style={{ color: '#ffffff', fontWeight: '600', fontSize: 14 }}>Sign In with Google</Text>
              </XStack>
            </Button>
          </YStack>

          {/* Quick Mock Login Panel for Dev Mode */}
          {process.env.EXPO_PUBLIC_ALLOW_MOCK_AUTH === 'true' && (
            <YStack
              style={{
                marginTop: 8,
                backgroundColor: '#0F1613',
                borderColor: '#1F3129',
                borderWidth: 1,
                borderRadius: 16,
                padding: 16,
                gap: 12,
              }}
            >
              <XStack alignItems="center" justifyContent="center" gap="$2">
                <YStack style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#10B981' }} />
                <Text style={{ color: '#68867A', fontSize: 11, fontWeight: '700', letterSpacing: 0.8 }}>
                  DEVELOPER PROFILE BYPASS
                </Text>
              </XStack>

              <YStack gap="$2">
                {[
                  { id: 'mock-user-1', name: 'Alice', size: '2p', color: '#10B981', init: 'A' },
                  { id: 'mock-user-2', name: 'Bob', size: '4p', color: '#3B82F6', init: 'B' },
                  { id: 'mock-user-3', name: 'Charlie', size: '1p', color: '#F59E0B', init: 'C' },
                ].map((userProfile) => (
                  <Button
                    key={userProfile.id}
                    onPress={() => handleMockLogin(userProfile.id)}
                    disabled={loading}
                    style={{
                      backgroundColor: '#16221E',
                      borderRadius: 10,
                      height: 42,
                      paddingHorizontal: 12,
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: '#1F3129',
                    }}
                    hoverStyle={{ backgroundColor: '#1C2E26', borderColor: '#345244' }}
                    pressStyle={{ scale: 0.96 }}
                  >
                    <XStack alignItems="center" justify="space-between" width="100%">
                      <XStack gap="$3" alignItems="center">
                        <YStack
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: 13,
                            backgroundColor: userProfile.color + '20',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: userProfile.color,
                          }}
                        >
                          <Text style={{ color: userProfile.color, fontSize: 12, fontWeight: 'bold' }}>
                            {userProfile.init}
                          </Text>
                        </YStack>
                        <Text style={{ color: '#E2E8F0', fontSize: 13, fontWeight: '600' }}>
                          {userProfile.name}
                        </Text>
                      </XStack>
                      <YStack
                        style={{
                          backgroundColor: '#1F3129',
                          borderRadius: 6,
                          paddingHorizontal: 6,
                          paddingVertical: 2,
                        }}
                      >
                        <Text style={{ color: '#10B981', fontSize: 10, fontWeight: 'bold' }}>
                          {userProfile.size}
                        </Text>
                      </YStack>
                    </XStack>
                  </Button>
                ))}
              </YStack>
            </YStack>
          )}
        </YStack>

        {/* Footer Link */}
        <XStack style={{ justifyContent: 'center', gap: 6, marginTop: 8 }}>
          <Text style={{ color: '#7C938A', fontSize: 14 }}>Don't have an account?</Text>
          <Text
            onPress={() => router.push('/signup')}
            style={{ color: '#10B981', fontWeight: 'bold', fontSize: 14, textDecorationLine: 'underline' }}
          >
            Sign Up
          </Text>
        </XStack>
      </YStack>
    </YStack>
  );
}
