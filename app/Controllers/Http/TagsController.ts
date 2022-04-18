import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tag from 'App/Models/Tag'
import TagValidator from 'App/Validators/TagValidator'

export default class TagsController {
  public async index ({response}:HttpContextContract){
    let tags: InstanceType<any>[]
    tags = await Tag.all()
    return response.ok(tags)
  }
  public async store ({request,response}:HttpContextContract){
    const payload: any = await request.validate(TagValidator)
    const tag :Tag|null = await Tag.create(payload)
    return response.ok(tag)
  }
  public async show ({params, response }:HttpContextContract){
    const id:Number = parseInt(params.id)
    const tag: Tag|null = await Tag.find(id)
    if (!tag){
      return response.notFound({ message: `tag ${id} not found ` })
    }
    return response.ok(tag)
  }
  public async update ({params, response,request}:HttpContextContract){
    const id:Number = parseInt(params.id)
    const payload: any = await request.validate(TagValidator)
    const oldTag :Tag | null = await Tag.find(id)
    if (!oldTag){
      return response.notFound({ message: `Tag ${id} not found ` })
    }
    const newTag = oldTag?.merge(payload)
    await newTag.save()
    return response.ok(newTag)
  }
  public async destroy ({params, response }:HttpContextContract){
    const id:Number = parseInt(params.id)
    const tag :Tag | null = await Tag.find(id)
    if (!tag){
      return response.notFound({ message: `Tag ${id} not found ` })
    }
    await tag.delete()
    return response.ok({ message: 'Tag deleted successfully.' })
  }
}
