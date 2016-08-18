// import React, {PropTypes} from 'react';
// import Header from './common/Header';

// class App extends React.Component{
//     render(){
//         return(
//             <div>
//                 <Header/>
//                 {this.props.children}
//             </div>
//         );
//     }
// }

// App.propTypes = {
//     children: PropTypes.object.isRequired
// };

// export default App;
import React from 'react';
import ListFilter from './ListFilter';
import AddRecipe from '../containers/AddRecipe';
import VisibleRecipeList from '../containers/VisibleRecipeList';

const App = () => (
  <div>
    <ListFilter />
    <VisibleRecipeList />
    <AddRecipe />
  </div>
)

export default App