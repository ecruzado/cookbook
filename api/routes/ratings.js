import express from 'express';
import knex from 'knex';
import bodyParser from 'body-parser';
import sleep from 'sleep';
import knexConfig from '../knexConfig';

let cnn = knex(knexConfig);


let post = async (req, res) => { 

    let rate = req.body;
    
    delete rate.id;

    try {
        let ids = await cnn('rating')
            .insert(rate)
            .returning("id");
        rate.id = ids[0];

        res.json({
            message: 'success',
            data: rate
        });

    } catch(error) {
        res.json({message: error});
    }
};

let router = express.Router();

router.route('/')
    .post(post);

export default router;