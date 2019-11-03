import React, { Component } from 'react'
import './App.css'

require('es6-promise').polyfill();
const fetch = require('isomorphic-fetch');

class App extends Component {

  // componentDidMount() {
  //   this.fetchCow()
  // }

  fetchCow = async () => {
    var absolute_path = __dirname;
    var url = "http://localhost:5000" + "/api/worthWatching/6"; //TODO
    console.log("fetching url " + url);
    const responseRaw = await fetch(url);
    const response = await responseRaw.json();

    console.log(response.worthWatching == true);

    if (response.worthWatching == true)
    {
      document.getElementById("yes").style.display = "block";
    }
    else if (response.worthWatching == false)
    {
      document.getElementById("no").style.display = "block";
    }
  }

  render() 
  {
    return (
      <div className="App">
        <button onClick={() => this.fetchCow()}>Make Request</button>

        <div id="yes" style={{display: "none"}}>YES</div>
        <div id="no" style={{display: "none"}}>NO</div>
      </div>
    )
  }
}

export default App
