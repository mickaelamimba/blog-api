import Factory from '@ioc:Adonis/Lucid/Factory'
import User from 'App/Models/User'
import {FactoryContext} from '@adonisjs/lucid/build/src/Factory/FactoryContext'
import Post from 'App/Models/Post'
import Category from 'App/Models/Category'
import Tag from 'App/Models/Tag'
import PostComment from 'App/Models/PostComment'

export const PostCommentFactory = Factory
  .define(PostComment, ({ faker }:FactoryContext):Object => {
    return {
      title: faker.lorem.sentence(1),
      content: faker.lorem.paragraph(),
    }
  })
  .build()
export const PostTagsFactory = Factory
  .define(Tag, ({ faker }:FactoryContext):Object => {
    return {
      title: faker.lorem.sentence(2),
      metaTitle:faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
    }
  })
  .build()
export const PostCategoriesFactory = Factory
  .define(Category, ({ faker }:FactoryContext):Object => {
    return {
      title: faker.lorem.sentence(2),
      metaTitle:faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
    }
  })
  .build()
export const PostFactory = Factory
  .define(Post, ({ faker }:FactoryContext):Object => {
    return {
      title: faker.lorem.sentence(2),
      metaTitle:faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      summary:faker.lorem.text(),
    }
  })
  .relation('category', () => PostCategoriesFactory)
  .relation('tag', () => PostTagsFactory)
  .relation('comments', () => PostCommentFactory)
  .build()
export const UserFactory = Factory
  .define(User, ({ faker }:FactoryContext):Object => {
    return {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      mobile: faker.phone.phoneNumberFormat(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      intro: faker.lorem.paragraph(),
    }
  })
  .relation('post', () => PostFactory)
  .build()
