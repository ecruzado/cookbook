import React from 'react';
import {connect} from 'react-redux';
import * as recipeActions from '../../actions/recipeActions';

class RecipeForm extends React.Component {

    constructor(props, context){
        super(props, context);
        this.state = {
            recipe: {name: '', description: ''}
        };

        this.onNameChange = this.onNameChange.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
    }

    onNameChange(event){
        const recipe = this.state.recipe;
        recipe.name = event.target.value;
        this.setState({recipe: recipe});
    }

    onDescriptionChange(event){
        const recipe = this.state.recipe;
        recipe.description = event.target.value;
        this.setState({recipe: recipe});        
    }

    onClickSave(){
        console.log(recipeActions.createRecipe(this.state.recipe));

        //alert(`Saving ${this.state.recipe.name}`);
        //this.props.dispatch(recipeActions.createRecipe(this.state.recipe));
    }

    render(){
        return (
            <div className="container">
                <div className="row">

                    <div className="divider"></div>

                    <h3>Add Recipe</h3>
                    <div className="row">
                        <div class="input-field col s12">
                            <input type="text"
                                name="name"
                                onChange={this.onNameChange.bind(this)}
                                value={this.state.recipe.name} />
                            <label for="name">Name</label>                        
                        </div>
                    </div>
                    <div className="row">
                        <div class="input-field col s12">
                            <textarea name="description" 
                                className="materialize-textarea"
                                onChange={this.onDescriptionChange.bind(this)}  
                                value={this.state.recipe.description}/>
                            <label for="description">Description</label>                        
                        </div>
                    </div>                    
                    <input type="submit"
                        value="Save"
                        onClick={this.onClickSave} />
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state, ownProps) => {
    return {
        recipes: state.recipes
    };
};

export default connect(mapStateToProps)(RecipeForm);