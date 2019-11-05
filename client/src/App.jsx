import React, { Component } from 'react'
import './App.css'

require('es6-promise').polyfill();
const fetch = require('isomorphic-fetch');

class App extends Component
{
  LOCAL = false;

  //team IDs
  DEVILS = 1;
  ISLANDERS = 2;
  RANGERS = 3;
  FLYERS = 4;
  PENGUINS = 5;
  BRUINS = 6;
  SABRES = 7;
  CANADIENS = 8;
  SENATORS = 9;
  LEAFS = 10;
  HURRICANES = 12;
  PANTHERS = 13;
  LIGHTNING = 14;
  CAPITALS = 15;
  BLACKHAWKS = 16;
  REDWINGS = 17;
  PREDATORS = 18;
  BLUES = 19;
  FLAMES = 20;
  AVALANCHE = 21;
  OILERS = 22;
  CANUCKS = 23;
  DUCKS = 24;
  KINGS = 26;
  SHARKS = 28;
  BLUEJACKETS = 29;
  WILD = 30;
  COYOTES = 53;
  KNIGHTS = 54;

  state = {
    error: null,
    worthWatching: null,
    initialSelectedTeam: this.BRUINS,
  }

  getInitialSelectedTeam = async () => {
    const locationUrl = "http:\//ip-api.com/json/?fields=status,message,countryCode,region,regionName,city,query";
    const locationDataRaw = await fetch(locationUrl); //, {mode: "no-cors"}
    console.log(locationDataRaw);
    const locationData = await locationDataRaw.json();

    console.log("Location data region: " + locationData.region);

    if (locationData.status == "fail")
    {
      return; //use defaults
    }

    this.initialSelectedTeam = this.BRUINS //TODO

    switch (locationData.region)
    {
      case "MA":
        this.setState({initialSelectedTeam: this.BRUINS});
        break;
      case "NJ":
        this.setState({initialSelectedTeam: this.DEVILS});
        break;
    }

    console.log("initial team: " + this.initialSelectedTeam)
  }

  componentDidMount()
  {
    this.getInitialSelectedTeam();
  }

  fetchData = async () => {
    const teamId = document.getElementById("teamId").value;
    const dateStr = document.getElementById("date").value;

    const day = dateStr.substring(8, 10);
    const date = new Date(dateStr);
    // const isValidDate = (Boolean(+date) && date.getDate() == day);

    if (date && isNaN(date))
    {
      this.setState({error: "Invalid date"});
      return;
    }
    
    var absolute_path = __dirname;

    const urlPrefix = this.LOCAL ? "http:\//localhost:5000" : "https:\//nhl-should-i-watch.herokuapp.com"; //TODO:
    var url = urlPrefix + "/api/worthWatching/" + teamId + "/" + dateStr;
    console.log("fetching url " + url);
    const responseRaw = await fetch(url);
    const response = await responseRaw.json();

    if (response.error)
    {
      this.setState({error: response.error});
      return;
    }

    this.setState({error: response.error, worthWatching: response.worthWatching});
    
  }

  render() 
  {
    return (
      <div className="App">
        <select id="teamId">
          <option value={this.DEVILS} selected={this.state.initialSelectedTeam == this.DEVILS}>New Jersey Devils</option>
          <option value="2">New York Islanders</option>
          <option value="3">New York Rangers</option>
          <option value="4">Philadelphia Flyers</option>
          <option value="5">Pittsburgh Penguins</option>
          <option value={this.BRUINS} selected={this.state.initialSelectedTeam == this.BRUINS}>Boston Bruins</option>
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

        <label for="date">Date:</label><input type="date" id="date"/>

        <button onClick={this.fetchData}>Should I Watch?</button>

        {
          this.state.worthWatching != null && this.state.error == null &&
          <div>
            {this.state.worthWatching ? "YES" : "NO"}
          </div>
        }
        {
          this.state.error != null &&
          <div>
            {this.state.error}
          </div>
        }
      </div>
    )
  }
}

export default App
