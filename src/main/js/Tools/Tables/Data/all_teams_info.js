function allTeamsInfo(teams) {
	
	var allTeams = [];
	var numberOfTeams = teams.length;
	
	// Function to add players in one position to a temporary array
	function addPlayersToTempPositionArray(playersArray, position, tempArray) {
		for (var j=0; j < playersArray.length; j++) {
			if (playersArray[j].position == position) {
				tempArray.push({"webName" : playersArray[j].webName})
			}
		}
	}
	
	// Function to add a temporary player array to a team object
	function addTempArraysToTeamObject(team, tempArray, position) {
		var propertyNameBeginning = (position == 1) ? "gk" : (position == 2) ? "def" : (position == 3) ? "mid" : "fwd";
		for (var j=0; j < tempArray.length; j++) {
			var propertyName = propertyNameBeginning+(j+1);
			team[propertyName] = tempArray[j].webName;
		}
	}
	
	// Loop through teams and add players to a new team object
	for (let i=0; i < numberOfTeams; i++) {
		
		var tempGoalkeepers = [];
		var tempDefenders = [];
		var tempMidfielders = [];
		var tempForwards = [];
		
		addPlayersToTempPositionArray(teams[i].players.concat(teams[i].substitutes), 1, tempGoalkeepers);
		addPlayersToTempPositionArray(teams[i].players.concat(teams[i].substitutes), 2, tempDefenders);
		addPlayersToTempPositionArray(teams[i].players.concat(teams[i].substitutes), 3, tempMidfielders);
		addPlayersToTempPositionArray(teams[i].players.concat(teams[i].substitutes), 4, tempForwards);
		
		var team = {
			"teamName" : teams[i].teamName,
			"totalPoints" : teams[i].totalPoints,
		};
		
		addTempArraysToTeamObject(team, tempGoalkeepers, 1);
		addTempArraysToTeamObject(team, tempDefenders, 2);
		addTempArraysToTeamObject(team, tempMidfielders, 3);
		addTempArraysToTeamObject(team, tempForwards, 4);
		
		allTeams.push(team);
		team = {};
	}
	
	return allTeams.sort((a, b) => b.totalPoints - a.totalPoints);;

}

export default allTeamsInfo