'use strict';

const { createApolloFetch } = require('apollo-fetch');
const React = require('react');
const ReactDOM = require('react-dom');
const ReactTable = require('react-table').default
const client = require('./client');
const fetch = createApolloFetch({
		uri: window.location.href+'graphql',
	});

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {teams: []};
		this.updateLeague = this.updateLeague.bind(this);
	}
	
	updateLeague() {
	    var selectBox = document.getElementById("selectLeague");
	    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
	    fetch({
			  // Need to extrapolate out to a reusable query function
			  query: '{leagueById(id: '+selectedValue+') { name teams { fantasyFootballId teamName totalPoints managerName teamValue totalTransfers bank gameweekPoints wildcard benchBoost freeHit tripleCaptain players { firstName lastName webName gameweekPoints form price	bonusPoints position team didNotPlay }} }}',
			}).then(res => {
				this.setState({teams: res.data.leagueById.teams});
			});
	}

	componentDidMount() {
		fetch({
			  // Need to extrapolate out to a reusable query function
			  query: '{leagueById(id: 269242) { name teams { fantasyFootballId teamName totalPoints managerName teamValue totalTransfers bank gameweekPoints wildcard benchBoost freeHit tripleCaptain players { firstName lastName webName gameweekPoints form price	bonusPoints position team didNotPlay }} }}',
			}).then(res => {
				this.setState({teams: res.data.leagueById.teams});
			});
	}

	render() {
		return (
				<div class="mainTable">
					<select id="selectLeague" onChange={() => this.updateLeague()}>
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
		  
		const data = this.props.teams.sort((a, b) => b.totalPoints - a.totalPoints);
		 
		  const mainTableColumns = [{
		    Header: 'Team Name',
		    accessor: 'teamName',
		    width:220,
		  },{
		    Header: 'Manager',
		    accessor: 'managerName',
		    width:200,
		  },{
			id: 'teamValue',
		    Header: 'Team Value',
		    accessor: team => (team.teamValue/10.toFixed(1)),
		    width:100,
		  },{
		    Header: 'Transfers',
		    accessor: 'totalTransfers',
		    width:125,
		  },{
			id: 'wildcard',
		    Header: 'Wildcard',
		    accessor: team => (team.wildcard ? "Y" : ""),
		    width:100,
		  },{
			id: 'freeHit',
		    Header: 'FH',
		    accessor: team => (team.freeHit ? "Y" : ""),
		    width:70,
		  },{
			id: 'benchBoost',
		    Header: 'BB',
		    accessor: team => (team.benchBoost ? "Y" : ""),
		    width:70,
		  },{
			id: 'tripleCaptain',
		    Header: 'TC',
		    accessor: team => (team.tripleCaptain ? "Y" : ""),
		    width:70,
		  },{
		    Header: 'Gameweek Points',
		    accessor: 'gameweekPoints',
		    width:140,
		  },{
		    Header: 'Total Points',
		    accessor: 'totalPoints',
		    width:140,
		  }];
		  
		  const subTableColumns = [{
			    id: 'firstName',
			    Header: 'Name',
			    accessor: player => (player.firstName +" "+player.lastName),
			    width:180,
			  },{
				  id: 'position',
				  Header: 'Position',
				  accessor: player => (player.position == 1 ? "GK" : (player.position == 2) ? "DEF ": (player.position == 3) ? "MID" : "FWD"),
				  width:60,
			  },{
				  id: 'price',
				  Header: 'Price',
				  accessor: player => (player.price.toFixed(1)),
				  width:50,
			  },{
				  Header: 'Change %',
				  accessor: 'change',
				  width:100,
			  },{
				  Header: 'Form',
				  accessor: 'form',
				  width:50,
			  },{
				  Header: 'Mins',
				  accessor: 'minutes',
				  width:50,
			  },{
				  Header: 'CS',
				  accessor: 'cleanSheets',
				  width:50,
			  },{
				  Header: 'GS',
				  accessor: 'goalsScored',
				  width:50,
			  },{
				  Header: 'A',
				  accessor: 'assists',
				  width:50,
			  },{
				  Header: 'BP',
				  accessor: 'bonusPoints',
				  width:50,
			  },{
				Header: 'Gameweek Points',
			    accessor: 'gameweekPoints',
			  }];
	 
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
			    </div>
			    )
			  }}>
		  </ReactTable>
		}
	
}

ReactDOM.render(
	<App />,
	document.getElementById('react')
)
