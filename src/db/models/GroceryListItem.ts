import { Model } from '@nozbe/watermelondb';
import { field, date, readonly, relation } from '@nozbe/watermelondb/decorators';
import GroceryList from './GroceryList';
import Ingredient from './Ingredient';

export default class GroceryListItem extends Model {
  static table = 'grocery_list_items';
  static associations = {
    grocery_lists: { type: 'belongs_to' as const, key: 'grocery_list_id' },
    ingredients: { type: 'belongs_to' as const, key: 'ingredient_id' },
  };

  @field('grocery_list_id') groceryListId!: string;
  @field('ingredient_id') ingredientId!: string;
  @field('amount') amount!: number;
  @field('unit') unit!: string;
  @field('checked') checked!: boolean;
  @field('substituted_with_ingredient_id') substitutedWithIngredientId!: string | null;
  @readonly @date('created_at') createdAt!: Date;
  @date('updated_at') updatedAt!: Date;

  @relation('grocery_lists', 'grocery_list_id') groceryList!: GroceryList;
  @relation('ingredients', 'ingredient_id') ingredient!: Ingredient;
}
