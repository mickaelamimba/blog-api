
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import {slugify} from '@ioc:Adonis/Addons/LucidSlugify';

export default class Tag extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public title: string
  @column()
  public metaTitle: string
  @column()
  public content: string
  @column()
  @slugify({
    strategy: 'dbIncrement',
    fields: ['title'],
  })
  public slug: string
}
