import React, { Component } from "react";
import axios from "axios";
import "./App.css";
//I want to be able to type the name of the user and get the number of repos that he has so in this case we are only be concerned about the "public_repos" nd my infos property 
//http://api.github.com/users/<USER_NAME>?client_id=<YOUR_CLIENT_ID>&client_secret=<YOUR_CLIENT_SECRET>&sort=created

import UserForm from "./components/UserForm";

class App extends Component {
  state = {
    repos: null,
    location:''
  };

  getUser = (e) => {
    //add a function to hook to the form that is in UserForm to make the form work
    e.preventDefault(); //prevent the page from reloading when I click em submit buttom
    const user = e.target.elements.username.value; //to grab the values that we need from the form (in UserForm.js we set the name attribute to username and that is what we need to grab the value)
    //console.log(user)
    if (user) {// if (user) and else prevents error if user do not type a username and click on submit
      
      axios.get(`http://api.github.com/users/${user}?client_id=bee4538f17de180181c0&client_secret=5df6881bfb137f5bf30673b198a74e9e5b63cc0b&sort=created`).then((res) => {
        //the res is storing the results that we need from this api
        console.log(res)
        const repos = res.data.public_repos;
        //console.log(repos);
        const location = res.data.location;
        console.log(location)
        this.setState({ repos: repos }); //the property of the state that we need is repos that we need to set this to repos (const repos = res.data.public_repos;)
        this.setState({ location: location }); 
      });
    } else return;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">HTTP Calls in React</h1>
        </header>
        <UserForm getUser={this.getUser} />
        {this.state.repos ? (
  <div>
    <p>Number of repos: {this.state.repos}</p>
    <p>Location: {this.state.location}</p>
  </div>
) : (
  <p>Please enter a username.</p>
)}
      </div>
    );
  }
}

export default App;
//<UserForm getUser={this.getUser}/>  here we pass the above function getUser to this UserForm component (we pass the function as props)
//{ this.state.repos ? <p>Number of repos: { this.state.repos }</p> : <p>Please enter a username.</p> }se a chamada estiver retornando resp mostra o numero de repos e se nao pedir para digitar username