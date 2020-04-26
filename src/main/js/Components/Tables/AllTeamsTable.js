import React from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import allTeamsTableHeaders from '../../Tools/Tables/Columns/all_teams_columns.js'
import allTeamsInfo from '../../Tools/Tables/Data/all_teams_info.js'

/* Displays the table on the All Teams page */
export default class AllTeamsTable extends React.Component {
	
	render() {
		
		// Sort the teams descending by total points before passing to the react table
		const sortedTeams = this.props.teams.sort((a, b) => b.totalPoints - a.totalPoints);
		const tableColumns = allTeamsTableHeaders;
		const data = allTeamsInfo(sortedTeams);
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