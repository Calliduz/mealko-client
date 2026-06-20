import { Model } from '@nozbe/watermelondb';
import { field, date, readonly, relation } from '@nozbe/watermelondb/decorators';
import Recipe from './Recipe';
import Ingredient from './Ingredient';

export type ScalingType = 'linear' | 'sublinear' | 'fixed' | 'stepped';

export default class RecipeIngredient extends Model {
  static table = 'recipe_ingredients';
  static associations = {
    recipes: { type: 'belongs_to' as const, key: 'recipe_id' },
    ingredients: { type: 'belongs_to' as const, key: 'ingredient_id' },
  };

  @field('recipe_id') recipeId!: string;
  @field('ingredient_id') ingredientId!: string;
  @field('base_amount') baseAmount!: number;
  @field('unit') unit!: string;
  @field('scaling_type') scalingType!: ScalingType;
  @field('rate') rate!: number | null;
  @readonly @date('created_at') createdAt!: Date;
  @date('updated_at') updatedAt!: Date;

  @relation('recipes', 'recipe_id') recipe!: Recipe;
  @relation('ingredients', 'ingredient_id') ingredient!: Ingredient;
}
