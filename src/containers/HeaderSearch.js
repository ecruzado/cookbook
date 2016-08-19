import { connect } from 'react-redux';
import { setNameFilter } from '../actions/recipeActions';
import Header from '../components/Header';

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onNameSearch: (event) => {
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