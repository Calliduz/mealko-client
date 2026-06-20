import { Model } from '@nozbe/watermelondb';
import { field, date, readonly, children } from '@nozbe/watermelondb/decorators';

export type OccasionType = 'everyday' | 'special_occasion';

export default class Recipe extends Model {
  static table = 'recipes';
  static associations = {
    recipe_ingredients: { type: 'has_many' as const, foreignKey: 'recipe_id' },
    meal_slot_dishes: { type: 'has_many' as const, foreignKey: 'recipe_id' },
  };

  @field('user_id') userId!: string | null;
  @field('name') name!: string;
  @field('description') description!: string | null;
  @field('instructions') instructions!: string | null;
  @field('occasion_type') occasionType!: OccasionType;
  @field('default_yield_servings') defaultYieldServings!: number;
  @readonly @date('created_at') createdAt!: Date;
  @date('updated_at') updatedAt!: Date;

  @children('recipe_ingredients') recipeIngredients!: any;
}
