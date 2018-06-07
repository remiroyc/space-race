import React, { Component } from 'react'
import Background from './Background'
import Ships from './Ships'
import Header from './Header'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Ships />
        <Background />
      </div>
    )
  }
}

export default App
