import React from 'react';
import Header from './Header';
import HeaderSearch from '../containers/HeaderSearch';
import Footer from './Footer';
import ListFilter from './ListFilter';
import AddRecipe from '../containers/AddRecipe';
import RecipeFormContainer from '../containers/RecipeFormContainer';
import VisibleRecipeList from '../containers/VisibleRecipeList';
//import $ from "jquery";
import Materialize from 'materialize-css';

// const App = () => (
//   <div>
//     <Header />
//     <ListFilter />
//     <VisibleRecipeList />
//     <AddRecipe />
//     <Footer />
//   </div>
// )
class App extends React.Component{
  render(){
    return(
      <div>
        <HeaderSearch/>
        <ListFilter />
        <VisibleRecipeList />
        <RecipeFormContainer />
        <Footer />
      </div>
    );
  }

  componentDidMount(){
    //Materialize.updateTextFields();
    $('select').material_select();
  }  
}

export default App