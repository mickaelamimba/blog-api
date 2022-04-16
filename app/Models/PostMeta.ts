
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class PostMeta extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public key: string
  @column()
  public content: string
}
