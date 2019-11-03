import React, { Component } from 'react'
import './App.css'

require('es6-promise').polyfill();
const fetch = require('isomorphic-fetch');

class App extends Component {

  // componentDidMount() {
  //   this.fetchCow()
  // }

  fetchCow = async () => {
    const teamId = document.getElementById("teamId").value;
    var absolute_path = __dirname;
    var url = "http://localhost:5000" + "/api/worthWatching/" + teamId; //TODO
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
        <select id="teamId">
          <option value="1">New Jersey Devils</option>
          <option value="2">New York Islanders</option>
          <option value="3">New York Rangers</option>
          <option value="4">Philadelphia Flyers</option>
          <option value="5">Pittsburgh Penguins</option>
          <option value="6">Boston Bruins</option>
          <option value="7">Buffalo Sabres</option>
          <option value="8">Montreal Canadiens</option>
          <option value="9">Ottawa Senators</option>
          <option value="10">Toronto Maple Leafs</option>
          <option value="12">Carolina Hurricanes</option>
          <option value="13">Florida Panthers</option>
          <option value="14">Tampa Bay Lightning</option>
          <option value="15">Washington Capitals</option>
          <option value="16">Chicago Blackhawks</option>
          <option value="17">Detroit Red Wings</option>
          <option value="18">Nashville Predators</option>
          <option value="19">St. Louis Blues</option>
          <option value="20">Calgary Flames</option>
          <option value="21">Colorado Avalanche</option>
          <option value="22">Edmonton Oilers</option>
          <option value="23">Vancouver Canucks</option>
          <option value="24">Anaheim Ducks</option>
          <option value="25">Dallas Stars</option>
          <option value="26">Los Angeles Kings</option>
          <option value="28">San Jose Sharks</option>
          <option value="29">Columbus Blue Jackets</option>
          <option value="30">Minnesota Wild</option>
          <option value="52">Winnipeg Jets</option>
          <option value="53">Arizona Coyotes</option>
          <option value="54">Vegas Golden Knights</option>
        </select>
        <button onClick={() => this.fetchCow()}>Make Request</button>

        <div id="yes" style={{display: "none"}}>YES</div>
        <div id="no" style={{display: "none"}}>NO</div>
      </div>
    )
  }
}

export default App
