import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {column, beforeSave, BaseModel, hasMany, HasMany} from '@ioc:Adonis/Lucid/Orm'
import Post from 'App/Models/Post'

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
  public password: string

  @column()
  public rememberMeToken?: string
  @column()
  public intro: string
  @column()
  public profile: string
  @column.dateTime({ autoCreate: true })
  public registeredAt: DateTime

  @column.dateTime({ autoCreate: true })
  public lastLogin: DateTime
  @hasMany(() => Post,{
    foreignKey:'authorId',
  })
  public post:HasMany<typeof Post>
  @beforeSave()
  public static async getFullName (user: User){
    if(user.firstName && user.lastName){
      user.profile = user.firstName +' '+ user.lastName
    }
  }
  public serializeExtras = true
  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
