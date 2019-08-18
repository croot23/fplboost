'use strict';

const { createApolloFetch } = require('apollo-fetch');
const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');
const fetch = createApolloFetch({
	  	// Will need to get app context here
		uri: 'http://localhost:8080/graphql',
	});

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {league: []};
	}

	componentDidMount() {
		fetch({
			  query: '{leagueById(id: 269242) { name teams { teamName totalPoints } }}',
			}).then(res => {
				this.setState({teams: res.data.leagueById.teams});
			});
	}

	render() {
		return (
			<LeagueList teams={this.state.teams}/>
		)
	}
}

class LeagueList extends React.Component{
	render() {
		console.log(this.props.teams);
		return (
			<table>
				<tbody>
					<tr>
						<th>Team</th>
						<th>Points</th>
					</tr>

				</tbody>
			</table>
		)
	}
}

class Team extends React.Component{
	render() {
		return (
			<tr>
			 <td>{this.props.team.teamName}</td>
			 <td>{this.props.team.totalPoints}</td>
			</tr>
		)
	}
}


ReactDOM.render(
	<App />,
	document.getElementById('react')
)
