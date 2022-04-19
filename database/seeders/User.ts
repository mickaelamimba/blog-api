import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import {UserFactory} from 'Database/factories'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    await UserFactory.with('post',4,(post)=> post.with('comments', 5))
      .with('post',2,(post)=>post.with('category',2))
      .with('post',4,(post)=>post.with('tag',3))
      .createMany(5)
  }
}
