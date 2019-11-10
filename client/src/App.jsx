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
  }

  DEFAULT_MARGIN = "1";
  DEFAULT_PERCENTAGE = "10";

  getInitialSelectedTeam = async () => {
    const locationUrl = "http:\//ip-api.com/json/?fields=status,message,countryCode,region,regionName,city,query";
    const locationDataRaw = await fetch(locationUrl); //, {mode: "no-cors"}
    console.log(locationDataRaw);
    const locationData = await locationDataRaw.json();

    console.log("Location data region: " + locationData.region);

    if (locationData.status === "fail")
    {
      return; //use defaults
    }

    this.initialSelectedTeam = this.BRUINS //TODO

    //https://ip-api.com/docs/api:json#test

    switch (locationData.region)
    {
      case "AL":
        this.setState({initialSelectedTeam: this.PREDATORS});
        return;
      case "AK":
        this.setState({initialSelectedTeam: this.CANUCKS});
        return;
      case "AZ":
        this.setState({initialSelectedTeam: this.COYOTES});
        return;
      case "AR":
        this.setState({initialSelectedTeam: this.STARS});
        return;
      case "CA":
        //TODO
        this.setState({initialSelectedTeam: this.KINGS});
        return;
      case "CO":
        this.setState({initialSelectedTeam: this.AVALANCHE});
        return;
      case "CT":
        this.setState({initialSelectedTeam: this.BRUINS});
        return;
      case "DE":
        this.setState({initialSelectedTeam: this.FLYERS});
        return;
      case "FL":
        this.setState({initialSelectedTeam: this.PANTHERS});
        //TODO
        return;
      case "GA":
        this.setState({initialSelectedTeam: this.LIGHTNING});
        return;
      case "HI":
        this.setState({initialSelectedTeam: this.SHARKS});
        return;
      case "ID":
        this.setState({initialSelectedTeam: this.AVALANCHE});
        break;
      case "IL":
        this.setState({initialSelectedTeam: this.BLACKHAWKS});
        return;
      case "IN":
        this.setState({initialSelectedTeam: this.BLACKHAWKS});
        return;
      case "IA":
        this.setState({initialSelectedTeam: this.WILD});
        return;
      case "KS":
        this.setState({initialSelectedTeam: this.AVALANCHE});
        return;
      case "KY":
        this.setState({initialSelectedTeam: this.PREDATORS});
        return;
      case "LA":
        this.setState({initialSelectedTeam: this.STARS});
        return;
      case "ME":
        this.setState({initialSelectedTeam: this.BRUINS});
        return;
      case "MD":
        this.setState({initialSelectedTeam: this.CAPITALS});
        return;
      case "MA":
        this.setState({initialSelectedTeam: this.BRUINS});
        return;
      case "MI":
        this.setState({initialSelectedTeam: this.REDWINGS});
        return;
      case "MN":
        this.setState({initialSelectedTeam: this.WILD});
        return;
      case "MS":
        this.setState({initialSelectedTeam: this.PREDATORS});
        return;
      case "MO":
        this.setState({initialSelectedTeam: this.BLUES});
        return;
      case "MT":
        this.setState({initialSelectedTeam: this.FLAMES});
        return;
      case "NE":
        this.setState({initialSelectedTeam: this.AVALANCHE});
        return;
      case "NV":
        this.setState({initialSelectedTeam: this.KNIGHTS});
        return;
      case "NH":
        this.setState({initialSelectedTeam: this.BRUINS});
        return;
      case "AL":
        this.setState({initialSelectedTeam: this.PREDATORS});
        return;
      case "NJ":
        this.setState({initialSelectedTeam: this.DEVILS});
        break;
      case "NM":
        this.setState({initialSelectedTeam: this.COYOTES});
        return;
      case "NY":
        this.setState({initialSelectedTeam: this.RANGERS}); //TODO:
        return;
      case "NC":
        this.setState({initialSelectedTeam: this.HURRICANES});
        return;
      case "ND":
        this.setState({initialSelectedTeam: this.JETS});
        return;
      case "OH":
        this.setState({initialSelectedTeam: this.BLUEJACKETS});
        return;
      case "OK":
        this.setState({initialSelectedTeam: this.STARS});
        return;
      case "OR":
        this.setState({initialSelectedTeam: this.CANUCKS});
        return;
      case "PA":
        this.setState({initialSelectedTeam: this.PENGUINS}); //TODO
        return;
      case "RI":
        this.setState({initialSelectedTeam: this.BRUINS});
        return;
      case "SC":
        this.setState({initialSelectedTeam: this.HURRICANES});
        return;
      case "SD":
        this.setState({initialSelectedTeam: this.WILD});
        return;
      case "TN":
        this.setState({initialSelectedTeam: this.PREDATORS});
        return;
      case "TX":
        this.setState({initialSelectedTeam: this.STARS});
        return;
      case "UT":
        this.setState({initialSelectedTeam: this.KNIGHTS});
        return;
      case "VT":
        this.setState({initialSelectedTeam: this.BRUINS});
        return;
      case "VA":
        this.setState({initialSelectedTeam: this.CAPITALS});
        return;
      case "WA":
        this.setState({initialSelectedTeam: this.CANUCKS});
        return;
      case "WV":
        this.setState({initialSelectedTeam: this.PENGUINS});
        return;
      case "WI":
        this.setState({initialSelectedTeam: this.WILD});
        return;
      case "WY":
        this.setState({initialSelectedTeam: this.AVALANCHE});
        return;
      default:
        this.setState({initialSelectedTeam: this.BRUINS});
        return;
    }
  }

  componentDidMount()
  {
    this.getInitialSelectedTeam();

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

    const response = await this.postData(url, {differential: differential, randomPercent: randomPercent});

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

  postTest = async () => {
    const urlPrefix = this.LOCAL ? "http:\//localhost:5000" : "https:\//nhl-should-i-watch.herokuapp.com"; //TODO:
    var url = urlPrefix + "/api/setMetric";

    let result = await this.postData(url, {"data": "A THING"});
    console.log(result);
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

  render() 
  {
    return (
      <div className="App">
        <div>Should I Watch?</div>
        <div className="columnSection gameOptions">
          <select id="teamId">
            <option value={this.DEVILS} selected={this.state.initialSelectedTeam === this.DEVILS}>New Jersey Devils</option>
            <option value={this.ISLANDERS} selected={this.state.initialSelectedTeam === this.ISLANDERS}>New York Islanders</option>
            <option value={this.RANGERS} selected={this.state.initialSelectedTeam === this.RANGERS}>New York Rangers</option>
            <option value={this.FLYERS} selected={this.state.initialSelectedTeam === this.FLYERS}>Philadelphia Flyers</option>
            <option value={this.PENGUINS} selected={this.state.initialSelectedTeam === this.PENGUINS}>Pittsburgh Penguins</option>
            <option value={this.BRUINS} selected={this.state.initialSelectedTeam === this.BRUINS}>Boston Bruins</option>
            <option value={this.SABRES} selected={this.state.initialSelectedTeam === this.SABRES}>Buffalo Sabres</option>
            <option value={this.CANADIENS} selected={this.state.initialSelectedTeam === this.CANADIENS}>Montreal Canadiens</option>
            <option value={this.SENATORS} selected={this.state.initialSelectedTeam === this.SENATORS}>Ottawa Senators</option>
            <option value={this.LEAFS} selected={this.state.initialSelectedTeam === this.LEAFS}>Toronto Maple Leafs</option>
            <option value={this.HURRICANES} selected={this.state.initialSelectedTeam === this.HURRICANES}>Carolina Hurricanes</option>
            <option value={this.PANTHERS} selected={this.state.initialSelectedTeam === this.PANTHERS}>Florida Panthers</option>
            <option value={this.LIGHTNING} selected={this.state.initialSelectedTeam === this.LIGHTNING}>Tampa Bay Lightning</option>
            <option value={this.CAPITALS} selected={this.state.initialSelectedTeam === this.CAPITALS}>Washington Capitals</option>
            <option value={this.BLACKHAWKS} selected={this.state.initialSelectedTeam === this.BLACKHAWKS}>Chicago Blackhawks</option>
            <option value={this.REDWINGS} selected={this.state.initialSelectedTeam === this.REDWINGS}>Detroit Red Wings</option>
            <option value={this.PREDATORS} selected={this.state.initialSelectedTeam === this.PREDATORS}>Nashville Predators</option>
            <option value={this.BLUES} selected={this.state.initialSelectedTeam === this.BLUES}>St. Louis Blues</option>
            <option value={this.FLAMES} selected={this.state.initialSelectedTeam === this.FLAMES}>Calgary Flames</option>
            <option value={this.AVALANCHE} selected={this.state.initialSelectedTeam === this.AVALANCHE}>Colorado Avalanche</option>
            <option value={this.OILERS} selected={this.state.initialSelectedTeam === this.OILERS}>Edmonton Oilers</option>
            <option value={this.CANUCKS} selected={this.state.initialSelectedTeam === this.CANUCKS}>Vancouver Canucks</option>
            <option value={this.DUCKS} selected={this.state.initialSelectedTeam === this.DUCKS}>Anaheim Ducks</option>
            <option value={this.STARS} selected={this.state.initialSelectedTeam === this.STARS}>Dallas Stars</option>
            <option value={this.KINGS} selected={this.state.initialSelectedTeam === this.KINGS}>Los Angeles Kings</option>
            <option value={this.SHARKS} selected={this.state.initialSelectedTeam === this.SHARKS}>San Jose Sharks</option>
            <option value={this.BLUEJACKETS} selected={this.state.initialSelectedTeam === this.BLUEJACKETS}>Columbus Blue Jackets</option>
            <option value={this.WILD} selected={this.state.initialSelectedTeam === this.WILD}>Minnesota Wild</option>
            <option value={this.JETS} selected={this.state.initialSelectedTeam === this.JETS}>Winnipeg Jets</option>
            <option value={this.COYOTES} selected={this.state.initialSelectedTeam === this.COYOTES}>Arizona Coyotes</option>
            <option value={this.KNIGHTS} selected={this.state.initialSelectedTeam === this.KNIGHTS}>Vegas Golden Knights</option>
          </select>

          <input type="date" id="date"/>

          <button onClick={this.fetchData}>Should I Watch?</button>
        </div>
        <div className="columnSection metrics">
          Losing margin: <input type="number" id="marginInp" className="numberInput" value={this.state.margin} onChange={this.onMarginChange}/>
          Random Percentage: <input type="number" id="randomPercent" className="numberInput" value={this.state.percentage} onChange={this.onPercentChange}/>
        </div>
        <div className="columnSection resultsArea">

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
      </div>
    )
  }
}

export default App


/* TODO

-cookies to restore previous inputs


*/