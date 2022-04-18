import {BaseModel, column} from '@ioc:Adonis/Lucid/Orm'

export default class PostCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public postId:number
  @column()
  public categoryId:number
}
