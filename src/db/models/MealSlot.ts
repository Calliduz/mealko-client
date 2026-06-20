import { Model } from '@nozbe/watermelondb';
import { field, date, readonly, relation, children } from '@nozbe/watermelondb/decorators';
import MealPlan from './MealPlan';

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export default class MealSlot extends Model {
  static table = 'meal_slots';
  static associations = {
    meal_plans: { type: 'belongs_to' as const, key: 'meal_plan_id' },
    meal_slot_dishes: { type: 'has_many' as const, foreignKey: 'meal_slot_id' },
  };

  @field('meal_plan_id') mealPlanId!: string;
  @field('day_index') dayIndex!: number;
  @field('meal_type') mealType!: MealType;
  @field('headcount_override') headcountOverride!: number | null;
  @field('reference_leftover_from_slot_id') referenceLeftoverFromSlotId!: string | null;
  @readonly @date('created_at') createdAt!: Date;
  @date('updated_at') updatedAt!: Date;

  @relation('meal_plans', 'meal_plan_id') mealPlan!: MealPlan;
  @children('meal_slot_dishes') mealSlotDishes!: any;
}
