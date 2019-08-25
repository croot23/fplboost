'use strict';

const { createApolloFetch } = require('apollo-fetch');
const React = require('react');
const ReactDOM = require('react-dom');
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
			  query: '{leagueById(id: '+selectedValue+') { name teams { fantasyFootballId teamName totalPoints managerName teamValue totalTransfers bank gameweekPoints wildcard benchBoost freeHit tripleCaptain} }}',
			}).then(res => {
				this.setState({teams: res.data.leagueById.teams});
			});
	}

	componentDidMount() {
		fetch({
			  // Need to extrapolate out to a reusable query function
			  query: '{leagueById(id: 269242) { name teams { fantasyFootballId teamName totalPoints managerName teamValue totalTransfers bank gameweekPoints wildcard benchBoost freeHit tripleCaptain} }}',
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
					<LeagueList teams={this.state.teams}/>
				</div>
		)
	}
}



class LeagueList extends React.Component{
	
	render() {
		const teams = this.props.teams.sort((a, b) => b.totalPoints - a.totalPoints).map(team =>
			<Team key={team.fantasyFootballId} team={team}/>
		);
		return (
			<div>
			<br></br>
			<table id="table_id" class="display">
				<tbody>
					<tr>
						<th>Team Name</th>
						<th>Manager</th>
						<th>Team Value</th>
						<th>Transfers</th>
						<th>Wildcard</th>
						<th>FH</th>
						<th>BB</th>
						<th>TC</th>
						<th>Gameweek Points</th>
						<th>Total Points</th>
					</tr>
					{teams}
				</tbody>
			</table>
			</div>
		)
	}
}

class Team extends React.Component{
	render() {
		return (
			<tr>
			 <td>{this.props.team.teamName}</td>
			 <td>{this.props.team.managerName}</td>
			 <td>{this.props.team.teamValue/10}</td>
			 <td>{this.props.team.totalTransfers}</td>
			 <td>{(this.props.team.wildcard == true) ? "Y" :"" }</td>
			 <td>{(this.props.team.freeHit == true) ? "Y" :"" }</td>
			 <td>{(this.props.team.benchBoost == true) ? "Y" :"" }</td>
			 <td>{(this.props.team.tripleCaptain == true) ? "Y" :"" }</td>
			 <td>{this.props.team.gameweekPoints}</td>
			 <td>{this.props.team.totalPoints}</td>
			</tr>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('react')
)
