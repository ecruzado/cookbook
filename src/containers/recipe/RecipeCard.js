import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import {Rating} from '../../components/rating';
import { locals as styles, cf, g } from '../../styles/recipecard.scss';

export const RecipeCard = ({ onClick, id, name, chef, category, preparation, slug, rate }) => {
    let onClickLocal = ()=> {
        onClick(id, name);
    };

    return(
    <div className="col s12 m6">
        <div className="card light-green lighten-5">
            <div className="card-content ">
                <span className="card-title">{name}</span>
                <p>{preparation}</p>
                <Rating stars="5" rate={rate} allowClick={false} />
            </div>
            <div className="card-action">
                <i className={cf('actionRecipeIcons', g('material-icons'))}>label_outline</i>{category}
                <span> | </span>
                <i className={cf(g('material-icons'), 'actionRecipeIcons')}>person_pin</i>{chef}
                <a href="javascript:void(0)" className={cf(g('right'))} onClick={onClickLocal}>Delete</a>
                <Link className={cf(g('right'))} to={"/recipe/edit/" + id}>Edit</Link>
                <Link className={cf(g('right'))} to={"/recipe/" + slug}>View</Link>
            </div>        
        </div>
    </div>
    );
};

RecipeCard.propTypes = {
 id: PropTypes.number.isRequired,
 onClick: PropTypes.func.isRequired
}