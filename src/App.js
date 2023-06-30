import React, { Component } from "react";
import axios from "axios";
import "./App.css";
//I want to be able to type the name of the user and get the repos that I have so in this case I am only be concerned about the "repos_url" nd my infos properties 
//http://api.github.com/users/<USER_NAME>?client_id=<YOUR_CLIENT_ID>&client_secret=<YOUR_CLIENT_SECRET>&sort=created

import UserForm from "./components/UserForm";
import Repos from "./components/Repos";

class App extends Component {
  state = {
    repos: [],
    location:null,
    fullName:null,
    userName:null,
    emailAddress:null,
    photo:null,

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
        const photo = res.data.avatar_url
        console.log(photo)
        const fullName = res.data.name
        console.log(fullName)
        const userName = res.data.login
        console.log(userName)
        const repos = res.data.repos_url;
        console.log(repos);
        const location = res.data.location;
        console.log(location)
        const emailAddress = res.data.email;
        console.log(emailAddress)
        this.setState({ photo: photo });
        this.setState({ fullName: fullName });
        this.setState({ userName: userName });
        this.setState({ location: location }); 
        this.setState({ emailAddress: emailAddress });
        axios.get(repos).then((reposRes) => {
          console.log(reposRes.data)
          this.setState({ repos: reposRes.data }); //the property of the state that we need is repos that we need to set this to repos 

        })
      });
    } else return;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">HTTP Calls to GitHub - React challenge</h1>
        </header>
        <UserForm getUser={this.getUser} />
        {this.state.repos.length > 0 ? (
          <div>
            <img className= "userphoto" src={this.state.photo} alt="SearchedUser" />
            <p>User Repositories: {this.state.repos.length}</p>
            <p>Full Name: {this.state.fullName}</p>
            <p>UserName: {this.state.userName}</p>
            <p>Location: {this.state.location}</p>
            <p>Email Address: {this.state.emailAddress}</p>
            <Repos repos={this.state.repos} />
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