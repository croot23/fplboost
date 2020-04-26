/* GraphQL query to return historical gameweek data for graphs */
export default function mainGraphQuery(n, option) {
	return `{leagueById(id: `+n+`) {
			name
			teams { 
        		name : teamName
        		totalPoints
				data : historicGameweekData {
          			x : gameweek
          			y : `+option+`
        		}
			}
		}
	}`
}
