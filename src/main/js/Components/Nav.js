import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button, Navbar, Nav, NavItem, MenuItem } from 'react-bootstrap';

/* Renders the navigation bar at the top of every page */
 export default class NavHeader extends React.Component {
    render() {  
      return (
    		  <Navbar bg="dark" variant="dark">
			  <Navbar.Brand className='centre_header_text' href="/"><img
		        src="/img/football_pitch.svg"
		            width="30"
		            height="30"
		            className="d-inline-block align-top"
		            alt="React Bootstrap logo"
		          />FPL Boost</Navbar.Brand>
			  <Navbar.Toggle aria-controls="basic-navbar-nav" />
			  <Navbar.Collapse id="basic-navbar-nav">
			    <Nav className="mr-auto">
			      <Link to="/">Home</Link>
			      <Link className='hide_on_mobile' to="/graphs/">Graphs</Link>
			      <Link className='hide_on_mobile' to="/all_teams/">All Teams</Link>
			      <Link to="/about/">About</Link>
			    </Nav>
			  </Navbar.Collapse>
			</Navbar>
    		  )
    }
}