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
                .map((x,i)=> i<=+this.props.rate? cssClassBlack:cssClassGrey),
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
        if(this.state.rated)
            return;
        console.log("leave");
        let temp = this.state.arr.map((x,i)=>{
            return i<=+this.props.rate? cssClassBlack:cssClassGrey;
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
        this.props.onRate(index);
        let temp = this.state.arr.map((x,i)=>{
            return i<=index? cssClassAmber: cssClassGrey;
        });
        //console.log(temp);
        this.setState({
            arr: temp
        })
    }   

    render(){
        //console.log(+new Date());
        //console.log(this.state.arr);
        return(
            <div>
                {!this.rated && this.props.allowClick && this.state.arr && this.state.arr.map((x,i)=>(
                    <Star key={i} cssClass={x} 
                        onMouseEnter={this.onMouseEnter.bind(this,i)}
                        onMouseLeave={this.onMouseLeave.bind(this,i)}
                        onClick={this.onClick.bind(this,i)}/>
                ))}
                {!this.props.allowClick && this.state.arr && this.state.arr.map((x,i)=>(
                    <Star key={i} cssClass={x} />
                ))}                
            </div>    
        );                 
    }    
}