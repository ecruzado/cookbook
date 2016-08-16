import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const RecipeList = (props) => {
    return(
        <div className="col s12">
            <h2>Recipe List</h2>
            <Link to="/newRecipe">New</Link>
            <table className="bordered striped">
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Description</td>
                    </tr>
                </thead>
                <tbody>
                {props.recipes.map((recipe, index)=>{
                    return (<tr key={index}>
                        <td>{recipe.name}</td>
                        <td>{recipe.description}</td> 
                    </tr>);
                })}
                </tbody>
            </table>   
        </div>        
     
    );
};

RecipeList.propTypes = {
    recipes: PropTypes.array.isRequired
};

export default RecipeList;