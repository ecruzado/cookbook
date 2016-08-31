import superagent from 'superagent';

class RecipeApiClient {
    static getAllRecipes(){
        const req = superagent['get']('http://localhost:8888/recipes')
            .timeout(1000);
        return req;
    }

    static getRecipe(id){
        const req = superagent['get']('http://localhost:8888/recipes/'+id)
            .timeout(4000);
        return req;
    }

    static getRecipeBySlug(slug){
        const req = superagent['get']('http://localhost:8888/recipes/name/'+slug)
            .timeout(4000);
        return req;
    }


    static postRecipe(recipe){
        const req = superagent['post']('http://localhost:8888/recipes')
            .timeout(6000)
            .set('Content-Type', 'application/json')
            .send(recipe);
        return req;
    }

    static putRecipe(recipe){
        const req = superagent['put']('http://localhost:8888/recipes/'+recipe.id)
            .timeout(6000)
            .set('Content-Type', 'application/json')
            .send(recipe);
        return req;
    }    

    static deleteRecipe(id){
        const req = superagent['delete']('http://localhost:8888/recipes/'+id)
            .timeout(6000);
        return req;
    }    

}

export default RecipeApiClient;