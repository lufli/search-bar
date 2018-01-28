import React, { Component } from 'react';
import SearchBar from './components/SearchBar';
import Map from './components/Map';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <Map />
      </div>
    );
  }
}

export default App;
