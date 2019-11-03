const express = require('express')
const cors = require('cors')
const path = require('path')
const fetch = require("node-fetch");

// Create the server
const app = express()

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

app.get('/api/worthWatching/:teamID/:date', cors(), async (req, res, next) => {
  let YOUR_TEAM_ID = req.params.teamID;
  console.log(YOUR_TEAM_ID)

  const date = req.params.date;
  console.log(date);

  try 
  {
    url = "https://statsapi.web.nhl.com/api/v1/schedule?teamId=" + YOUR_TEAM_ID + "&date=" + date;
    const response = await fetch(url);

    const gameDataRaw = await fetch(url);
    const gameData = await gameDataRaw.json();

    const gameIdStr = gameData["dates"][0]["games"][0]["gamePk"];
    const boxScoreUrl = "https://statsapi.web.nhl.com/api/v1/game/" + gameIdStr + "/boxscore";

    const boxScore = await fetch(boxScoreUrl);
    let gameResults = await boxScore.json();

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

    console.log("home score: " + homeScore);
    console.log("away score: " + opponentScore);

    let worthWatching = false;

    if (yourTeamScore > opponentScore)
    {
      worthWatching = true;
    }
    else if (opponentScore - yourTeamScore <= 1)
    {
      worthWatching = true;
    }

    if (worthWatching)
    {
      worthWatching = true;
    }
    else
    {
      if (Math.floor(Math.random() * Math.floor(10)) == 0)
      {
        worthWatching = true;
      }
      else
      {
        worthWatching = false;
      }
    }

    res.json({ "worthWatching": worthWatching });
  } 
  catch (err)
  {
    next(err)
  }
})

// Anything that doesn't match the above, send back the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

// Choose the port and start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})
