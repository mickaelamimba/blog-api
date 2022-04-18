import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PostComments extends BaseSchema {
  protected tableName = 'post_comments'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title',75).notNullable()
      table.text('content').nullable()
      table.specificType('published','tinyint(1)').unsigned().defaultTo(1)
      table.integer('post_id').nullable().unsigned()
      table.integer('parent_id').nullable().unsigned()
      table.foreign('parent_id').references('posts.id')
        .onDelete('NO ACTION').onUpdate('NO ACTION')
      table.foreign('post_id').references('post_comments.id')
        .onDelete('NO ACTION').onUpdate('NO ACTION')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('published_at', { useTz: true })
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
