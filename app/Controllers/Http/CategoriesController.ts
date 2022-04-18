import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import CategoryValidator from 'App/Validators/CategoryValidator'

export default class CategoriesController {
  public async index ({response}:HttpContextContract){
    let categorise: InstanceType<any>[]
    categorise = await Category.all()
    return response.ok(categorise)
  }
  public async store ({request,response}:HttpContextContract){
    const payload: any = await request.validate(CategoryValidator)
    const category :Category|null = await Category.create(payload)
    return response.ok(category)
  }
  public async show ({params, response }:HttpContextContract){
    const id:Number = parseInt(params.id)
    const category: Category|null = await Category.find(id)
    if (!category){
      return response.notFound({ message: `post ${id} not found ` })
    }
    return response.ok(category)
  }
  public async update ({params, response,request}:HttpContextContract){
    const id:Number = parseInt(params.id)
    const payload: any = await request.validate(CategoryValidator)
    const oldCategory :Category | null = await Category.find(id)
    if (!oldCategory){
      return response.notFound({ message: `Category ${id} not found ` })
    }
    const newCategory = oldCategory?.merge(payload)
    await newCategory.save()
    return response.ok(newCategory)
  }
  public async destroy ({params, response }:HttpContextContract){
    const id:Number = parseInt(params.id)
    const category :Category | null = await Category.find(id)
    if (!category){
      return response.notFound({ message: `Category ${id} not found ` })
    }
    await category.delete()
    return response.ok({ message: 'Category deleted successfully.' })
  }
}
