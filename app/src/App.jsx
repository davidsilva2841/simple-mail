import React, { Component } from 'react';




class App extends Component {
  
  render () {
    return (
      <div>
        App loaded
        <button
          onClick={ () => {
            window.location.href = 'https://24007360898-f8jh1njqd7tnqrnh9hh97dmggnv904vd.apps.googleusercontent.com'
          } }
        >
          Click me
        </button>
      </div>
    );
  }
}

export default App;
