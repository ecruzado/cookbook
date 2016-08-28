import React, {PropTypes}  from 'react';
import {connect} from 'react-redux';
import {Header} from './Header';
import {Footer} from './Footer';
import materializecss from 'materialize-css';

@connect(
  (state, ownProps) => ({loading: state.ajaxCallsInProgress > 0})
)
export class App extends React.Component {
  render() {
    return (
      <div>
        <Header loading={this.props.loading}/>
        <div className="container-fluid">
          {this.props.children}
        </div>
        <Footer/>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};