import { Model } from '@nozbe/watermelondb';
import { field, date, readonly, relation } from '@nozbe/watermelondb/decorators';
import Ingredient from './Ingredient';

export default class PantryItem extends Model {
  static table = 'pantry_items';
  static associations = {
    ingredients: { type: 'belongs_to' as const, key: 'ingredient_id' },
  };

  @field('user_id') userId!: string;
  @field('ingredient_id') ingredientId!: string;
  @field('running_low') runningLow!: boolean;
  @readonly @date('created_at') createdAt!: Date;
  @date('updated_at') updatedAt!: Date;

  @relation('ingredients', 'ingredient_id') ingredient!: Ingredient;
}
