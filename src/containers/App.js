import React, {PropTypes}  from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import Footer from './Footer';

class App extends React.Component {
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
  children: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => ({loading: state.ajaxCallsInProgress > 0});

export default connect(mapStateToProps)(App);