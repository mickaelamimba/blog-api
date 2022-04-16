
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

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
  public slug: string
}
