import React, { PropTypes } from 'react';
import {Link, IndexLink } from 'react-router';
import autobind from 'autobind-decorator';

export class CommentForm extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {
      comment:''
    }
  }

  @autobind
  onChange(event){
      let value = event.target.value;
      this.setState({ comment: value });
  }

  @autobind
  onSubmit(event){
    event.preventDefault();
    this.props.onSubmitComment(this.state.comment);
    this.setState({ comment: '' });
  }

  render(){
    return(
      <form className="col s12" onSubmit={this.onSubmit}>
        <div className="row">
          <div className="input-field col s12">
            <textarea name="comment" className="materialize-textarea" rows="10" 
              value={this.state.comment}  onChange={this.onChange} />          
            <label className="active" for="comment">Comment</label>
          </div>
        </div>
        <div className="row right-align">
          <button type="submit" className="waves-effect waves-light btn-large">
            <i className="material-icons left">done</i>
            Comment
          </button>
        </div>
      </form>
    );
  }
}