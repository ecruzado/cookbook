import React from 'react'
import {Star} from './star';
import autobind from 'autobind-decorator';

const cssClassAmber = "material-icons amber-text";
const cssClassGrey = "material-icons grey-text";
const cssClassBlack = "material-icons";

export class Rating extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            arr: new Array(+props.stars)
                .fill(cssClassGrey)
                .map((x,i)=> i<=(this.props.rate-1)? cssClassBlack:cssClassGrey),
            rated: false
        };
    }

    @autobind
    onMouseEnter(index){
        let temp = this.state.arr.map((x,i)=>{
            return i<=index? cssClassAmber: cssClassGrey;
        });
        this.setState({
            arr: temp
        });
    }

    
    @autobind
    onMouseLeave(index){
        let temp = this.state.arr.map((x,i)=>{
            return i<=(this.props.rate-1)? cssClassBlack:cssClassGrey;
        });
        this.setState({
            arr: temp
        });
    }

    @autobind
    onClick(index){
        this.setState({
            rated: true
        });
        this.props.onRate(index + 1);
    }   

    render(){
        let onMouseEnter = (!this.state.rated && this.props.allowClick)? this.onMouseEnter:null;
        let onMouseLeave = (!this.state.rated && this.props.allowClick)? this.onMouseLeave:null;
        return(
            <div>
                {this.state.arr && this.state.arr.map((x,i)=>(
                    <Star key={i} 
                        cssClass={x}
                        index={i} 
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        onClick={this.onClick}/>
                ))}
                <span>{this.props.message}</span>
            </div>    
        );                 
    }    
}