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
      onLoadRecipe: (id ,slug) =>{
        dispatch(loadRecipe(id, slug));
      },
      onSaveRating: (rating) =>{
        dispatch(saveRating(rating));
      }
  })  
)
export class RecipeView extends React.Component {
    
    static propTypes={
        recipe: PropTypes.object.isRequired,
        params: PropTypes.object.isRequired,
        onSaveRating: PropTypes.func.isRequired,
        onLoadRecipe: PropTypes.func.isRequired
    }

    constructor(props){
        super(props);
        this.state = {
            recipe: this.props.recipe
        };
    }

    componentDidMount(){
        this.props.onLoadRecipe(null, this.props.params.slug);
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
            }
        }else{
            toastr.error(err);
        }

    });
  }

    render(){
        let rateMessage = 'AVG: ' + this.props.recipe.rate + ' NUMBER: '+this.props.recipe.ratenumber;
        let allowClick = true;
        return(
        <div className="container">
            <h2 className="col s12 header">{this.props.recipe.name}</h2>
            <div className="col s12">
                <h4>Chef</h4>
                <p>
                    {this.props.recipe.chef}
                </p>
                <h4>Category</h4>
                <p>
                    {this.props.recipe.category}
                </p>
                <h4>Preparation</h4>
                <p>
                    {this.props.recipe.preparation}
                </p>
                <h4>Rating</h4>
                {this.props.recipe && this.props.recipe.rate && (
                <Rating stars="5" 
                    rate={this.props.recipe.rate}
                    message={rateMessage} 
                    allowClick={allowClick} 
                    onRate={this.onRate}/>
                )}
            </div>

            <h3>Comments</h3>
            <CommentForm onSubmitComment={this.onAddComment}/>

            {this.state.recipe && this.state.recipe.comments && (
                <CommentList list={this.state.recipe.comments}/>
            )}
            
        </div>
        );
    }
}