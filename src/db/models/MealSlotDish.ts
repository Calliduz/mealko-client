import { Model } from '@nozbe/watermelondb';
import { field, date, readonly, relation } from '@nozbe/watermelondb/decorators';
import MealSlot from './MealSlot';
import Recipe from './Recipe';

export default class MealSlotDish extends Model {
  static table = 'meal_slot_dishes';
  static associations = {
    meal_slots: { type: 'belongs_to' as const, key: 'meal_slot_id' },
    recipes: { type: 'belongs_to' as const, key: 'recipe_id' },
  };

  @field('meal_slot_id') mealSlotId!: string;
  @field('recipe_id') recipeId!: string;
  @field('yield_servings_override') yieldServingsOverride!: number | null;
  @readonly @date('created_at') createdAt!: Date;
  @date('updated_at') updatedAt!: Date;

  @relation('meal_slots', 'meal_slot_id') mealSlot!: MealSlot;
  @relation('recipes', 'recipe_id') recipe!: Recipe;
}
