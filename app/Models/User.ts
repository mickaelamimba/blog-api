import { DateTime } from 'luxon'
import {BaseModel, column, hasOne,HasOne} from '@ioc:Adonis/Lucid/Orm'
import Post from 'App/Models/Post'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  @hasOne(() => Post)
  public Post: HasOne<typeof Post>
  public id: number
  @column()
  public firstName: string
  @column()
  public mobile: string
  @column()
  public email: string
  @column()
  public passwordHash: string
  @column()
  public intro: string
  @column()
  public profile: string
  @column.dateTime({ autoCreate: true })
  public registeredAt: DateTime

  @column.dateTime({ autoCreate: true })
  public lastLogin: DateTime
}
