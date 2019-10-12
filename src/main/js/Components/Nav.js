import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button, Navbar, Nav, NavItem, MenuItem } from 'react-bootstrap';

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
			      <Nav.Link><Link to="/">Home</Link></Nav.Link>
			      <Nav.Link className='hide_on_mobile'><Link to="/graphs/">Graphs</Link></Nav.Link>
			      <Nav.Link className='hide_on_mobile'><Link to="/all_teams/">All Teams</Link></Nav.Link>
			      <Nav.Link><Link to="/about/">About</Link></Nav.Link>
			    </Nav>
			  </Navbar.Collapse>
			</Navbar>
    		  )
    }
}