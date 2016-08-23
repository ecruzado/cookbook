import express from 'express';
import knex from 'knex';
import open from 'open';

const port = 8888;
const app = express();

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


const list =  async (req, res) => {

    let query = await cnn.from('test').select();

};

app.get('*',list);

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});


