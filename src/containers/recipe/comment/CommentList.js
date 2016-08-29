import React from 'react';
import {Comment} from './Comment';

export const CommentList = ({list}) => {
    console.log('comment list');
    console.log(typeof list);
    console.log(list);
    return (
        <div>
        {list && list.map((item,i) => (
            <Comment key={i}
                {...item}
            />
        ))};
        </div>
    );
};