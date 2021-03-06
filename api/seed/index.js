import knex from 'knex';
import {recipes} from './data/recipe';
import {ingredients} from './data/ingredient';
import {ratings} from './data/rating';
import {comments} from './data/comment';
import knexConfig from '../knexConfig';
import slug from 'slug';

const seedDb = async ()=>{
  let db = knex(knexConfig);

  await db.schema
  .dropTableIfExists('rating')
  .dropTableIfExists('ingredient')
  .dropTableIfExists('comment')
  .dropTableIfExists('recipe')
  .createTable('recipe', (table) => {
    table.increments('id');
    table.string('name', 500);
    table.string('slug', 500);
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
  });
  let arr = Object.assign([], recipes);
  arr = arr.map((item,i)=>({...item, slug:slug(item.name)}));

  await db('recipe').insert(arr); 
  await db('rating').insert(ratings); 
  await db('comment').insert(comments);
  await db('ingredient').insert(ingredients);
};

try{
  seedDb();
}catch(e){
  throw(e);
}