'use strict';

require("babel-core/register");
require("babel-polyfill");
import mainTableHeaders from './Tools/main_table_columns.js'
import playerTableHeaders from './Tools/player_table_columns.js'
import transferTableHeaders from './Tools/transfer_table_columns.js'
import mainQuery from './Queries/main_table_query.js'
import combineTransferLists from './Tools/combine_transfers_lists.js'
const { createApolloFetch } = require('apollo-fetch');
const React = require('react');
const ReactDOM = require('react-dom');
const ReactTable = require('react-table').default
const client = require('./client');
const fetch = createApolloFetch({
	uri: window.location.href+'graphql',
});

class App extends React.Component {
	
	// Create initial state
	constructor(props) {
		super(props);
		this.state = {teams: []};
		this.reload = this.reload.bind(this);
	}
	
	// Populate the table on initial page load and start the automatic refresh timer
	componentDidMount() {
		this.reload();
		setInterval(this.reload.bind(this),100000);
	}
	
	// Function to update the table when the league changes and automatically reload the table with league information at set intervals
	async reload() {
		//Get current league ID from the dropdown
		var selectBox = document.getElementById("selectLeague");
		var selectedValue = selectBox.options[selectBox.selectedIndex].value;
		fetch({
			// The query is built ina function imported from ./Tools/*.js files
			query: mainQuery(selectedValue),
			}).then(res => {
				this.setState({teams: res.data.leagueById.teams});
			});
	}
	
	// Main page render method
	render() {
		return (
			<div class="mainTable">
				<select id="selectLeague" onChange={() => this.reload()}>
					<option value="269242">IBB League</option>
					<option value="257171">RPRemier League</option>
				</select>
				<MyReactTable teams={this.state.teams}></MyReactTable>
			</div>
		)
	}
}

class MyReactTable extends React.Component {
	
	render() {
		
		// Sort the teams descending by total points before passing to the react table
		const data = this.props.teams.sort((a, b) => b.totalPoints - a.totalPoints);
		
		// All the table column information is imported from ./Tools/*.js files
		const mainTableColumns = mainTableHeaders;
		const subTableColumns = playerTableHeaders;
		const transferTableColumns = transferTableHeaders;
		  
		  // Render the react tables	
		return <ReactTable
		    data={data}
		    columns={mainTableColumns}
		    className='-striped -highlight'
		    minRows={0}
		    showPagination={false}
		    showPaginationTop={false}
		    showPaginationBottom={true}
		    showPageSizeOptions={true}
		  	SubComponent={row => {
			    return (
			    <div class='sub-table' style={{ padding: "20px" }}>
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
			)}}>
		</ReactTable>
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('react')
)
