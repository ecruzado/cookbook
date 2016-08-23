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
                    <Ingredient key={i.id} 
                        {...i} 
                        onChange={onChange.bind(this)} 
                        onRemove={onRemove.bind(this, i.id)} />
                )}
                <tr>
                    <td>
                        <input type="text" ref={node => {inputIngredient = node}} />
                    </td>
                    <td>
                        <input type="text" ref={node => {inputQuanity = node}} />
                    </td>
                    <td><a href="" className="btn-floating" onClick={e => {
                        e.preventDefault();
                        onAdd({name: inputIngredient.value, quantity: inputQuanity.value});
                        inputIngredient.value = "";
                        inputQuanity.value = "";
                    }} ><i className="material-icons">add</i></a></td>
                </tr>
            </tbody>
        </table>
    );
};

export default IngredientList;