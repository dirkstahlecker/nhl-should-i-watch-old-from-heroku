import React, { Component } from 'react'
import './App.css'
const Cookies = require('js-cookie');

require('es6-promise').polyfill();
const fetch = require('isomorphic-fetch');

class App extends Component
{
  LOCAL = true;

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
  STARS =25;
  KINGS = 26;
  SHARKS = 28;
  BLUEJACKETS = 29;
  WILD = 30;
  JETS = 52;
  COYOTES = 53;
  KNIGHTS = 54;

  state = {
    error: null,
    worthWatching: null,
    initialSelectedTeam: this.BRUINS,
    margin: this.DEFAULT_MARGIN,
    percentage: this.DEFAULT_PERCENTAGE,
    maxWinDifferential: this.DEFAULT_WIN_DIFF,
  }

  DEFAULT_MARGIN = "1";
  DEFAULT_PERCENTAGE = "10";
  DEFAULT_WIN_DIFF = ""

  setInitialSelectedTeam = async () => {
    const selectedCookie = Cookies.get("initialSelectedTeam");
    if (selectedCookie != null)
    {
      this.setState({initialSelectedTeam: selectedCookie});
      return selectedCookie;
    }

    const locationUrl = "http:\//ip-api.com/json/?fields=status,message,countryCode,region,regionName,city,query";
    const locationDataRaw = await fetch(locationUrl); //, {mode: "no-cors"}
    const locationData = await locationDataRaw.json();

    console.log("Location data region: " + locationData.region);

    if (locationData.status === "fail")
    {
      return; //use defaults
    }

    let initialSelectedTeam = this.BRUINS //TODO

    //https://ip-api.com/docs/api:json#test

    switch (locationData.region)
    {
      case "AL":
        initialSelectedTeam = this.PREDATORS;
        break;
      case "AK":
        initialSelectedTeam = this.CANUCKS;
        break;
      case "AZ":
        initialSelectedTeam = this.COYOTES;
        break;
      case "AR":
        initialSelectedTeam = this.STARS;
        break;
      case "CA":
        //TODO
        initialSelectedTeam = this.KINGS;
        break;
      case "CO":
        initialSelectedTeam = this.AVALANCHE;
        break;
      case "CT":
        initialSelectedTeam = this.BRUINS;
        break;
      case "DE":
        initialSelectedTeam = this.FLYERS;
        break;
      case "FL":
        initialSelectedTeam = this.PANTHERS;
        //TODO
        break;
      case "GA":
        initialSelectedTeam = this.LIGHTNING;
        break;
      case "HI":
        initialSelectedTeam = this.SHARKS;
        break;
      case "ID":
        initialSelectedTeam = this.AVALANCHE;
        break;
      case "IL":
        initialSelectedTeam = this.BLACKHAWKS;
        break;
      case "IN":
        initialSelectedTeam = this.BLACKHAWKS;
        break;
      case "IA":
        initialSelectedTeam = this.WILD;
        break;
      case "KS":
        initialSelectedTeam = this.AVALANCHE;
        break;
      case "KY":
        initialSelectedTeam = this.PREDATORS;
        break;
      case "LA":
        initialSelectedTeam = this.STARS;
        break;
      case "ME":
        initialSelectedTeam = this.BRUINS;
        break;
      case "MD":
        initialSelectedTeam = this.CAPITALS;
        break;
      case "MA":
        initialSelectedTeam = this.BRUINS;
        break;
      case "MI":
        initialSelectedTeam = this.REDWINGS;
        break;
      case "MN":
        initialSelectedTeam = this.WILD;
        break;
      case "MS":
        initialSelectedTeam = this.PREDATORS;
        break;
      case "MO":
        initialSelectedTeam = this.BLUES;
        break;
      case "MT":
        initialSelectedTeam = this.FLAMES;
        break;
      case "NE":
        initialSelectedTeam = this.AVALANCHE;
        break;
      case "NV":
        initialSelectedTeam = this.KNIGHTS;
        break;
      case "NH":
        initialSelectedTeam = this.BRUINS;
        break;
      case "NJ":
        initialSelectedTeam = this.DEVILS;
        break;
      case "NM":
        initialSelectedTeam = this.COYOTES;
        break;
      case "NY":
        initialSelectedTeam = this.RANGERS; //TODO:
        break;
      case "NC":
        initialSelectedTeam = this.HURRICANES;
        break;
      case "ND":
        initialSelectedTeam = this.JETS;
        break;
      case "OH":
        initialSelectedTeam = this.BLUEJACKETS;
        break;
      case "OK":
        initialSelectedTeam = this.STARS;
        break;
      case "OR":
        initialSelectedTeam = this.CANUCKS;
        break;
      case "PA":
        initialSelectedTeam = this.PENGUINS; //TODO
        break;
      case "RI":
        initialSelectedTeam = this.BRUINS;
        break;
      case "SC":
        initialSelectedTeam = this.HURRICANES;
        break;
      case "SD":
        initialSelectedTeam = this.WILD;
        break;
      case "TN":
        initialSelectedTeam = this.PREDATORS;
        break;
      case "TX":
        initialSelectedTeam = this.STARS;
        break;
      case "UT":
        initialSelectedTeam = this.KNIGHTS;
        break;
      case "VT":
        initialSelectedTeam = this.BRUINS;
        break;
      case "VA":
        initialSelectedTeam = this.CAPITALS;
        break;
      case "WA":
        initialSelectedTeam = this.CANUCKS;
        break;
      case "WV":
        initialSelectedTeam = this.PENGUINS;
        break;
      case "WI":
        initialSelectedTeam = this.WILD;
        return;
      case "WY":
        initialSelectedTeam = this.AVALANCHE;
        break;
      case "AB":
        initialSelectedTeam = this.OILERS; //TODO
        break;
      case "BC":
        initialSelectedTeam = this.CANUCKS;
        break;
      case "MB":
        initialSelectedTeam = this.JETS;
        break;
      case "NB":
        initialSelectedTeam = this.BRUINS;
        break;
      case "NL":
        initialSelectedTeam = this.CANADIENS;
        break;
      case "NS":
        initialSelectedTeam = this.CANADIENS;
        break;
      case "ON":
        initialSelectedTeam = this.LEAFS;
        break;
      case "PE":
        initialSelectedTeam = this.CANADIENS;
        break;
      default:
        initialSelectedTeam = this.BRUINS;
        break;
    }

    this.setState({initialSelectedTeam: initialSelectedTeam});
    Cookies.set("initialSelectedTeam", initialSelectedTeam);
  }

