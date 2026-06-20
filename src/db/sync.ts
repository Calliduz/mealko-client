import { synchronize } from '@nozbe/watermelondb/sync';
import { Database } from '@nozbe/watermelondb';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

/**
 * Runs a full WatermelonDB sync cycle against mealko-server.
 * Call this on app foreground or manual user-triggered refresh.
 */
export async function syncDatabase(
  database: Database,
  idToken: string
): Promise<void> {
  await synchronize({
    database,
    pullChanges: async ({ lastPulledAt }) => {
      const response = await fetch(
        `${API_URL}/sync/pull?lastPulledAt=${lastPulledAt ?? 0}`,
        {
          headers: { Authorization: `Bearer ${idToken}` },
        }
      );

      if (!response.ok) {
        throw new Error(`Pull failed: ${response.status}`);
      }

      return response.json();
    },
    pushChanges: async ({ changes, lastPulledAt }) => {
      const response = await fetch(`${API_URL}/sync/push`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ changes, lastPulledAt }),
      });

      if (!response.ok) {
        throw new Error(`Push failed: ${response.status}`);
      }
    },
  });
}
