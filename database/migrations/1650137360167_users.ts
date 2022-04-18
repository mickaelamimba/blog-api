import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('first_name',50)
      table.string('last_name',50)
      table.string('mobile',15).unique()
      table.string('email',255).notNullable()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()
      table.text('intro','tinytext')
      table.text('profile')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('registered_at', { useTz: true })
      table.timestamp('last_login', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
