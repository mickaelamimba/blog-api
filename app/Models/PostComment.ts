import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class PostComment extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public title: string
  @column()
  public content: string
  @column()
  public published: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  @column.dateTime({ autoCreate: true })
  public publishedAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
