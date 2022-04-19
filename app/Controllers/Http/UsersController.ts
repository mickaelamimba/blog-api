import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserValidator from 'App/Validators/UserValidator'
import User from 'App/Models/User'

export default class UsersController {
  public async index ({response}:HttpContextContract){
    const user = await User.all()
    return response.ok(user)
  }
  public async store ({ auth, request, response }:HttpContextContract){
    if (auth.user && auth.isAuthenticated){
      const {firstName,lastName,mobile,intro}: any = await request.validate(UserValidator)
      const user :User|null = await User.find(auth.user.id)
      user?.merge({firstName,lastName,mobile,intro})
      await user?.save()
      return response.ok(user)
    }
  }
  public async show ({params, response }:HttpContextContract){
    const id:Number = parseInt(params.id)
    const user :User | null = await User.find(id)
    if (!user){
      return response.notFound({ message: `user ${id} not found ` })
    }
    return response.ok(user)
  }
  public async update ({params, response,request}:HttpContextContract){
    const payload: any = await request.validate(UserValidator)
    const id:Number = parseInt(params.id)
    let user :User | null = await User.find(id)
    if (!user){
      return response.notFound({ message: `user ${id} not found ` })
    }
    user.merge(payload)
    await user?.save()
    return response.ok(user)
  }
  public async destroy ({params, response }:HttpContextContract){
    const id:Number = parseInt(params.id)
    const user :User | null = await User.find(id)
    if (!user){
      return response.notFound({ message: `user ${id} not found ` })
    }
    await user.delete()
    return response.ok({ message: 'User deleted successfully.' })
  }
}
