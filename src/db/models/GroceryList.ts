import { Model } from '@nozbe/watermelondb';
import { field, date, readonly, relation, children } from '@nozbe/watermelondb/decorators';
import MealPlan from './MealPlan';

export type RangeType = 'daily' | 'weekly';

export default class GroceryList extends Model {
  static table = 'grocery_lists';
  static associations = {
    meal_plans: { type: 'belongs_to' as const, key: 'meal_plan_id' },
    grocery_list_items: { type: 'has_many' as const, foreignKey: 'grocery_list_id' },
  };

  @field('user_id') userId!: string;
  @field('meal_plan_id') mealPlanId!: string;
  @field('range_type') rangeType!: RangeType;
  @date('range_start') rangeStart!: Date;
  @date('range_end') rangeEnd!: Date;
  @readonly @date('created_at') createdAt!: Date;
  @date('updated_at') updatedAt!: Date;

  @relation('meal_plans', 'meal_plan_id') mealPlan!: MealPlan;
  @children('grocery_list_items') groceryListItems!: any;
}
