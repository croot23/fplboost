/* Function to filter the range of gameweek data */
export default function filterDataSet(teams, filterStart, filterEnd) {
	
	 return teams.map((team) => {
		    return {"name" : team.name, "data" : team.data.filter((xAxis) => xAxis.x >= filterStart && xAxis.x <= filterEnd)};
	 })
	 
}
