import { TamaguiProvider, YStack, Text, Spinner } from 'tamagui';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import tamaguiConfig from './src/theme/tamagui.config';
import { database } from './src/db';
import Ingredient from './src/db/models/Ingredient';

export default function App() {
  const [ready, setReady] = useState(false);
  const [dbStatus, setDbStatus] = useState('Initializing local database...');

  useEffect(() => {
    async function verifyDatabase() {
      try {
        console.log('[WatermelonDB] Starting database verification...');
        
        // 1. Query existing test ingredients
        const ingredientsCollection = database.get<Ingredient>('ingredients');
        const existing = await ingredientsCollection.query().fetch();
        console.log(`[WatermelonDB] Found ${existing.length} existing ingredients.`);

        let testIngName = '';

        if (existing.length === 0) {
          // 2. Perform a test write
          console.log('[WatermelonDB] No ingredients found. Inserting test ingredient...');
          const newIng = await database.write(async () => {
            return await ingredientsCollection.create((ingredient) => {
              ingredient.name = 'Test Avocado';
              ingredient.isStaple = true;
              ingredient.category = 'Fruits';
            });
          });
          console.log('[WatermelonDB] Successfully wrote test ingredient:', newIng.name);
          testIngName = newIng.name;
        } else {
          testIngName = existing[0].name;
        }

        // 3. Confirm we can query it back
        const allIngredients = await ingredientsCollection.query().fetch();
        const found = allIngredients.find(i => i.name === testIngName);
        
        if (found) {
          setDbStatus(`WatermelonDB OK (Queried: ${found.name})`);
        } else {
          setDbStatus('WatermelonDB Error: Test ingredient could not be retrieved');
        }
      } catch (error: any) {
        console.error('[WatermelonDB] Verification failed:', error);
        setDbStatus(`WatermelonDB Error: ${error.message || error}`);
      } finally {
        setReady(true);
      }
    }

    verifyDatabase();
  }, []);

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="dark">
      <StatusBar style="light" />
      <YStack style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#121212', padding: 20 }}>
        {ready ? (
          <YStack style={{ alignItems: 'center', gap: 16 }}>
            <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#ffffff' }}>
              🥗 Mealko
            </Text>
            <Text style={{ fontSize: 16, color: '#aaaaaa', textAlign: 'center' }}>
              {dbStatus}
            </Text>
          </YStack>
        ) : (
          <Spinner size="large" color="#ffffff" />
        )}
      </YStack>
    </TamaguiProvider>
  );
}

