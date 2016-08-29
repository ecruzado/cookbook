import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import toastr from 'toastr';
import autobind from 'autobind-decorator';
import {Rating} from '../../components/rating';
import {loadRecipe, saveRating} from '../../actions/recipeActions';
import {CommentForm} from './comment/CommentForm';
import {CommentList} from './comment/CommentList';
import {CommentApiClient} from '../../apiClient/commentApiClient';

@connect(
  (state, ownProps) => ({
      recipe: state.recipe.recipe
  }),
  (dispatch) => ({
      onLoadRecipe: (id) =>{
        dispatch(loadRecipe(id));
      },
      onSaveRating: (rating) =>{
        dispatch(saveRating(rating));
      }
  })  
)
export class RecipeView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            recipe: this.props.recipe
        };
    }

    componentDidMount(){
        this.props.onLoadRecipe(this.props.params.id);
    }    

    componentWillReceiveProps(nextProps) {
        if (this.props.recipe !== nextProps.recipe) {
            this.setState({ recipe: Object.assign({}, nextProps.recipe) });
        }
    }    

  @autobind
  onRate(rate) {
    let rating = {
      recipeid:this.props.recipe.id,
      rate: rate,
      username: +new Date()
    };
    this.props.onSaveRating(rating);
  }

  @autobind
  onAddComment(text){
    console.log(text);
    let lastId = 1;
    if(this.props.recipe.comments.length > 0){
      lastId = this.state.recipe.comments[this.state.recipe.comments.length - 1].id;
    }
    let comment = {
        recipeid:this.props.recipe.id,
        comment:text,
        id: lastId + 1,
        username: +new Date()
    };
    
    CommentApiClient.postComment(comment).end((err,res)=>{

        if(!err){
            if(res.statusCode === 200
                && res.body.message === "success"){
                toastr.success("commented!");
                let tempRecipe = this.state.recipe;
                tempRecipe.comments = [comment, ...this.state.recipe.comments];
                this.setState({
                    recipe: tempRecipe
                });
            }else{
                toastr.error("Error: "+res.body.message);
                console.log(res.body.message);
            }
        }else{
            toastr.error(err);
            console.log(err);
        }

    });
  }

    render(){
        let rateMessage = 'AVG: ' + this.props.recipe.rate + ' NUMBER: '+this.props.recipe.rateNumber;
        
        return(
        <div className="container">
            <div className="col s12">
                <div className="row">
                    {this.props.recipe.name}
                </div>
                <div className="row">
                    {this.props.recipe.chef}
                </div>
                <div className="row">
                    {this.props.recipe.category}
                </div>
                <div className="row">
                    {this.props.recipe.preparation}
                </div>
            </div>

            {this.props.recipe && this.props.recipe.rate &&
            <Rating stars="5" 
                rate={this.props.recipe.rate}
                message={rateMessage} 
                allowClick={true} 
                onRate={this.onRate}/>
            }
            
            <CommentForm onSubmitComment={this.onAddComment}/>

            {this.state.recipe && this.state.recipe.comments && (
                <CommentList list={this.state.recipe.comments}/>
            )}
            
        </div>
        );
    }
}