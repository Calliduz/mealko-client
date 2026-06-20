import { Model } from '@nozbe/watermelondb';
import { field, date, readonly, relation } from '@nozbe/watermelondb/decorators';
import Market from './Market';

export default class MarketTag extends Model {
  static table = 'market_tags';
  static associations = {
    markets: { type: 'belongs_to' as const, key: 'market_id' },
  };

  @field('market_id') marketId!: string;
  @field('label') label!: string;
  @field('ingredient_category') ingredientCategory!: string | null;
  @readonly @date('created_at') createdAt!: Date;
  @date('updated_at') updatedAt!: Date;

  @relation('markets', 'market_id') market!: Market;
}
