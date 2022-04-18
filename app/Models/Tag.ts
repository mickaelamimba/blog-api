
import {BaseModel, column, ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'
import {slugify} from '@ioc:Adonis/Addons/LucidSlugify'
import Post from 'App/Models/Post'

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
  @manyToMany(() => Post,{
    pivotTable:'posts',
    pivotForeignKey: 'tag_id',
    pivotRelatedForeignKey: 'post_id',
  })
  public posts: ManyToMany<typeof Post>
}
