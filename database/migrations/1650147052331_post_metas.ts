import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PostMetas extends BaseSchema {
  protected tableName = 'post_metas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('post_id').notNullable().unsigned().unique()
      table.string('key',50).notNullable()
      table.text('content').nullable()
      table.foreign('post_id').references('posts.id')
        .onDelete('NO ACTION').onUpdate('NO ACTION')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
