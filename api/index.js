import express from 'express';
import cors from 'cors';
import open from 'open';
import bodyParser from 'body-parser';
import recipes from './routes/recipes';
import ratings from './routes/ratings';

const port = 8888;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/recipes', recipes);
app.use('/ratings', ratings);

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    //open(`http://localhost:${port}`);
  }
});


