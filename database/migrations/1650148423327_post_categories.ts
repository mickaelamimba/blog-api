import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PostCategories extends BaseSchema {
  protected tableName = 'post_categories'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('post_id').nullable().unsigned().references('posts.id')
        .onDelete('NO ACTION').onUpdate('NO ACTION')
      table.integer('category_id').nullable().unsigned().references('categories.id')
        .onDelete('NO ACTION').onUpdate('NO ACTION')
      table.unique(['post_id', 'category_id'])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
