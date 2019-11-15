import React from 'react';
import mainTableHeaders from '../Tools/main_table_columns.js'
import playerTableHeaders from '../Tools/player_table_columns.js'
import transferTableHeaders from '../Tools/transfer_table_columns.js'
import additionalTeamInfoTableHeaders from '../Tools/additional_team_info_columns.js'
import mainQuery from '../Queries/main_table_query.js'
import combineTransferLists from '../Tools/combine_transfers_lists.js'
import calculateBenchPoints from '../Tools/calculate_bench_points.js'
import additionalTeamInfo from '../Tools/additional_team_info.js'
import '../../resources/static/css/main.css'
import getCookie from '../Cookies/get_cookies.js'
import setCookie from '../Cookies/set_cookies.js'
const ReactTable = require('react-table').default
const ReactDOM = require('react-dom');
const { createApolloFetch } = require('apollo-fetch');
const client = require('../client');
const fetch = createApolloFetch({
	uri: window.location.href.replace("#/","")+'graphql',
});

export default class Home extends React.Component {
	
	// Create initial state
	constructor(props) {
		super(props);
		this.state = {
				teams: [], 
				expanded: {},
				// leagues should be retrieved from the database ideally (//todo)
				leagues: [{"name": "IBB League", "id" : "269242"},{"name": "RPRemier League", "id" : "257171"},{"name": "Lambert & Co", "id" : "604843"},{"name": "Essex Cup", "id" : "415897"}],
				gameweek: 1
				};
		this.reload = this.reload.bind(this);
		this.persistOpenedRows = this.persistOpenedRows.bind(this);
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
		setInterval(this.reload.bind(this),100000);
	}
	
	// Function to update the table when the league changes and automatically
	// reload the table with league information at set intervals
	async reload(leagueChanged) {
		var selectBox = document.getElementById("selectLeague");
		var selectedValue = selectBox.options[selectBox.selectedIndex].value;
		fetch({
			// The query is built ina function imported from ./Tools/*.js files
			query: mainQuery(selectedValue),
			}).then(res => {
				if (leagueChanged) {
					this.setState({teams: res.data.leagueById.teams, expanded: {}});
					setCookie('last_viewed_league', selectedValue, '7');
				} else {
					this.setState({teams: res.data.leagueById.teams});
				}
			});
		fetch({
			query: "{ gameweek }",
			}).then(res => {
				this.setState({gameweek: res.data.gameweek});
			});
	}
	
	// Function to persist the expanded rows (on automatic reload only, not when
	// changing leagues)
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
    	const leagues = this.state.leagues.map(league =>
    		<LeagueOption league={league}></LeagueOption>
    	);
    	return (
    		  <div class="mainContainer mainTable">
				<select id="selectLeague" onChange={() => this.reload(true)}>
					{leagues}
				</select>
				<MainPageTable teams={this.state.teams} expanded={this.state.expanded} persistOpenedRows={this.persistOpenedRows} gameweek={this.state.gameweek}></MainPageTable>
			</div>
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
		
		// Add gameweek to teams
		const teamsWithGameweek = this.props.teams.map(originalTeamData => ({...originalTeamData, gameweek: this.props.gameweek}));
		// Sort the teams descending by total points before passing to the react table
		const data = teamsWithGameweek.sort((a, b) => b.totalPoints - a.totalPoints);
		let expandedRows = this.props.expanded;
		// All the table column information is imported from ./Tools/*.js files
		const mainTableColumns = mainTableHeaders;
		const subTableColumns = playerTableHeaders;
		const transferTableColumns = transferTableHeaders;
		
		  // Render the react tables
		return <ReactTable
		    data={data}
		    columns={mainTableColumns}
		    className='-striped -highlight teamTable'
		    minRows={0}
		    showPagination={false}
		    showPaginationTop={false}
		    showPaginationBottom={true}
		    showPageSizeOptions={true}
			expanded={expandedRows}
			onExpandedChange={(newExpanded, index, event) => this.props.persistOpenedRows(newExpanded, index, event)}
		  	SubComponent={row => {
			    return (
			    <div class='sub-table-container'>
			    <div class='sub-table'>
			    <ReactTable
				      data={row.original.players.sort((a, b) => a.position - b.position)}
				      columns={subTableColumns}
				      minRows={0}
				      showPagination={false}
					  showPaginationTop={false}
					  showPaginationBottom={true}
					  showPageSizeOptions={true}>
			    </ReactTable>
			    <br></br>
			    <ReactTable
			    	className='substitutes'
			    	data={row.original.substitutes.sort((a, b) => a.position - b.position)}
			    	columns={subTableColumns}
			    	minRows={0}
			    	showPagination={false}
					showPaginationTop={false}
					showPaginationBottom={true}
					showPageSizeOptions={true}>
			    </ReactTable>
			    <br></br>
			    </div>
			    <div class='right-side-table additional-transfer-table'>
			    <ReactTable
			    	data={additionalTeamInfo(row.original.totalTransfers, row.original.transferHits, row.original.gameweekRank, row.original.overallRank, row.original.expectedPoints, row.original.captain.webName, row.original.viceCaptain.webName, calculateBenchPoints(row.original.substitutes))}
			    	columns={additionalTeamInfoTableHeaders}
			    	minRows={0}
			    	showPagination={false}
					showPaginationTop={false}
					showPaginationBottom={true}
					showPageSizeOptions={true}>
			    </ReactTable>
			    </div>
			    <div class='right-side-table transfer-table'>
			    <ReactTable
			    	data={combineTransferLists(row.original.weeklyTransfersListIn,row.original.weeklyTransfersListOut)}
			    	columns={transferTableColumns}
			    	minRows={0}
			    	showPagination={false}
					showPaginationTop={false}
					showPaginationBottom={true}
					showPageSizeOptions={true}>
			    </ReactTable>
			    </div>
			</div>
			)}}>
		</ReactTable>
	}
}