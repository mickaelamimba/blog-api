import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
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
