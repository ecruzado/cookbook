import knex from 'knex';
import {recipes} from './data/recipe'
import {ingredients} from './data/ingredient'
import {ratings} from './data/rating'
import {comments} from './data/comment'
import knexConfig from '../knexConfig';

let db = knex(knexConfig);

db.schema
.dropTableIfExists('rating')
.dropTableIfExists('ingredient')
.dropTableIfExists('comment')
.dropTableIfExists('recipe')
.createTable('recipe', (table) => {
  table.increments('id');
  table.string('name', 500);
  table.string('chef', 200);
  table.string('category', 50);
  table.string('preparation', 4000);  
})
.createTable('ingredient', (table) => {
  table.increments('id');
  table.integer('recipeid').references('recipe.id');
  table.string('name', 200);
  table.string('quantity', 50);
})
.createTable('rating', (table) => {
  table.increments('id');
  table.integer('recipeid').references('recipe.id');
  table.string('username', 200);
  table.integer('rate');
})
.createTable('comment', (table) => {
  table.increments('id');
  table.integer('recipeid').references('recipe.id');
  table.string('username', 200);
  table.string('comment',1000);
})
.then(()=>{
  db('recipe').insert(recipes);
})
.then(()=>{
  db('ingredient').insert(ingredients);
})
.then(()=>{
  db('rating').insert(ratings);
})
.then(()=>{
  db('comment').insert(comments);
})
.then(()=>{
  console.log('Completed');
});

