
import {BaseModel, column, beforeCreate, belongsTo, BelongsTo} from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
import Post from 'App/Models/Post'

export default class PostMeta extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public post_id: number
  @column()
  public key: string
  @column()
  public content: string

  @belongsTo(() => Post,{
    localKey:'post_id',
  })
  public post: BelongsTo<typeof Post>
  @beforeCreate()
  public static async createUUID (postMeta: PostMeta) {
    postMeta.key = uuidv4()
  }
}
