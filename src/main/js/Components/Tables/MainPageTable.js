import React from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import mainTableHeaders from '../../Tools/Tables/Columns/main_table_columns.js'
import playerTableHeaders from '../../Tools/Tables/Columns/player_table_columns.js'
import transferTableHeaders from '../../Tools/Tables/Columns/transfer_table_columns.js'
import additionalTeamInfoTableHeaders from '../../Tools/Tables/Columns/additional_team_info_columns.js'
import combineTransferLists from '../../Tools/Tables/Data/combine_transfers_lists.js'
import calculateBenchPoints from '../../Tools/Tables/Data/calculate_bench_points.js'
import additionalTeamInfo from '../../Tools/Tables/Data/additional_team_info.js'

/* Displays the table on the homepage */
export default class MainPageTable extends React.Component {
	
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
			    <div className='sub-table-container'>
			    <div className='sub-table'>
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
			    <div className='right-side-table additional-transfer-table'>
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
			    <div className='right-side-table transfer-table'>
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