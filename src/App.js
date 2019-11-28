import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import SignInForm from './components/SignInForm/SignInForm';
import RegisterForm from './components/RegisterForm/RegisterForm';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css'; 

const particlesOptions = {
  particles: {
    number: {
      value: 120,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }  
}
const initialState = {
  input: '',
  imageURL: '',
  faceBox: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: '',
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  calculateBoundingBox = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const img = document.getElementById('face');
    const width = Number(img.width);
    const height = Number(img.height);
    return {
      top_row : height * clarifaiFace.top_row,
      left_col : width * clarifaiFace.left_col,
      bottom_row : height - (height * clarifaiFace.bottom_row),
      right_col : width - (width * clarifaiFace.right_col)
    }
  }

  displayFaceBox = (box) => {
    this.setState({faceBox: box});
  }

  onPictureSubmit = () => {
    this.setState({imageURL: this.state.input});
    fetch('https://blooming-woodland-39722.herokuapp.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      if(response) {
        fetch('https://blooming-woodland-39722.herokuapp.com/image', {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, { entries: count }));
        })
        .catch(error => console.log(error));
      }
     this.displayFaceBox(this.calculateBoundingBox(response))})
    .catch((error) => console.log(error));
  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState(initialState)
    }
    else if(route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });
  }
  
  loadProfile = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
    // console.log(this.state.user);
  }

  render() {
    const { isSignedIn, imageURL, faceBox, route } = this.state;
    const { name, entries } = this.state.user;
    return ( 
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation isSignedIn={ isSignedIn } onRouteChange={ this.onRouteChange }/>
        {
          route === 'home' ?
          <div>
            <Logo />
            <Rank name={ name } entries={ entries }/>
            <ImageLinkForm onInputChange={this.onInputChange} onPictureSubmit={ this.onPictureSubmit }/>
            <FaceRecognition faceBox={ faceBox } imageURL={ imageURL }/>
          </div> :
          (
            route === 'signin' ?
            <SignInForm loadProfile={ this.loadProfile } onRouteChange={ this.onRouteChange } /> :
            <RegisterForm loadProfile = { this.loadProfile } onRouteChange={ this.onRouteChange } /> 
          )
        }
      </div>
    );
  }
}

export default App;
