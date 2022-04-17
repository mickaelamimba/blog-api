import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {BaseModel, column, beforeSave} from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })

  public id: number
  @column()
  public firstName: string
  @column()
  public lastName: string
  @column()
  public mobile: string
  @column()
  public email: string
  @column({ serializeAs: null })
  public passwordHash: string
  @column()
  public intro: string
  @column()
  public profile: string
  @column.dateTime({ autoCreate: true })
  public registeredAt: DateTime

  @column.dateTime({ autoCreate: true })
  public lastLogin: DateTime
  @beforeSave()
  public static async getFullName (user: User){
    if(user.firstName && user.lastName){
      user.profile = user.firstName +' '+ user.lastName
    }
  }
  public serializeExtras = true
  @beforeSave()
  public static async hashPassword (user: User){
    if(user.$dirty.passwordHash){
      user.passwordHash = await Hash.make(user.passwordHash)
    }
  }
}