  componentDidMount()
  {
    this.setInitialSelectedTeam();

    const marginCookie = Cookies.get("margin");
    if (marginCookie !== undefined)
    {
      this.setState({margin: marginCookie});
    }
    else
    {
      this.setState({margin: this.DEFAULT_MARGIN});
    }

    const percentCookie = Cookies.get("percentage");
    if (percentCookie !== undefined)
    {
      this.setState({percentage: percentCookie});
    }
    else
    {
      this.setState({percentage: this.DEFAULT_PERCENTAGE});
    }

    const maxWinCookie = Cookies.get("maxWinDifferential");
    if (maxWinCookie !== undefined)
    {
      this.setState({maxWinDifferential: maxWinCookie});
    }
    else
    {
      this.setState({maxWinDifferential: this.DEFAULT_WIN_DIFF});
    }

    //default to today's date
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0
    var yyyy = today.getFullYear();
    if (dd<10)
    {
      dd='0'+dd
    }
    if (mm<10)
    {
      mm='0'+mm
    }
    today = yyyy + "-" + mm + "-" + dd;

    document.getElementById("date").value = today;
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

    const metric = 1;

    const urlPrefix = this.LOCAL ? "http:\//localhost:5000" : "https:\//nhl-should-i-watch.herokuapp.com"; //TODO:
    var url = urlPrefix + "/api/worthWatching/" + teamId + "/" + dateStr + "/" + metric;
    console.log("fetching url " + url);

    const differential = document.getElementById("marginInp").value;
    const randomPercent = document.getElementById("randomPercent").value;
    const maxWinDifferential = document.getElementById("maxWinDifferential").value;

    const response = await this.postData(url, {differential: differential, randomPercent: randomPercent, maxWinDifferential: maxWinDifferential});

    if (response.error)
    {
      this.setState({error: response.error});
      return;
    }

    this.setState({error: response.error, worthWatching: response.worthWatching});
    
  }

  postData = async (url = '', data = {}) =>
  {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, *cors, same-origin
      // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // redirect: 'follow', // manual, *follow, error
      // referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
  }

  onMarginChange = (e) => {
    const margin = e.currentTarget.value;
    this.setState({margin: margin});
    Cookies.set("margin", margin);
  }

