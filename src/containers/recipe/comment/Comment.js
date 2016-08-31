import React from 'react';

export const Comment = ({id, username, comment})=>{
    return(
        <li className="collection-item avatar">
            <i className="material-icons circle green">perm_identity</i>
            <span className="title">{username}</span>
            <p>{comment}</p>
        </li>
    );
};