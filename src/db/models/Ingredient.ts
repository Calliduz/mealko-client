import { Model } from '@nozbe/watermelondb';
import { field, date, readonly } from '@nozbe/watermelondb/decorators';

export default class Ingredient extends Model {
  static table = 'ingredients';

  @field('user_id') userId!: string | null;
  @field('name') name!: string;
  @field('category') category!: string | null;
  @field('is_staple') isStaple!: boolean;
  @field('purchase_unit') purchaseUnit!: string | null;
  @field('purchase_unit_conversion') purchaseUnitConversion!: number | null;
  @readonly @date('created_at') createdAt!: Date;
  @date('updated_at') updatedAt!: Date;
}
