/* Function to combine gameweek totals from historical gameweek data */
export default function combineGameweekTotals(teams, chartType) {
	if(chartType.includes("(Total)")) {
		return teams.map((team) => {
		    let total = 0;
		    return {"name" : team.name, "totalpoints" : team.totalpoints, "data" : team.data.map((data => { total += data.y; return {"x" : data.x, "y" : total}}))};
		});
	} else {
		return teams;
	}
}
