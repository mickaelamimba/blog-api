import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import AuthValidator from 'App/Validators/AuthValidator'

export default class AuthController {
  public async index ({request,response}:HttpContextContract){
    const {email,password} = await request.validate(AuthValidator)
    const user = await User.create({email,password})
    return response.ok(user)
  }
  public async store ({ auth, request, response }:HttpContextContract){
    const email = request.input('email')
    const password = request.input('password')
    try {
      const token = await auth.use('api').attempt(email, password)
      return response.ok(token)
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }
}
