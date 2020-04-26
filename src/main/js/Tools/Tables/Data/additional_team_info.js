/* Function to create a key value object array of additional team info */
export default function additionalTeamInfo(totalTransfers, hits, gameweekRank, overallRank, expectedPoints, captain, viceCaptain, benchPoints) {
	
	var rows = [];

	var totalTransfers = {"key" : "Total Transfers", "value" : totalTransfers};
	var hits = {"key" : "Transfer Hits", "value" : hits};
	var gameweekRank = {"key" : "Gameweek Rank", "value" : gameweekRank};
	var overallRank = {"key" : "Overall Rank", "value" : overallRank};
	var expectedPoints = {"key" : "Expected Points", "value" : expectedPoints};
	var captain = {"key" : "Captain", "value" : captain};
	var viceCaptain = {"key" : "Vice Captain", "value" : viceCaptain};
	var benchPoints = {"key" : "Points On Bench", "value" : benchPoints}
	
	rows.push(expectedPoints);
	rows.push(captain);
	rows.push(viceCaptain);
	rows.push(totalTransfers);
	rows.push(hits);
	rows.push(benchPoints);
	rows.push(gameweekRank);
	rows.push(overallRank);
	
	return rows;
}
