import React from 'react';
import Ingredient from './Ingredient';

const IngredientList = ({list, onAdd, onRemove, onChange})=> {
    let inputIngredient, inputQuanity;

    return (
        <table className="responsive-table">
            <thead>
                <tr>
                    <th>Ingredient</th>
                    <th>Quantity</th>
                    <th></th>
                </tr>
            </thead>  
            <tbody>      
                {list && list.map(i => 
                    <Ingredient key={i.id} {...i} onChange={onChange}/>
                )}
                <tr>
                    <td>
                        <input type="text" ref={node => {inputIngredient = node}} />
                    </td>
                    <td>
                        <input type="text" ref={node => {inputQuanity = node}} />
                    </td>
                    <td><a href="" className="btn-floating"><i className="material-icons">add</i></a></td>
                </tr>
            </tbody>
        </table>
    );
};

export default IngredientList;