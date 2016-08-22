import { connect } from 'react-redux';
import { setNameFilter } from '../actions/recipeActions';
import Header from './Header';

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onNameSearch: (event) => {
      console.log(event);
      if(event.key === 'Enter'){
        dispatch(setNameFilter(event.target.value));
      }
    }
  };
};

const HeaderSearch = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default HeaderSearch;