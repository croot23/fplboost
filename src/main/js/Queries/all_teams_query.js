/* GraphQL query to return the relevant info for the All Teams table */
export default function allTeamsQuery(n) {
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
