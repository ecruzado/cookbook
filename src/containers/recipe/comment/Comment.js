import React from 'react';

export const Comment = ({id, user, comment})=>{
    return(
        <div>
            {id}
            {user}
            {comment}
        </div>
    );
};