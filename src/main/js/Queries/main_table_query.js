function mainQuery(n) {
	return `{leagueById(id: `+n+`) {
			name 
			teams { 
				fantasyFootballId 
				teamName 
				totalPoints 
				managerName 
				teamValue 
				bank
				transfersThisGameweek
				gameweekRank
				gameweekPoints 
				wildcard 
				benchBoost 
				freeHit 
				tripleCaptain
				gameweekRank
        		overallRank
        		totalTransfers
        		expectedPoints
        		transferHits
				players { 
					firstName 
					lastName 
					webName 
					gameweekPoints 
					form 
					price 
					bonusPoints 
					position 
					team 
					didNotPlay
					totalPoints
					goalsScored
					assists
					cleanSheet
					minutesPlayed
					changePercentage
				} 
				substitutes { 
					firstName 
					lastName 
					webName 
					gameweekPoints 
					form 
					price 
					bonusPoints 
					position 
					team 
					didNotPlay
					totalPoints
					goalsScored
					assists
					cleanSheet
					minutesPlayed
					changePercentage
				} captain { 
					webName 
					gameweekPoints 
				} viceCaptain { 
					webName 
				} weeklyTransfersListIn {
					webName
					gameweekPoints
					position
				} weeklyTransfersListOut {
					webName
					gameweekPoints
					position
				}
			}
		}
	}`
}
export default mainQuery