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
       "database": 'coobook'
    }    
});

let list =  async (req, res) => {
    let query = await cnn.from('recipe')
        .orderByRaw('id DESC')
        //.limit(50)
        .select();
    res.json(query);
};

let getById =  async (req, res) => {
    let query = await cnn.from('recipe')
        .innerJoin('ingredient','recipe.id','ingredient.recipeid')
        .where('recipe.id', req.params.id)
        .select('recipe.*','ingredient.id as ingredientId',
            'ingredient.name as ingredientName','ingredient.quantity');
    sleep.sleep(1);
    if(query){
        let recipe = {
            id: query[0].id,
            name: query[0].name,
            category: query[0].category,
            chef: query[0].chef,
            preparation: query[0].preparation
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
    console.log(ingredientsInsert);

    delete recipeInsert.ingredients;
    delete recipeInsert.id;
    console.log("from api");
    //sleep.sleep(3);

    cnn.transaction(async (trx) => {
        try {
            let ids = await trx('recipe')
                .insert(recipeInsert)
                .returning("id");
            //console.log(ids);

            if(ingredientsInsert){
                ingredientsInsert = ingredientsInsert.map(x=>{
                    x.recipeid = ids[0];
                    delete x.id;
                    return x;
                });

                await trx('ingredient').insert(ingredientsInsert);
            
            }            
            await trx.commit();
            
            recipe.id = id[0];
            res.json({
                message: 'success',
                data: recipe
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
    .get(getById);


export default router;