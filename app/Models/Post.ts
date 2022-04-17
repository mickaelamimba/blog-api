import { DateTime } from 'luxon'
import {BaseModel, column, belongsTo, BelongsTo, hasOne, HasOne,afterCreate} from '@ioc:Adonis/Lucid/Orm'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import User from 'App/Models/User'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public authorId: number
  @column()
  public parentId: number
  @hasOne(() => Post,{
    foreignKey:'parentId',
  })
  public post:HasOne<typeof Post>
  @column()
  public title: string
  @column()
  public metaTitle: string
  @column()
  @slugify({
    strategy: 'dbIncrement',
    fields: ['title'],
  })
  public slug: string
  @column()
  public summary: string
  @column()
  public content: string
  @column()
  public published: boolean
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  @column.dateTime({ autoCreate: true })
  public publishedAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  @afterCreate()
  public static async setParentId (post: Post){
    if(post.id){
      post.parentId = post.id
    }
  }
}
