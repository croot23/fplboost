function mainQuery(n) {
	return `{leagueById(id: `+n+`) {
			name 
			teams { 
				fantasyFootballId 
				teamName 
				totalPoints 
				managerName 
				teamValue 
				totalTransfers 
				bank 
				gameweekPoints 
				wildcard 
				benchBoost 
				freeHit 
				tripleCaptain 
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
				} captain { 
					webName 
					gameweekPoints 
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