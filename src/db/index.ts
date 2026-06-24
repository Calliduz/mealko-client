import { Database } from '@nozbe/watermelondb';
import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs';
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

const adapter = new LokiJSAdapter({
  schema,
  useWebWorker: false,
  useIncrementalIndexedDB: false, // Safe, fast in-memory storage for web environments
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
