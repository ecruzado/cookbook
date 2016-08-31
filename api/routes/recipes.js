import express from 'express';
import knex from 'knex';
import bodyParser from 'body-parser';
import sleep from 'sleep';
import knexConfig from '../knexConfig';
import slug from 'slug';

let cnn = knex(knexConfig);

let list =  async (req, res) => {
    let query = await cnn.from('recipe')
        .orderByRaw('id DESC')
        //.limit(50)
        .select('recipe.*',
            knex.raw('(select coalesce(round(avg(rate)),0) from rating where rating.recipeid = recipe.id) as rate'),
            knex.raw('(select count(0) from rating where rating.recipeid = recipe.id) as rateNumber'));
    res.json(query);
};

let getById =  async (req, res) => {
    console.log('get begin');
    let recipe = await cnn.from('recipe')
        .where('recipe.id', req.params.id)
        .select('recipe.*',
            knex.raw('(select coalesce(round(avg(rate)),0) from rating where rating.recipeid = recipe.id) as rate'),
            knex.raw('(select count(0) from rating where rating.recipeid = recipe.id) as ratenumber'))
        .first()
        .catch(e=>{
            console.log(e);
        });
    
    let ingredients = await cnn.from('ingredient')
        .where('recipeid', req.params.id)
        .select()
        .catch(e=>{
            console.log(e);
        });

    let comments = await cnn.from('comment')
        .where('recipeid', req.params.id)
        .orderByRaw('id DESC')
        .select()
        .catch(e=>{
            console.log(e);
        });

    recipe.ingredients = ingredients;
    recipe.comments = comments;
    res.json(recipe);
};


let getBySlug =  async (req, res) => {
    console.log('get begin');
    let recipe = await cnn.from('recipe')
        .where('recipe.slug', req.params.slug)
        .select('recipe.*',
            knex.raw('(select coalesce(round(avg(rate)),0) from rating where rating.recipeid = recipe.id) as rate'),
            knex.raw('(select count(0) from rating where rating.recipeid = recipe.id) as ratenumber'))
        .first()
        .catch(e=>{
            console.log(e);
        });
    
    let ingredients = await cnn.from('ingredient')
        .where('recipeid', req.params.id)
        .select()
        .catch(e=>{
            console.log(e);
        });

    let comments = await cnn.from('comment')
        .where('recipeid', req.params.id)
        .orderByRaw('id DESC')
        .select()
        .catch(e=>{
            console.log(e);
        });

    recipe.ingredients = ingredients;
    recipe.comments = comments;
    res.json(recipe);
};


let post = async (req, res) => { 

    let recipeInsert = req.body;
    let ingredientsInsert ;
    if (req.body.ingredients)
        ingredientsInsert = [...req.body.ingredients];
    
    console.log(recipeInsert);
    
    let recipeSameName = await cnn.from('recipe')
        .where('name', recipeInsert.name)
        .select();
    
    if(recipeSameName.length>0){
        res.status(400)
        res.json({error:'There is a recipe with the same name.'});
        return;
    }

    delete recipeInsert.ingredients;
    delete recipeInsert.comments;
    delete recipeInsert.id;
    recipeInsert.slug = slug(recipeInsert.name)

    sleep.sleep(1);

    cnn.transaction(async (trx) => {
        try {
            let ids = await trx('recipe')
                .insert(recipeInsert)
                .returning("id");

            if(ingredientsInsert){
                recipeInsert.id = ids[0];
                ingredientsInsert = ingredientsInsert.map(x=>{
                    x.recipeid = ids[0];
                    delete x.id;
                    return x;
                });

                let detIds = await trx('ingredient')
                    .insert(ingredientsInsert)
                    .returning("id");

                ingredientsInsert = ingredientsInsert.map((x, i)=>{
                    x.id = detIds[i];
                    return x;
                });

                recipeInsert.ingredients = ingredientsInsert;
            
            }            
            await trx.commit();
            
            res.json({
                message: 'success',
                data: recipeInsert
            });

        } catch(error) {
            await trx.rollback();
            res.json({message: error});
        }
    });
};

let put = async (req, res) => { 

    let recipeUpdate = req.body;
    let ingredientsInsert ;
    let recipeid = req.params.id;
    if (req.body.ingredients)
        ingredientsInsert = [...req.body.ingredients];

    console.log(req.params.id);
    console.log(recipeUpdate);
    console.log(ingredientsInsert);

    let recipeSameName = await cnn.from('recipe')
        .where('name', recipeUpdate.name)
        .select();
    console.log('Len');
    console.log(recipeSameName.length);
    if(recipeSameName.length>0){
        res.status(400)
        res.json({error:'There is a recipe with the same name.'});
        return;
    }

    delete recipeUpdate.ingredients;
    delete recipeUpdate.comments;
    
    delete recipeUpdate.id;
    delete recipeUpdate.rate;
    delete recipeUpdate.ratenumber;
    recipeUpdate.slug = slug(recipeUpdate.name)

    console.log("from api");
    //sleep.sleep(3);

    cnn.transaction(async (trx) => {
        try {
            await trx.from('recipe')
                .where('id',recipeid)
                .update(recipeUpdate);

            console.log("1");
            recipeUpdate.id = recipeid;

            await trx.from('ingredient')
                .where({recipeid: recipeid})
                .del();
            
            console.log("2");

            if(ingredientsInsert){
                ingredientsInsert = ingredientsInsert.map(x=>{
                    x.recipeid = req.params.id
                    delete x.id;
                    return x;
                });

                let detIds = await trx('ingredient')
                    .insert(ingredientsInsert)
                    .returning('id');

                ingredientsInsert = ingredientsInsert.map((x, i)=>{
                    x.id = detIds[i];
                    return x;
                });

                recipeUpdate.ingredients = ingredientsInsert;                    
            
            }            
            await trx.commit();
            
            res.json({
                message: 'success',
                data: recipeUpdate
            });

        } catch(error) {
            await trx.rollback();
            console.log(error);
            res.json({message: error});
        }
    });
};

let deleteRecipe = async (req, res) => {
    const recipeId = req.params.id;
    cnn.transaction(async (trx) => {
        try {

            await trx.from('comment')
                .where({recipeid: recipeId})
                .del();

            await trx.from('rating')
                .where({recipeid: recipeId})
                .del();

            await trx.from('ingredient')
                .where({recipeid: recipeId})
                .del();

            await trx.from('recipe')
                .where({id: recipeId})
                .del(); 

            await trx.commit();

            res.json({
                message: 'success'
            });
        } catch(error) {
            await trx.rollback();
            res.json({message: error});
        }
    });
};

let router = express.Router();

router.route('/')
    .get(list)
    .post(post);

router.route('/:id')
    .get(getById)
    .put(put)
    .delete(deleteRecipe);

router.route('/name/:slug')
    .get(getBySlug);



export default router;