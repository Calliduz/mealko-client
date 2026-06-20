import { Model } from '@nozbe/watermelondb';
import { field, date, readonly, children } from '@nozbe/watermelondb/decorators';

export default class Market extends Model {
  static table = 'markets';
  static associations = {
    market_tags: { type: 'has_many' as const, foreignKey: 'market_id' },
  };

  @field('user_id') userId!: string;
  @field('name') name!: string;
  @field('notes') notes!: string | null;
  @field('sort_order') sortOrder!: number;
  @readonly @date('created_at') createdAt!: Date;
  @date('updated_at') updatedAt!: Date;

  @children('market_tags') marketTags!: any;
}
