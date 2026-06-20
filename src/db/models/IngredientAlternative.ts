import { Model } from '@nozbe/watermelondb';
import { field, date, readonly, relation } from '@nozbe/watermelondb/decorators';
import Ingredient from './Ingredient';

export default class IngredientAlternative extends Model {
  static table = 'ingredient_alternatives';
  static associations = {
    ingredients: { type: 'belongs_to' as const, key: 'ingredient_id' },
  };

  @field('ingredient_id') ingredientId!: string;
  @field('alternative_ingredient_id') alternativeIngredientId!: string;
  @field('note') note!: string | null;
  @readonly @date('created_at') createdAt!: Date;
  @date('updated_at') updatedAt!: Date;

  @relation('ingredients', 'ingredient_id') ingredient!: Ingredient;
}
