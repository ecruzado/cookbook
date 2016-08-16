import React from 'react';
import Recipe from './Recipe.js';
import RecipeList from './RecipeList.js';

class RecipePage extends React.Component {
    
    constructor(props, context){
        super(props, context);
        this.state = {
            recipes : [
                {id: 1, name: 'Lomo Saltado', description: 'Step one'},
                {id: 2, name: 'Cebiche', description: 'Step two'},
                {id: 3, name: 'Ocopa', description: 'Step three'}
        ]};
    }

    render(){
        return (
            <div>
                <RecipeList recipes={this.state.recipes} />
            </div>
        );
    }
}

export default RecipePage;