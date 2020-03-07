function allTeamsQuery(n) {
	return `{leagueById(id: `+n+`) { 
			teams { 
        		teamName
        		totalPoints
				players {
					webName
					position
					price
        		}
        		substitutes {
					webName
					position
					price
        		}
			}
		}
	}`
}
export default allTeamsQuery