import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Posts extends BaseSchema {
  protected tableName = 'posts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('author_id').notNullable().unsigned()
      table.integer('parent_id').nullable().unsigned()
      table.string('title',75).notNullable()
      table.string('metaTitle',100).nullable()
      table.string('slug',100).notNullable().unique()
      table.text('summary').nullable()
      table.text('content').nullable()
      table.specificType('published','tinyint(1)').unsigned().defaultTo(1)
      table.foreign('author_id').references('users.id')
        .onDelete('NO ACTION').onUpdate('NO ACTION')
      table.foreign('parent_id').references('posts.id')
        .onDelete('NO ACTION').onUpdate('NO ACTION')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('publishedAt', { useTz: true })
      table.timestamp('createdAt', { useTz: true })
      table.timestamp('updatedAt', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
