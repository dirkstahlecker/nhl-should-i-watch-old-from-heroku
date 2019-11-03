import sys
import requests
import random
import urllib.request, json

###################################
# need to run "pipenv shell" to run successfully
# python shouldIWatch.py 2019-10-17

BRUINS_TEAM_ID = 6

def parse(gameData):
	gameId = gameData["dates"][0]["games"][0]["gamePk"]
	boxScoreUrl = "https://statsapi.web.nhl.com/api/v1/game/" + str(gameId) + "/boxscore"
	gameResults = requests.get(boxScoreUrl).json()
	
	homeTeam = gameResults["teams"]["home"]
	awayTeam = gameResults["teams"]["away"]

	homeScore = homeTeam["teamStats"]["teamSkaterStats"]["goals"]
	awayScore = awayTeam["teamStats"]["teamSkaterStats"]["goals"]

	if (homeTeam["team"]["id"] == BRUINS_TEAM_ID):
		bruinsScore = homeScore
		opponentScore = awayScore
	elif (awayTeam["team"]["id"] == BRUINS_TEAM_ID):
		bruinsScore = awayScore
		opponentScore = homeScore
	else:
		print("ERROR")
		return

	worthWatching = False
	if bruinsScore > opponentScore:
		worthWatching = True
	elif opponentScore - bruinsScore <= 1:
		worthWatching = True

	if worthWatching:
		print("YES")
	else:
		if (random.randint(0, 9) == 0):
			print("YES")
		else:
			print("NO")


#{1} date
def main():
	date = sys.argv[1]
	if (date == "-h"):
		print('First run "pipenv shell"\nThen "python shouldIWatch.py YYYY-MM-DD');
		return;
	url = "https://statsapi.web.nhl.com/api/v1/schedule?teamId=" + str(BRUINS_TEAM_ID) + "&date=" + date;
	r = requests.get(url)
	gameData = r.json()
	parse(gameData);

if __name__ == "__main__":
    main()
