import React, {PropTypes} from 'react';

class Recipe extends React.Component {
    constructor(props, context){
        super(props, context);
    }

    render(){
        return (
            <div>
                <p>Name: {this.props.name}</p>
                <p>Description: {this.props.description}</p>
            </div>
        );
    }
}

Recipe.propTypes = {
    name: PropTypes.object.isRequired,
    description: PropTypes.object.isRequired
};

export default Recipe;