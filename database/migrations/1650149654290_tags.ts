import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Tags extends BaseSchema {
  protected tableName = 'tags'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title',75).notNullable()
      table.string('meta_title',100).nullable()
      table.string('slug',100).notNullable().unique()
      table.text('content').nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
