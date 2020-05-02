import React from 'react';
// CSS
import '../../resources/static/css/main.css'
import '../../resources/static/css/Tables/all_teams_players.css'
// Components
import Spinner from '../Components/LoadingSpinner.js'
import AllTeamsTable from '../Components/Tables/AllTeamsTable.js'
import DropdownOptions from '../Components/DropdownOptions.js'
import TableCellHighlighter from '../Components/TableCellHighlighter.js'
// Functions
import setInitialLeague from '../Tools/Misc/set_initial_league.js'
import allTeamsQuery from '../Queries/all_teams_query.js'
import highlightPlayer from '../Tools/Misc/highlight_player.js'
import getCookie from '../Cookies/get_cookies.js'
import setCookie from '../Cookies/set_cookies.js'
const { createApolloFetch } = require('apollo-fetch');
const fetch = createApolloFetch({
	uri: window.location.href.replace("#/all_teams","")+'graphql',
});

export default class Home extends React.Component {
	
	// Create initial state
	constructor(props) {
		super(props);
		this.state = {
				isLoading: "spinner",
				teams: [], 
				// leagues should be retrieved from the database ideally (//todo)
				leagues: [{"name": "IBB League", "id" : "269242"},{"name": "RPRemier League", "id" : "257171"},{"name": "Lambert & Co", "id" : "604843"},{"name": "Essex Cup", "id" : "415897"}],
		};
		this.reload = this.reload.bind(this);
	}
	
	// Populate the table on initial page load and start the automatic refresh
	// timer
	componentDidMount() {
		setInitialLeague(this.state.leagues);
		this.reload(true);
	}
	
	// Function to update the table when the league changes and automatically
	// reload the table with league information at set intervals
	async reload(leagueChanged) {
		var selectBox = document.getElementById("selectLeague");
		var selectedValue = selectBox.options[selectBox.selectedIndex].value;
		this.setState({teams: []});
		this.setState({isLoading: "spinner"});
		await fetch({
			// The query is built ina function imported from ./Tools/*.js files
			query: allTeamsQuery(selectedValue),
			}).then(res => {
				if (leagueChanged) {
					this.setState({teams: res.data.leagueById.teams});
					setCookie('last_viewed_league', selectedValue, '7');
				} else {
					this.setState({teams: res.data.leagueById.teams});
				}
			});
		this.setState({isLoading: "spinner-hide"});
		highlightPlayer(".allTeamsPlayersTable .rt-tbody");
	}
	
    render() { 
    	const leagues = this.state.leagues.map(options =>
    		<DropdownOptions options={options}></DropdownOptions>
    	);
    	return (
    		  <div className="mainContainer mainTable">
				<select className="dropdown" id="selectLeague" onChange={() => this.reload(true)}>
					{leagues}
				</select>
				<TableCellHighlighter tableClassName={".allTeamsPlayersTable .rt-tbody"}/>
				<AllTeamsTable teams={this.state.teams}></AllTeamsTable>
				<Spinner isLoading={this.state.isLoading}/>
			</div>
    	)
    }
}

