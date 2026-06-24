# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v56.0.0/ before writing any code.

## Code Intelligence

Before exploring the codebase with grep/file reads for structural questions
(call graphs, route mappings, dead code, architecture overview), check if
codebase-memory-mcp tools (search_graph, trace_call_path, get_architecture,
detect_changes) can answer it directly — it's faster and uses far fewer tokens.
This is a multi-repo workspace: mealko-client and mealko-server are indexed
as separate projects. Use the `project` parameter to scope queries.

⚙️ Stack Constraints — mealko-client
This is mealko-client: a React Native app built with Expo + TypeScript.

UI library: Tamagui (NOT React Native Paper — do not suggest Material Design components).

Local data: WatermelonDB backed by SQLite. Never use AsyncStorage or localStorage for app data.

- Import withObservables from @nozbe/watermelondb/react (NOT from the deprecated @nozbe/with-observables package).
- WatermelonDB requires a custom Expo Development Build — Expo Go will NOT work.

Auth: Firebase Auth client SDK.

Environment variables: All client env vars MUST use the EXPO*PUBLIC* prefix (e.g. EXPO_PUBLIC_API_URL). Do NOT use the dotenv package in the client.

Navigation: Expo Router (file-based). Do not suggest React Navigation unless asked.

State: Prefer WatermelonDB observables + React Context. Do not introduce Redux, MobX, or other state libraries without asking.

Do not introduce expo-sqlite as a separate layer — WatermelonDB manages its own SQLite adapter.
