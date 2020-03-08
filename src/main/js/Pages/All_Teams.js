import React from 'react';
import allTeamsTableHeaders from '../Tools/Tables/Columns/all_teams_columns.js'
import allTeamsQuery from '../Queries/all_teams_query.js'
import allTeamsInfo from '../Tools/Tables/Data/all_teams_info.js'
import '../../resources/static/css/main.css'
import '../../resources/static/css/Tables/all_teams_players.css'
import getCookie from '../Cookies/get_cookies.js'
import setCookie from '../Cookies/set_cookies.js'
const { createApolloFetch } = require('apollo-fetch');
const client = require('../client');
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
const fetch = createApolloFetch({
	uri: window.location.href.replace("#/","")+'graphql',
});

export default class Home extends React.Component {
	
	// Create initial state
	constructor(props) {
		super(props);
		this.state = {
				teams: [], 
				// leagues should be retrieved from the database ideally (//todo)
				leagues: [{"name": "IBB League", "id" : "269242"},{"name": "RPRemier League", "id" : "257171"},{"name": "Lambert & Co", "id" : "604843"},{"name": "Essex Cup", "id" : "415897"}],
				};
		this.reload = this.reload.bind(this);
	}
	
	// Populate the table on initial page load and start the automatic refresh
	// timer
	componentDidMount() {
		var last_viewed_league = getCookie('last_viewed_league');
		var selectBox = document.getElementById("selectLeague");
		if (last_viewed_league != "") {
			selectBox.value = last_viewed_league;
			this.reload(true);
		} else {
			selectBox.value = this.state.leagues[0].id;
			this.reload(true);
		}
	}
	
	// Function to update the table when the league changes and automatically
	// reload the table with league information at set intervals
	async reload(leagueChanged) {
		var selectBox = document.getElementById("selectLeague");
		var selectedValue = selectBox.options[selectBox.selectedIndex].value;
		await fetch({
			// The query is built ina function imported from ./Tools/*.js files
			query: allTeamsQuery(selectedValue),
			}).then(res => {
				if (leagueChanged) {
					this.setState({teams: res.data.leagueById.teams, expanded: {}});
					setCookie('last_viewed_league', selectedValue, '7');
				} else {
					this.setState({teams: res.data.leagueById.teams});
				}
			});
		this.highlightPlayer();
	}
	
	// Function to highlight players based on search
	highlightPlayer() {
		console.log("here");
		const markInstance = new Mark(document.querySelector(".allTeamsPlayersTable .rt-tbody"));
		// Read the keyword
		var keyword = document.getElementById("filter").value;
		markInstance.unmark({
		  	done: function(){
		    	markInstance.mark(keyword);
		    }
		 });
		console.log(document.getElementById("filter").value);
	}
	
    render() { 
    	const leagues = this.state.leagues.map(league =>
    		<LeagueOption league={league}></LeagueOption>
    	);
    	return (
    		  <div class="mainContainer mainTable">
				<select id="selectLeague" onChange={() => this.reload(true)}>
					{leagues}
				</select>
				<PlayerFilter highlightPlayer={this.highlightPlayer}/>
				<MainPageTable teams={this.state.teams}></MainPageTable>
			</div>
    	)
    }
}

class PlayerFilter extends React.Component {
	render() {
		return (
				<input type="text" id="filter" placeholder=" Type a players name..." onKeyUp={() => this.props.highlightPlayer()}></input>
		)
	}
}

class LeagueOption extends React.Component {
	render() {
		return (
				<option value={this.props.league.id}>{this.props.league.name}</option>
		)
	}
}

class MainPageTable extends React.Component {
	
	render() {
		
		// Sort the teams descending by total points before passing to the react table
		const sortedTeams = this.props.teams.sort((a, b) => b.totalPoints - a.totalPoints);
		const tableColumns = allTeamsTableHeaders;
		const data = allTeamsInfo(sortedTeams);
		console.log(data);
		// Render the react tables
		return <ReactTable
		    data={data}
		    columns={tableColumns}
		    className='-striped -highlight allTeamsPlayersTable'
		    minRows={0}
		    showPagination={false}
		    showPaginationTop={false}
		    showPaginationBottom={true}
		    showPageSizeOptions={true}
		 	>
		</ReactTable>
	}
}