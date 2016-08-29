import React from 'react'
import autobind from 'autobind-decorator';

export class Star extends React.Component {

    constructor(props){
        super(props);
    }

    @autobind
    onMouseEnter(){
        if(this.props.onMouseEnter){
            this.props.onMouseEnter(this.props.index);
        }
    }

    @autobind
    onMouseLeave(){
        if(this.props.onMouseLeave){
            this.props.onMouseLeave(this.props.index);
        }
    }

    @autobind
    onClick(){
        this.props.onClick(this.props.index);
    }

    render(){
        return (
            <i className={this.props.cssClass} 
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                onClick={this.onClick}>star</i>
        );

    }
};