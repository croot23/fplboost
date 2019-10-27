import React from 'react';
import mainTableHeaders from '../Tools/main_table_columns.js'
import playerTableHeaders from '../Tools/player_table_columns.js'
import transferTableHeaders from '../Tools/transfer_table_columns.js'
import additionalTeamInfoTableHeaders from '../Tools/additional_team_info_columns.js'
import mainQuery from '../Queries/main_table_query.js'
import combineTransferLists from '../Tools/combine_transfers_lists.js'
import additionalTeamInfo from '../Tools/additional_team_info.js'
import '../../resources/static/css/main.css'
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
		this.state = {teams: [], expanded: {}};
		this.reload = this.reload.bind(this);
		this.persistOpenedRows = this.persistOpenedRows.bind(this);
	}
	
	// Populate the table on initial page load and start the automatic refresh timer
	componentDidMount() {
		this.reload();
		setInterval(this.reload.bind(this),100000);
	}
	
	// Function to update the table when the league changes and automatically reload the table with league information at set intervals
	async reload(leagueChanged) {
		var selectBox = document.getElementById("selectLeague");
		var selectedValue = selectBox.options[selectBox.selectedIndex].value;
		fetch({
			// The query is built ina function imported from ./Tools/*.js files
			query: mainQuery(selectedValue),
			}).then(res => {
				if (leagueChanged) {
					this.setState({teams: res.data.leagueById.teams, expanded: {}});
				} else {
					this.setState({teams: res.data.leagueById.teams});
				}
			});
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
      return (
    		  <div class="mainContainer mainTable">
				<select id="selectLeague" onChange={() => this.reload(true)}>
					<option value="269242">IBB League</option>
					<option value="257171">RPRemier League</option>
				</select>
				<MyReactTable teams={this.state.teams} expanded={this.state.expanded} persistOpenedRows={this.persistOpenedRows}></MyReactTable>
			</div>
    		  )
    }
}

class MyReactTable extends React.Component {
	
	render() {
		
		// Sort the teams descending by total points before passing to the react table
		const data = this.props.teams.sort((a, b) => b.totalPoints - a.totalPoints);
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
			    <div class='transfer-table'>
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
			    <div class='transfer-table additional-transfer-table'>
			    <ReactTable
			    	data={additionalTeamInfo(row.original.totalTransfers, row.original.transferHits, row.original.gameweekRank, row.original.overallRank, row.original.expectedPoints, row.original.viceCaptain.webName)}
			    	columns={additionalTeamInfoTableHeaders}
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