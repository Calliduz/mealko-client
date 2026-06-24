import { TamaguiProvider, YStack, Text, Spinner, Button } from 'tamagui';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { database } from '../../src/db';
import Ingredient from '../../src/db/models/Ingredient';
import { useAuth } from '../../src/auth/AuthContext';

export default function HomeScreen() {
  const { user, signOut } = useAuth();
  const [ready, setReady] = useState(false);
  const [dbStatus, setDbStatus] = useState('Initializing local database...');

  useEffect(() => {
    async function verifyDatabase() {
      try {
        console.log('[WatermelonDB] Starting database verification...');
        
        // Query existing test ingredients
        const ingredientsCollection = database.get<Ingredient>('ingredients');
        const existing = await ingredientsCollection.query().fetch();
        console.log(`[WatermelonDB] Found ${existing.length} existing ingredients.`);



        let testIngName = '';

        if (existing.length === 0) {
          // Perform a test write
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

        // Confirm we can query it back
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
    <YStack style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#121212', padding: 20 }}>
      {ready ? (
        <YStack style={{ alignItems: 'center', gap: 20, width: '100%' }}>
          <YStack style={{ alignItems: 'center', gap: 8 }}>
            <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#ffffff' }}>
              🥗 Mealko Home
            </Text>
            <Text style={{ fontSize: 16, color: '#aaaaaa', textAlign: 'center' }}>
              {dbStatus}
            </Text>
          </YStack>

          <YStack style={{ backgroundColor: '#1e1e1e', padding: 20, borderRadius: 12, width: '100%', maxWidth: 350, gap: 10 }}>
            <Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 18 }}>User Session</Text>
            <Text style={{ color: '#aaaaaa', fontSize: 14 }}>Email: {user?.email}</Text>
            <Text style={{ color: '#aaaaaa', fontSize: 14 }}>Name: {user?.displayName || 'N/A'}</Text>
            <Text style={{ color: '#aaaaaa', fontSize: 14 }}>UID: {user?.uid}</Text>
          </YStack>

          <Button
            onPress={signOut}
            style={{ backgroundColor: '#ff4d4d', color: '#ffffff', fontWeight: 'bold', width: '100%', maxWidth: 350, marginTop: 12 }}
          >
            Sign Out
          </Button>
        </YStack>
      ) : (
        <Spinner size="large" color="#ffffff" />
      )}
    </YStack>
  );
}