  onPercentChange = (e) => {
    const percentage = e.currentTarget.value;
    this.setState({percentage: percentage});
    Cookies.set("percentage", percentage);
  }

  onTeamChange = (e) => {
    const teamId = e.currentTarget.value;
    this.setState({initialSelectedTeam: teamId});
    Cookies.set("initialSelectedTeam", teamId);
  }

  onMaxWinChange = (e) => {
    const maxWinDiff = e.currentTarget.value;
    this.setState({maxWinDifferential: maxWinDiff});
    Cookies.set("maxWinDifferential", maxWinDiff);
  }

  render() 
  {
    return (
      <div className="App">
        <h1>Should I Watch?</h1>
        <h3>Quickly find out if a recorded NHL game is worth watching</h3>
        <div className="columnSection gameOptions">
          <label for="teamId">Team: </label>
          <select id="teamId" onChange={this.onTeamChange} value={this.state.initialSelectedTeam}>
            <option value={this.DEVILS}>New Jersey Devils</option>
            <option value={this.ISLANDERS}>New York Islanders</option>
            <option value={this.RANGERS}>New York Rangers</option>
            <option value={this.FLYERS}>Philadelphia Flyers</option>
            <option value={this.PENGUINS}>Pittsburgh Penguins</option>
            <option value={this.BRUINS}>Boston Bruins</option>
            <option value={this.SABRES}>Buffalo Sabres</option>
            <option value={this.CANADIENS}>Montreal Canadiens</option>
            <option value={this.SENATORS}>Ottawa Senators</option>
            <option value={this.LEAFS}>Toronto Maple Leafs</option>
            <option value={this.HURRICANES}>Carolina Hurricanes</option>
            <option value={this.PANTHERS}>Florida Panthers</option>
            <option value={this.LIGHTNING}>Tampa Bay Lightning</option>
            <option value={this.CAPITALS}>Washington Capitals</option>
            <option value={this.BLACKHAWKS}>Chicago Blackhawks</option>
            <option value={this.REDWINGS}>Detroit Red Wings</option>
            <option value={this.PREDATORS}>Nashville Predators</option>
            <option value={this.BLUES}>St. Louis Blues</option>
            <option value={this.FLAMES}>Calgary Flames</option>
            <option value={this.AVALANCHE}>Colorado Avalanche</option>
            <option value={this.OILERS}>Edmonton Oilers</option>
            <option value={this.CANUCKS}>Vancouver Canucks</option>
            <option value={this.DUCKS}>Anaheim Ducks</option>
            <option value={this.STARS}>Dallas Stars</option>
            <option value={this.KINGS}>Los Angeles Kings</option>
            <option value={this.SHARKS}>San Jose Sharks</option>
            <option value={this.BLUEJACKETS}>Columbus Blue Jackets</option>
            <option value={this.WILD}>Minnesota Wild</option>
            <option value={this.JETS}>Winnipeg Jets</option>
            <option value={this.COYOTES}>Arizona Coyotes</option>
            <option value={this.KNIGHTS}>Vegas Golden Knights</option>
          </select>

          &nbsp;
          <label for="date">Game Date: </label>
          <input type="date" id="date"/>

          &nbsp;
          <button onClick={this.fetchData}>Should I Watch?</button>
        </div>
        <div className="columnSection resultsArea">
          {
            this.state.worthWatching != null && this.state.error == null &&
            <div className={this.state.worthWatching ? "resultYes" : "resultNo"}>
              {this.state.worthWatching ? "YES" : "NO"}
            </div>
          }
          {
            this.state.error != null &&
            <div className="resultError">
              {this.state.error}
            </div>
          }
          {
            this.state.error == null && this.state.worthWatching == null &&
            <div className="resultPlaceholder">&nbsp;</div>
          }
        </div>
        <div className="columnSection metrics">
          <label for="marginInp">Losing Margin: </label>
          <input type="number" id="marginInp" className="numberInput" value={this.state.margin} onChange={this.onMarginChange}/>

          <label for="randomPercent">Random Percentage: </label>
          <input type="number" id="randomPercent" className="numberInput" value={this.state.percentage} onChange={this.onPercentChange}/>

          <label for="maxWinDifferential">Max Win Differential: </label>
          <input type="number" id="maxWinDifferential" className="numberInput" value={this.state.maxWinDifferential} onChange={this.onMaxWinChange}/>
        </div>
      </div>
    )
  }
}

export default App


/* TODO

-styling


*/