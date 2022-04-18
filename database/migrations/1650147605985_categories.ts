import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Categories extends BaseSchema {
  protected tableName = 'categories'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('parent_id').nullable().unsigned()
      table.string('title',75).notNullable()
      table.string('meta_title',100).nullable()
      table.string('slug',100).notNullable().unique()
      table.text('content').nullable()
      table.foreign('parent_id').references('categories.id')
        .onDelete('NO ACTION').onUpdate('NO ACTION')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
