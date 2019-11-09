const express = require('express')
const cors = require('cors')
const path = require('path')
const fetch = require("node-fetch");

// Create the server
const app = express()

var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))

// Serve our api route /cow that returns a custom talking text cow
// app.get('/api/cow/:say', cors(), async (req, res, next) => {
//   try {
//     const text = req.params.say
//     const moo = cowsay.say({ text })
//     res.json({ moo })
//   } catch (err) {
//     next(err)
//   }
// })


/*
  Body: {differential: number, }
*/
app.post('/api/worthWatching/:teamID/:date/:metric', cors(), async (req, res, next) => {
  let YOUR_TEAM_ID = req.params.teamID;
  const date = req.params.date;
  let error = null;
  const metric = req.params.metric;

  const body = req.body;

  const differential = req.body.differential;
  const randomPercent = req.body.randomPercent;

  //win, lose by 1, 10% random
  function worthIt1(yourTeamScore, opponentScore)
  {
    let worthWatching = false;

    if (yourTeamScore > opponentScore)
    {
      worthWatching = true;
    }
    else if (opponentScore - yourTeamScore < differential)
    {
      worthWatching = true;
    }

    if (worthWatching)
    {
      worthWatching = true;
    }
    else
    {
      if (Math.floor(Math.random() * 100) <= randomPercent)
      {
        worthWatching = true;
      }
      else
      {
        worthWatching = false;
      }
    }
    return worthWatching;
  }

  function worthIt2(yourTeamScore, opponentScore)
  {
    return false;
  }

  try 
  {
    url = "https://statsapi.web.nhl.com/api/v1/schedule?teamId=" + YOUR_TEAM_ID + "&date=" + date;
    const response = await fetch(url);

    const gameDataRaw = await fetch(url);
    const gameData = await gameDataRaw.json();

    let gameIdStr;
    try
    {
      gameIdStr = gameData["dates"][0]["games"][0]["gamePk"];
    }
    catch (err)
    {
      return res.json({ "error" : "Cannot locate game - make sure your team played on this date."});
    }

    const boxScoreUrl = "https://statsapi.web.nhl.com/api/v1/game/" + gameIdStr + "/boxscore";

    const boxScore = await fetch(boxScoreUrl);
    let gameResults = await boxScore.json();

    if (gameResults == null || gameResults == {})
    {
      return res.json({ "error" : "Cannot retrieve game results."});
    }

    const homeTeam = gameResults["teams"]["home"]
    const awayTeam = gameResults["teams"]["away"]

    const homeScore = homeTeam["teamStats"]["teamSkaterStats"]["goals"]
    const awayScore = awayTeam["teamStats"]["teamSkaterStats"]["goals"]

    let yourTeamScore;
    let opponentScore;
    if (homeTeam["team"]["id"] == YOUR_TEAM_ID)
    {
      yourTeamScore = homeScore
      opponentScore = awayScore
    }
    else if (awayTeam["team"]["id"] == YOUR_TEAM_ID)
    {
      yourTeamScore = awayScore
      opponentScore = homeScore
    }
    else
    {
      return res.json({ "error" : "Cannot locate team"})
    }

    console.log("your team score: " + yourTeamScore);
    console.log("opponent team score: " + opponentScore);

    let worthWatching;
    switch (metric)
    {
      case "1":
        worthWatching = worthIt1(yourTeamScore, opponentScore);
        break;
    }

    res.json({"worthWatching": worthWatching, "error": error});
  } 
  catch (err)
  {
    console.error(err);
    res.json({"error": "Failed to fetch data"});
  }
})

/*
  body: {}
*/
app.post('/api/setMetric', function(request, response)
{
  response.send(request.body);    // echo the result back
});

// Anything that doesn't match the above, send back the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

// Choose the port and start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})


