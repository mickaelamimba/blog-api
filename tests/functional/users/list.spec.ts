import { test } from '@japa/runner'
import User from 'App/Models/User'
import {ApiResponse} from '@japa/api-client'

test.group('Users list',() => {
  test('get user if not login',async ({client})=>{
    const response = await client.get('/api/v1/users')
    response.assertStatus(401)
    response.assertBodyContains({errors:[{message: 'E_UNAUTHORIZED_ACCESS: Unauthorized access'}]})
  })
  test('get connect user ', async ({client})=>{
    await User.create({
      email:'testConexion@gmail.com',
      password:'arnolde973'})
    const response =await client.post('/api/v1/login')
      .field('email','testConexion@gmail.com')
      .field('password','arnolde973')
    response.assertStatus(200)
  })
  test('create a new user ', async ({client})=>{
    const response :ApiResponse = await client.post('/api/v1/register')
      .header('accept','application/json').type('json').fields(
        {
          email:'test@gmail.com',
          password:'arnolde973',
          password_confirmation:'arnolde973',
        }
      )
      .send()
    if (response.status() === 200){
      response.assertStatus(200)
    }
    if (response.status() === 422){
      response.assertStatus(422)
      response.assertBodyContains({
        errors: [{rule: 'unique', field: 'email', message: 'unique validation failure'}]})
    }
  })
})
