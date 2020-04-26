import React from 'react';
import Chart from "react-apexcharts";
// CSS
import '../../resources/static/css/graphs.css'
// Components
import Spinner from '../Components/LoadingSpinner.js'
import DropdownOptions from '../Components/DropdownOptions.js'
import GameweekFilter from '../Components/Filter.js'
// Functions
import setInitialLeague from '../Tools/Misc/set_initial_league.js'
import mainGraphQuery from '../Queries/graph_query.js'
import filterDataSet from '../Tools/Charts/filter_data.js'
import combineGameweekTotals from '../Tools/Charts/combine_gameweek_totals.js'
import getCookie from '../Cookies/get_cookies.js'
import setCookie from '../Cookies/set_cookies.js'
const { createApolloFetch } = require('apollo-fetch');
const fetch = createApolloFetch({
	uri: window.location.href.replace("#/graphs/","")+'graphql',
});

export default class Graphs extends React.Component {
	
	constructor(props) {
	    super(props);

	    this.state = {
	    	isLoading: "spinner",
	    	leagues: [{"name": "IBB League", "id" : "269242"},
	    		{"name": "RPRemier League", "id" : "257171"},
	    		{"name": "Lambert & Co", "id" : "604843"},
	    		{"name": "Essex Cup", "id" : "415897"}
	    		],
	    	chartOptions: [{"name": "Total Points", "id" : "totalPoints"},
	    		{"name": "Overall Rank", "id" : "overallRank"},
	    		{"name": "Points Hits Taken", "id" : "hitsTaken"},
	    		{"name": "Points Hits Taken (Total)", "id" : "hitsTaken"},
	    		{"name": "Transfers", "id" : "transfersMade"},
	    		{"name": "Transfers (Total)", "id" : "transfersMade"},
	    		{"name": "Team Value", "id" : "teamValue"}],
	    	gameweek: 2,
	    	filterStart: 1,
	    	filterEnd: 5,
	    	options: {
	    		chart: {
	    			id: "basic-bar"
	    		},
	    	stroke: {
	    	    width: 1,
	    	}
	    },
	    series: [{ name: "", data: [] }],
	    chartWidth: "1200px",
	    };
	    this.reload = this.reload.bind(this);
	    this.updateRange = this.updateRange.bind(this);
	  }
	
	componentDidMount() {
		setInitialLeague();
		if (window.innerWidth <  1350) {
	    	this.setState({chartWidth: "800px"});
	    }
		this.reload(true);
	}
	
	// Function to update the table when the league changes and automatically
	// reload the table with league information at set intervals
	async reload() {
		var selectedLeague = document.getElementById("selectLeague").options[document.getElementById("selectLeague").options.selectedIndex].value;
		var selectedChartOption = document.getElementById("selectChartOption").options[document.getElementById("selectChartOption").options.selectedIndex].value;
		var selectedChartOptionText = document.getElementById("selectChartOption").options[document.getElementById("selectChartOption").options.selectedIndex].innerHTML;
		//this.setState({series: [{ name: "", data: [] }]});
		this.setState({isLoading: "spinner spinner-graph"});
		fetch({
			query: "{ gameweek }",
			}).then(res => {
				this.setState({gameweek: res.data.gameweek-5});
			});
		await fetch({
			// The query is built ina function imported from ./Tools/*.js files
			query: mainGraphQuery(selectedLeague, selectedChartOption),
		}).then(res => {
				this.setState({series: filterDataSet(combineGameweekTotals(res.data.leagueById.teams, selectedChartOptionText), this.state.filterStart, this.state.filterEnd)});
				setCookie('last_viewed_league', selectedLeague, '7');
		});
		this.setState({isLoading: "spinner-hide"});
	}
	
	updateRange() {
		this.setState({filterStart: Math.abs(document.getElementsByClassName("noUi-handle")[1].getAttribute("aria-valuemin"))});
		this.setState({filterEnd: Math.abs(document.getElementsByClassName("noUi-handle")[1].getAttribute("aria-valuenow"))});
		this.reload();
	}

    render() {
    	const leagues = this.state.leagues.map(options =>
			<DropdownOptions options={options}></DropdownOptions>
    	);
    	const chartOptions = this.state.chartOptions.map(options =>
			<DropdownOptions options={options}></DropdownOptions>
    	);
    	return (
    		<div>
    			<div className="mainContainer">
    				<select className="dropdown" id="selectLeague" onChange={() => this.reload()}>
    					{leagues}
    				</select>
    				<select className="dropdown" id="selectChartOption" onChange={() => this.reload()}>
    					{chartOptions}
    				</select>
    				<GameweekFilter gameweek={this.state.gameweek} updateRange={this.updateRange}/>
    				<div className="row">
    					<div className="mixed-chart">
    						<Chart
    						options={this.state.options}
							series={this.state.series}
							type="line"
							width={this.state.chartWidth}
    					/>
    				
    				</div>
    			</div>
    			<Spinner isLoading={this.state.isLoading}/>
    		</div>
    	</div>
    	)
    }
}
