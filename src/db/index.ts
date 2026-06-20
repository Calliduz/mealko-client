import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import schema from './schema';
import Ingredient from './models/Ingredient';
import IngredientAlternative from './models/IngredientAlternative';
import Recipe from './models/Recipe';
import RecipeIngredient from './models/RecipeIngredient';
import MealPlan from './models/MealPlan';
import MealSlot from './models/MealSlot';
import MealSlotDish from './models/MealSlotDish';
import PantryItem from './models/PantryItem';
import Market from './models/Market';
import MarketTag from './models/MarketTag';
import GroceryList from './models/GroceryList';
import GroceryListItem from './models/GroceryListItem';

const adapter = new SQLiteAdapter({
  schema,
  dbName: 'mealko',
  jsi: true,
  onSetUpError: (error) => {
    console.error('Failed to set up database adapter', error);
  },
});

export const database = new Database({
  adapter,
  modelClasses: [
    Ingredient,
    IngredientAlternative,
    Recipe,
    RecipeIngredient,
    MealPlan,
    MealSlot,
    MealSlotDish,
    PantryItem,
    Market,
    MarketTag,
    GroceryList,
    GroceryListItem,
  ],
});
