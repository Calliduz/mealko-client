import { appSchema, tableSchema } from "@nozbe/watermelondb";

/**
 * Local (on-device) schema. Mirrors the Postgres schema for every table that
 * needs to work offline. Notes:
 * - `users` is NOT synced here — auth/session is handled directly by the
 *   Express auth API and stored via expo-secure-store, not WatermelonDB.
 * - WatermelonDB manages `id` and deletion status (`_status`) internally,
 *   so there's no `deleted_at` column here even though Postgres has one —
 *   deletions are reported by the server's `pull` endpoint and applied via
 *   WatermelonDB's own delete mechanism.
 * - Timestamps are stored as epoch-ms numbers (WatermelonDB convention),
 *   not Date objects.
 * - Bump `version` and write a migration whenever a column is added/changed,
 *   matching the corresponding Postgres migration.
 */

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "ingredients",
      columns: [
        { name: "user_id", type: "string", isOptional: true },
        { name: "name", type: "string" },
        { name: "category", type: "string", isOptional: true },
        { name: "is_staple", type: "boolean" },
        { name: "purchase_unit", type: "string", isOptional: true },
        { name: "purchase_unit_conversion", type: "number", isOptional: true },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),

    tableSchema({
      name: "ingredient_alternatives",
      columns: [
        { name: "ingredient_id", type: "string" },
        { name: "alternative_ingredient_id", type: "string" },
        { name: "note", type: "string", isOptional: true },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),

    tableSchema({
      name: "recipes",
      columns: [
        { name: "user_id", type: "string", isOptional: true },
        { name: "name", type: "string" },
        { name: "description", type: "string", isOptional: true },
        { name: "instructions", type: "string", isOptional: true },
        { name: "occasion_type", type: "string" },
        { name: "default_yield_servings", type: "number" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),

    tableSchema({
      name: "recipe_ingredients",
      columns: [
        { name: "recipe_id", type: "string" },
        { name: "ingredient_id", type: "string" },
        { name: "base_amount", type: "number" },
        { name: "unit", type: "string" },
        { name: "scaling_type", type: "string" },
        { name: "rate", type: "number", isOptional: true },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),

    tableSchema({
      name: "meal_plans",
      columns: [
        { name: "user_id", type: "string" },
        { name: "name", type: "string" },
        { name: "rotation_type", type: "string" },
        { name: "occasion_mode", type: "string" },
        { name: "start_date", type: "number" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),

    tableSchema({
      name: "meal_slots",
      columns: [
        { name: "meal_plan_id", type: "string" },
        { name: "day_index", type: "number" },
        { name: "meal_type", type: "string" },
        { name: "headcount_override", type: "number", isOptional: true },
        { name: "reference_leftover_from_slot_id", type: "string", isOptional: true },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),

    tableSchema({
      name: "meal_slot_dishes",
      columns: [
        { name: "meal_slot_id", type: "string" },
        { name: "recipe_id", type: "string" },
        { name: "yield_servings_override", type: "number", isOptional: true },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),

    tableSchema({
      name: "pantry_items",
      columns: [
        { name: "user_id", type: "string" },
        { name: "ingredient_id", type: "string" },
        { name: "running_low", type: "boolean" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),

    tableSchema({
      name: "markets",
      columns: [
        { name: "user_id", type: "string" },
        { name: "name", type: "string" },
        { name: "notes", type: "string", isOptional: true },
        { name: "sort_order", type: "number" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),

    tableSchema({
      name: "market_tags",
      columns: [
        { name: "market_id", type: "string" },
        { name: "label", type: "string" },
        { name: "ingredient_category", type: "string", isOptional: true },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),

    tableSchema({
      name: "grocery_lists",
      columns: [
        { name: "user_id", type: "string" },
        { name: "meal_plan_id", type: "string" },
        { name: "range_type", type: "string" },
        { name: "range_start", type: "number" },
        { name: "range_end", type: "number" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),

    tableSchema({
      name: "grocery_list_items",
      columns: [
        { name: "grocery_list_id", type: "string" },
        { name: "ingredient_id", type: "string" },
        { name: "amount", type: "number" },
        { name: "unit", type: "string" },
        { name: "checked", type: "boolean" },
        { name: "substituted_with_ingredient_id", type: "string", isOptional: true },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
  ],
});
