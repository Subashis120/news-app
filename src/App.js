import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import React, { Component } from "react";


export default class App extends Component{
  list = ['business', 'entertainment', 'general', 'health', 'science', 
  'sports', 'technology'];

  state = {
    progress:0
  }
  setProgress = (progress)=> {
    this.setState({progress: progress})
  }
  render(){
  return (
    <>
    <Router>
      <Navbar />
      <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />
      <div className='container mt-5'>
        <h1><span className='fw-bolder text-danger'>NewsMonkey</span> - Top headlines</h1>
        <Routes>
        <Route exact path='/'  element={<News key={"business"} setProgress={this.setProgress} pageSize={6} category={'business'}/>}/>

        {this.list.map((cat) => {
            return(
              <Route exact path={"/"+cat} element={<News key={cat} setProgress={this.setProgress} pageSize={5} category={cat}/>}/>

            );
        })};

        {/* <Route exact path='/business' element={<News key={"busines"} pageSize={5} category={'business'}/>}/>
        <Route exact path='/entertainment' element={<News key={"entertainment"} pageSize={5} category={'entertainment'}/>}/>
        <Route exact path='/general' element={<News key={"general"} pageSize={5} category={'general'}/>}/>
        <Route exact path='/health' element={<News key={"health"} pageSize={5} category={'health'}/>}/>
        <Route exact path='/science' element={<News key={'science'} pageSize={5} category={'science'}/>}/>
        <Route exact path='/sports' element={<News key={'sports'} pageSize={5} category={'sports'}/>}/>
        <Route exact path='/technology' element={<News key={'technology'} pageSize={5} category={'technology'}/>}/> */}
        </Routes>
      </div> 
      </Router>
    </>
  );
}
}
