import { TamaguiProvider, YStack, Text, Spinner } from 'tamagui';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import tamaguiConfig from './src/theme/tamagui.config';

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // WatermelonDB + Firebase initialisation will happen here in Phase 1.
    // For Phase 0 we just mark ready after a tick to validate the providers load.
    const timer = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="dark">
      <StatusBar style="light" />
      <YStack style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#121212' }}>
        {ready ? (
          <Text fontSize="$6" fontWeight="bold" color="$color">
            🥗 Mealko
          </Text>
        ) : (
          <Spinner size="large" color="$color" />
        )}
      </YStack>
    </TamaguiProvider>
  );
}
