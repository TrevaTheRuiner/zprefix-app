/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, firstname: 'Fruity', lastname: 'McFruiterson', username: 'fruits4life', password: 'fruits4life'},
    {id: 2, firstname: 'Veggie', lastname: 'Veggiestein', username: 'veggiesrock', password: 'veggiesrock'},
  ]);
};
