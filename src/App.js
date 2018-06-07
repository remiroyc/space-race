import React, { Component } from 'react'
import Background from './Background'
import Ships from './Ships'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Ships />
        <Background />
      </div>
    )
  }
}

export default App
