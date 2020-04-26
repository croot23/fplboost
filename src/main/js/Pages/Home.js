import React from 'react';
// CSS
import '../../resources/static/css/main.css'
import '../../resources/static/css/Tables/generic_table.css'
import '../../resources/static/css/Tables/homepage_table.css'
// Components
import Spinner from '../Components/LoadingSpinner.js'
import MainPageTable from '../Components/Tables/MainPageTable.js'
import DropdownOptions from '../Components/DropdownOptions.js'
// Functions
import setInitialLeague from '../Tools/Misc/set_initial_league.js'
import leagueQuery from '../Queries/league_query.js'
import getCookie from '../Cookies/get_cookies.js'
import setCookie from '../Cookies/set_cookies.js'
const { createApolloFetch } = require('apollo-fetch');
const fetch = createApolloFetch({
	uri: window.location.href.replace("#/","")+'graphql',
});

export default class Home extends React.Component {
	
	// Create initial state
	constructor(props) {
		super(props);
		this.state = {
				isLoading: "spinner",
				teams: [], 
				expanded: {},
				// leagues should be retrieved from the database ideally (//todo)
				leagues: [{"name": "IBB League", "id" : "269242"},{"name": "RPRemier League", "id" : "257171"},{"name": "Lambert & Co", "id" : "604843"},{"name": "Essex Cup", "id" : "415897"}],
				gameweek: 1
				};
		this.reload = this.reload.bind(this);
		this.persistOpenedRows = this.persistOpenedRows.bind(this);
	}
	
	// Populate the table on initial page load and start the automatic refresh timer
	componentDidMount() {
		setInitialLeague();
		this.reload(true);
		setInterval(this.reload.bind(this),100000);
	}
	
	// Function to update the table when the league changes and automatically reload the table with league information at set intervals
	async reload(leagueChanged) {
		var selectBox = document.getElementById("selectLeague");
		var selectedValue = selectBox.options[selectBox.selectedIndex].value;
		this.setState({teams: []});
		this.setState({isLoading: "spinner"});
		console.log(this.state.isLoading);
		fetch({
			query: "{ gameweek }",
			}).then(res => {
				this.setState({gameweek: res.data.gameweek});
			});
		await fetch({
			// The query is built ina function imported from ./Tools/*.js files
			query: leagueQuery(selectedValue),
			}).then(res => {
				if (leagueChanged) {
					this.setState({teams: res.data.leagueById.teams, expanded: {}});
					setCookie('last_viewed_league', selectedValue, '7');
				} else {
					this.setState({teams: res.data.leagueById.teams});
				}
			});
		this.setState({isLoading: "spinner-hide"});
	}
	
	// Function to persist the expanded rows (on automatic reload only, not when changing leagues)
	persistOpenedRows(expanded, index, event) {
		let newExpanded = this.state.expanded;
		if (newExpanded[index] == 'true') {
			delete newExpanded[index];
		} else {
			newExpanded[index] = 'true';
		}
        this.setState({expanded: newExpanded });
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
				<MainPageTable teams={this.state.teams} expanded={this.state.expanded} persistOpenedRows={this.persistOpenedRows} gameweek={this.state.gameweek}></MainPageTable>
				<Spinner isLoading={this.state.isLoading}/>
			</div>
    	)
    }
}

