import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { setCategoryFilter } from '../../actions/recipeActions';

@connect(
  (state, ownProps) => ({
    active: ownProps.filter === state.categoryFilter
  }), 
  (dispatch, ownProps) => ({
    onClick: (event) => {
      event.preventDefault();
      dispatch(setCategoryFilter(ownProps.filter));
    }
  })
)
export default class FilterLink extends React.Component {
  render(){
    let currentClass = this.props.active? 'active': 'waves-effect';

    return (
      <li className={currentClass}>
        <a href="#" onClick={this.props.onClick}>
          {this.props.children}
        </a>
      </li>
    )
  }    
}