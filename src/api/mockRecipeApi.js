import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const recipes = [
    {
        id: 1,
        name: 'lomo',
        chef: 'gaston acurio',
        category: 'MEAT',
        preparation: "lomo saltado's preparation"
    },
    {
        id: 2,
        name: 'cebiche',
        chef: 'gaston acurio',
        category: 'MEAT',
        preparation: "cebiche's preparation"
    },
    {
        id: 3,
        name: 'tallarin rojo',
        chef: 'gaston acurio',
        category: 'PASTAS',
        preparation: "tallarin's preparation"
    },
    {
        id: 4,
        name: 'Dish4',
        chef: 'gaston acurio',
        category: 'PASTAS',
        preparation: "tallarin's preparation"
    },
    {
        id: 5,
        name: 'Dish5',
        chef: 'gaston acurio',
        category: 'PASTAS',
        preparation: "tallarin's preparation"
    },
    {
        id: 6,
        name: 'Dish6',
        chef: 'gaston acurio',
        category: 'PASTAS',
        preparation: "tallarin's preparation"
    },
    {
        id: 7,
        name: 'Dish7',
        chef: 'gaston acurio',
        category: 'SALADS',
        preparation: "tallarin's preparation"
    },
    {
        id: 8,
        name: 'Dish8',
        chef: 'gaston acurio',
        category: 'PASTAS',
        preparation: "tallarin's preparation"
    },
    {
        id: 9,
        name: 'Dish9',
        chef: 'gaston acurio',
        category: 'DESSERTS',
        preparation: "suspiros's preparation"
    }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (recipe) => {
  return replaceAll(recipe.name, ' ', '-');
};

class RecipeApi {
  static getAllRecipes() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], recipes));
      }, delay);
    });
  }

  static saveRecipe(recipe) {
    recipe = Object.assign({}, recipe); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minCourseTitleLength = 1;
        if (recipe.name.length < 3) {
          reject(`Name must be at least ${3} characters.`);
        }

        if (recipe.id) {
          const existingRecipeIndex = recipes.findIndex(a => a.id == recipe.id);
          recipes.splice(existingRecipeIndex, 1, recipe);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new courses in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          recipe.id = generateId(recipe);
          recipes.push(recipe);
        }

        resolve(recipe);
      }, delay);
    });
  }

  static deleteRecipe(recipeId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfRecipeToDelete = recipes.findIndex(recipe => {
          recipe.id == recipeId;
        });
        recipes.splice(indexOfRecipeToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default RecipeApi;