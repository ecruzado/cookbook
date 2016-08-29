import React from 'react';

export const Ingredient = ({id, name, quantity, onChange, onRemove})=> {
    let inputName, inputQuantity;  
    return (
        <tr>
            <td>
                <i className="material-icons prefix">trending_flat</i>  
            </td>
            <td>
                <input placeholder="Name:" ref={c => {
                    inputName = c;
                    if(inputName && name){
                        inputName.value = name;
                    }
                }} onChange={ c=> {
                    if(inputName && inputQuantity){
                        onChange({id,name:inputName.value, quantity: inputQuantity.value})}
                    }
                }/>
            </td>
            <td>
                <i className="material-icons prefix">play_for_work</i>  
            </td>
            <td>
                <input placeholder="Quantity:" ref={c=> {
                    inputQuantity = c;
                    if(inputQuantity && quantity){
                        inputQuantity.value = quantity;
                    }
                }} onChange={ c=> {
                    if(inputName && inputQuantity){
                        onChange({id,name:inputName.value, quantity: inputQuantity.value})}
                    }
                }/>
            </td>
            <td><a className="btn-floating red" onClick={(e)=>{
                e.preventDefault();
                onRemove(id);
            }}><i className="material-icons">remove</i></a></td>
        </tr>
    );
};