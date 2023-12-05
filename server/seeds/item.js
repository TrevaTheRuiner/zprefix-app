/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('item').del()
  await knex('item').insert([
    {id: 1, userid: 1, itemname: 'Banana', description: 'A bunch of bananas', quantity: '3'},
    {id: 2, userid: 1, itemname: 'Apple', description: 'A bag of apples', quantity: '1'},
    {id: 3, userid: 1, itemname: 'Pineapple', description: 'A signle large pineapple', quantity: '5'},
    {id: 4, userid: 2, itemname: 'Tomato', description: 'Red juicy tomatoes, on th vine', quantity: '2'},
    {id: 5, userid: 2, itemname: 'Carrot', description: 'A rabbit might like this', quantity: '3'},
    {id: 6, userid: 2, itemname: 'Potato', description: 'Like a savory apple from the ground', quantity: '6'},
    {id: 7, userid: 2, itemname: 'Onion', description: 'I am crying just thinking about this', quantity: '2'},
    {id: 8, userid: 2, itemname: 'Garlic', description: 'Vampire deterrend, guaranteed or money back', quantity: '3'},
  ]);
};
