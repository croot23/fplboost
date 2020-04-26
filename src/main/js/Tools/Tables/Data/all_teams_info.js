/* Function to order players by position with a numbered property (e.g. gk1, gk2) so they can be individually referenced in a react table */
export default function allTeamsInfo(teams) {
	
	// Filters players on position, then adds a numbered position property (gk1, gk2) to a team object
	const addPlayers = (team, players) => {
		[1,2,3,4].forEach((playerPosition) => players.filter((player) => player.position == playerPosition).map((player, index) => {
			var positionText = (playerPosition == 1) ? "gk" : (playerPosition == 2) ? "def" : (playerPosition == 3) ? "mid" : "fwd";
			team[positionText+(index+1)] = player.webName
		}))
	}
	
	var allTeams = teams.map((originalTeam => {
		var team = {
				"teamName" : originalTeam.teamName,
				"totalPoints" : originalTeam.totalPoints,
		};
		addPlayers(team, originalTeam.players.concat(originalTeam.substitutes));
		return team;
	}));
	
	return allTeams.sort((a, b) => b.totalPoints - a.totalPoints);
	
}
