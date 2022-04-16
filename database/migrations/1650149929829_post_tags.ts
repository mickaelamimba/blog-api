import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PostTags extends BaseSchema {
  protected tableName = 'post_tags'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('post_id').nullable().unsigned().references('posts.id')
        .onDelete('NO ACTION').onUpdate('NO ACTION')
      table.integer('tag_id').nullable().unsigned().references('tags.id')
        .onDelete('NO ACTION').onUpdate('NO ACTION')
      table.unique(['post_id', 'tag_id'])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
