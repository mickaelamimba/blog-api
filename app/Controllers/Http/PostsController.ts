import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import PostValidator from 'App/Validators/PostValidator'
import User from 'App/Models/User'

export default class PostsController {
  public async index ({response}:HttpContextContract){
    const post :Post[]|null= await Post.query()
      .preload('category').preload('tag').preload('comments').preload('user')
    const postsJSON = post.map((post) => post.serialize())
    return response.ok(postsJSON)
  }
  public async store ({ request, response }:HttpContextContract){
    const {title,metaTitle,content,summary,categories,tag} = await request.validate(PostValidator)
    const user :User | null = await User.find(1)
    const post :Post | null = new Post()
    post.title=title
    post.metaTitle =metaTitle
    post.summary = summary
    post.content = content
    await user?.related('post').save(post)
    let origin = request.completeUrl().toString()
    let postMeta : Object = {
      url: `${origin}/${post.slug}`,
    }
    const contentMeta = JSON.stringify(postMeta)
    await post.related('postMeta').create({content:contentMeta})
    if (categories && categories > 0) {
      await post.related('category').attach([categories])
    }
    if (tag && tag > 0){
      await post.related('tag').attach([tag])
    }
    return response.ok(post)
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
