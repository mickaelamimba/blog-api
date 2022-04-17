import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import PostValidator from 'App/Validators/PostValidator'
import User from 'App/Models/User'

export default class PostsController {
  public async index ({response}:HttpContextContract){
    // @ts-ignore
    let posts: InstanceType<Post>[]
    posts = await Post.all()
    return response.ok(posts)
  }
  public async store ({ request, response }:HttpContextContract){
    const payload: any = await request.validate(PostValidator)
    const user = await User.find(1)
    await user?.related('post').create(
      payload
    )
    return response.ok(user)
  }
  public async show ({params, response }:HttpContextContract){
    const id:Number = parseInt(params.id)
    const post: Post|null = await Post.find(id)
    if (!post){
      return response.notFound({ message: `post ${id} not found ` })
    }
    return response.ok(post)
  }
  public async update ({params, response,request}:HttpContextContract){
    const id:Number = parseInt(params.id)
    const payload: any = await request.validate(PostValidator)
    const oldPost :Post | null = await Post.find(id)
    if (!oldPost){
      return response.notFound({ message: `post ${id} not found ` })
    }
    const newPost = oldPost?.merge(payload)
    await newPost.save()
    return response.ok(newPost)
  }
  public async destroy ({params, response }:HttpContextContract){
    const id:Number = parseInt(params.id)
    const post :Post | null = await Post.find(id)
    if (!post){
      return response.notFound({ message: `post ${id} not found ` })
    }
    await post.delete()
    return response.ok({ message: 'Post deleted successfully.' })
  }
}
