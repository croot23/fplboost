'use strict';

require("babel-core/register");
require("babel-polyfill");

import NavHeader from './Components/Nav.js';
import Graphs from './Pages/Graphs.js'
import Home from './Pages/Home.js'
import AllTeams from './Pages/All_Teams.js'
import About from './Pages/About.js'
import fourohfour from './Pages/404.js'
import { Button, Navbar, Nav, NavItem, MenuItem } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { HashRouter } from 'react-router-dom'
const { createApolloFetch } = require('apollo-fetch');
const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');
const fetch = createApolloFetch({
	uri: window.location+'graphql',
});

class App extends React.Component {
	
	// Main render method
	render() {
		return (
			<HashRouter>
				<NavHeader />
				<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/graphs/" component={Graphs} />
				<Route path="/all_teams/" component={AllTeams} />
				<Route path="/about/" component={About} />
				<Route component={fourohfour}/>
				</Switch>
			</HashRouter>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('react')
)
