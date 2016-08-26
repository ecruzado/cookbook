import React from 'react'

export const Star = ({cssClass, onMouseEnter, onMouseLeave, onClick})=> {
    return (
        <i className={cssClass} 
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}>star</i>
    )
};