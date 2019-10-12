function additionalTeamInfo(totalTransfers, hits, gameweekRank, overallRank, expectedPoints, viceCaptain) {
	
	var rows = [];

	var totalTransfers = {"key" : "Total Transfers", "value" : totalTransfers};
	var hits = {"key" : "Transfer Hits", "value" : hits};
	var gameweekRank = {"key" : "Gameweek Rank", "value" : gameweekRank};
	var overallRank = {"key" : "Overall Rank", "value" : overallRank};
	var expectedPoints = {"key" : "Expected Points", "value" : expectedPoints};
	var viceCaptain = {"key" : "Vice Captain", "value" : viceCaptain};
	
	rows.push(totalTransfers);
	rows.push(hits);
	rows.push(gameweekRank);
	rows.push(overallRank);
	rows.push(expectedPoints);
	rows.push(viceCaptain);
	
	return rows;
}

export default additionalTeamInfo