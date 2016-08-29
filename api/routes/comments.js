import express from 'express';
import knex from 'knex';
import bodyParser from 'body-parser';
import sleep from 'sleep';
import knexConfig from '../knexConfig';

let cnn = knex(knexConfig);


let post = async (req, res) => { 

    let comment = req.body;
    
    console.log(comment);

    delete comment.id;

    try {
        let ids = await cnn('comment')
            .insert(comment)
            .returning("id");
        comment.id = ids[0];

        res.json({
            message: 'success',
            data: comment
        });

    } catch(error) {
        res.json({message: error});
    }
};

let router = express.Router();

router.route('/')
    .post(post);

export default router;