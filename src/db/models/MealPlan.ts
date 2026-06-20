import { Model } from '@nozbe/watermelondb';
import { field, date, readonly, children } from '@nozbe/watermelondb/decorators';

export type RotationType = 'weekly' | 'monthly';
export type OccasionMode = 'everyday' | 'special_occasion';

export default class MealPlan extends Model {
  static table = 'meal_plans';
  static associations = {
    meal_slots: { type: 'has_many' as const, foreignKey: 'meal_plan_id' },
    grocery_lists: { type: 'has_many' as const, foreignKey: 'meal_plan_id' },
  };

  @field('user_id') userId!: string;
  @field('name') name!: string;
  @field('rotation_type') rotationType!: RotationType;
  @field('occasion_mode') occasionMode!: OccasionMode;
  @date('start_date') startDate!: Date;
  @readonly @date('created_at') createdAt!: Date;
  @date('updated_at') updatedAt!: Date;

  @children('meal_slots') mealSlots!: any;
}
