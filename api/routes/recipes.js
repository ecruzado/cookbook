import express from 'express';
import knex from 'knex';
import bodyParser from 'body-parser';
import sleep from 'sleep';

let cnn = knex({
    client: 'pg',
    connection: {
       "host": 'localhost',
       "port": '1433',
       "user": 'postgres',
       "password": 'S1stem@s',
       "database": 'cookbookdb'
    },
    debug: true    
});

let list =  async (req, res) => {
    let query = await cnn.from('recipe')
        .orderByRaw('id DESC')
        //.limit(50)
        .select('recipe.*',
            knex.raw('(select round(avg(rate)) from rating where rating.recipeid = recipe.id) as rate'));
    res.json(query);
};

let getById =  async (req, res) => {
    let query = await cnn.from('recipe')
        .innerJoin('ingredient','recipe.id','ingredient.recipeid')
        .where('recipe.id', req.params.id)
        .select('recipe.*','ingredient.id as ingredientId',
            'ingredient.name as ingredientName','ingredient.quantity',
            knex.raw('(select round(avg(rate)) from rating where rating.recipeid = recipe.id) as rate'));
    //sleep.sleep(1);
    if(query){
        let recipe = {
            id: query[0].id,
            name: query[0].name,
            category: query[0].category,
            chef: query[0].chef,
            preparation: query[0].preparation,
            rate: query[0].rate
        };
        recipe.ingredients = query.map(row=>({
            id: row.ingredientId,
            name: row.ingredientName,
            quantity: row.quantity
        }));
        res.json(recipe);
    }else{
        res.json({});
    }
};

let post = async (req, res) => { 

    let recipeInsert = req.body;
    let ingredientsInsert ;
    if (req.body.ingredients)
        ingredientsInsert = [...req.body.ingredients];
    
    console.log(recipeInsert);
    //console.log(ingredientsInsert);

    delete recipeInsert.ingredients;
    delete recipeInsert.id;

    sleep.sleep(2);

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

    delete recipeUpdate.ingredients;
    delete recipeUpdate.id;

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


export default router;