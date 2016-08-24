import superagent from 'superagent';

class RecipeApiClient {
    static getAllRecipes(){
        return superagent('GET','http://localhost:8888/recipes');
    }

    static getRecipe(id){
        return superagent('GET','http://localhost:8888/recipes/'+id);
    }

    static postRecipe(recipe){
        console.log("superagent post");        
        console.log(recipe);
        superagent
            .post('http://localhost:8888/recipes')
            .set('Content-Type', 'application/json')
            .send(recipe)
            .end(function(err, res){
                debugger;
                console.log('test');
                if(err){
                    console.log(err);
                }
            });
    }


}

export default RecipeApiClient;