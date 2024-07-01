import React, { Component } from "react";
import loader from '../loader.gif';

export default class Spinner extends Component{

    render(){
        return(
            <div className="container d-flex justify-content-center">
            <img src= {loader} alt="loader" style={{width: '100px'}} className="rounded-circle"/>
            </div>
        );
        
    }
}