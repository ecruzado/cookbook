import express from 'express';
import cors from 'cors';
import open from 'open';
import recipes from './routes/recipes';
import bodyParser from 'body-parser';

const port = 8888;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/recipes', recipes);

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    //open(`http://localhost:${port}`);
  }
});


