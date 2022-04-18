import { DateTime } from 'luxon'
// eslint-disable-next-line max-len
import {BaseModel, column, belongsTo, BelongsTo, manyToMany, ManyToMany, hasMany, HasMany} from '@ioc:Adonis/Lucid/Orm'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import User from 'App/Models/User'
import Category from 'App/Models/Category'
import Tag from 'App/Models/Tag'
import PostComment from 'App/Models/PostComment'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public authorId: number
  @column()
  public parentId: number
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
  @belongsTo(() => User,{
    localKey: 'id', foreignKey: 'authorId',
  })
  public user: BelongsTo<typeof User>
  @manyToMany(() => Category,{
    pivotTable:'post_categories',
    pivotForeignKey: 'post_id',
    pivotRelatedForeignKey: 'category_id',
  })
  public category: ManyToMany<typeof Category>
  @manyToMany(() => Tag,{
    pivotTable:'post_tags',
    pivotForeignKey: 'post_id',
    pivotRelatedForeignKey: 'tag_id',
  })
  public tag: ManyToMany<typeof Tag>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  @column.dateTime({ autoCreate: true })
  public publishedAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => PostComment,{
    foreignKey:'post_id',
  })
  public comments:HasMany<typeof PostComment>
}
