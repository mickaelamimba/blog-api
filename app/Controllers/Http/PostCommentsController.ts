import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PostComment from 'App/Models/PostComment'
import PostCommentValidator from 'App/Validators/PostCommentValidator'
import Post from 'App/Models/Post'

export default class PostCommentsController {
  public async index ({response}:HttpContextContract){
    const postComment = await PostComment.all()
    return response.ok(postComment)
  }
  public async store ({ request, response }:HttpContextContract){
    const {title, content,postId}: any = await request.validate(PostCommentValidator)
    const post : Post | null = await Post.find(postId)
    post?.related('comments').create({title, content})
    return response.ok(post)
  }
  public async show ({params, response }:HttpContextContract){
    const id:Number = parseInt(params.id)
    const postComment :PostComment | null = await PostComment.find(id)
    if (!postComment){
      return response.notFound({ message: `PostComment ${id} not found ` })
    }
    return response.ok(postComment)
  }
  public async update ({params, response,request}:HttpContextContract){
    const {title, content}: any = await request.validate(PostCommentValidator)
    const id:Number = parseInt(params.id)
    let postComment :PostComment | null = await PostComment.find(id)
    if (!postComment){
      return response.notFound({ message: `PostComment ${id} not found ` })
    }
    postComment.merge({title, content})
    await postComment?.save()
    return response.ok(postComment)
  }
  public async destroy ({params, response }:HttpContextContract){
    const id:Number = parseInt(params.id)
    const postComment :PostComment | null = await PostComment.find(id)
    if (!postComment){
      return response.notFound({ message: `PostComment ${id} not found ` })
    }
    await postComment.delete()
    return response.ok({ message: 'User deleted successfully.' })
  }
}
