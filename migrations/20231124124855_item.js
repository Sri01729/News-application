export async function up(knex) {
  await knex.schema.alterTable('items', (table) => {
    table.increments('id')
    table.string('text')
    table.integer('quantity')
    table.string('headline')        // New field: headline
    table.string('snippet')         // New field: snippet
    table.string('imageURL')        // New field: imageURL
    table.string('fullArticleLink')  // New field: fullArticleLink
  })
}

export async function down(knex) {
  await knex.schema.dropTable('items')
}
