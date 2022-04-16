import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('firstName',50)
      table.string('lastName',50)
      table.string('mobile',15).unique()
      table.string('email',50).unique()
      table.string('passwordHash',32)
      table.text('intro','tinytext')
      table.text('profile')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('registered_at', { useTz: true })
      table.timestamp('lastLogin', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
