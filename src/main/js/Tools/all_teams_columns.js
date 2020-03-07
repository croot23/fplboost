import React from 'react';

const allTeamsTableHeaders = [{
			Header: 'Team Name',
			headerClassName: 'my-favorites-column-header-group',
			columns: [{
				Header: 'Team Name',
				accessor: 'teamName',
				width:170,
		  		}]
			},{
		  	Header: 'Goalkeepers',
			headerClassName: 'my-favorites-column-header-group',
			columns: [{
				Header: 'GK',
				accessor: 'gk1',
				width:72,
				},{
				Header: 'GK',
				accessor: 'gk2',
				width:72,
				}]
		  	},{
			Header: 'Defenders',
			headerClassName: 'my-favorites-column-header-group',
			columns: [{
				Header: 'Def',
				accessor: 'def1',
				width:72,
			  	},{
				Header: 'Def',
				accessor: 'def2',
				width:72,
			  	},{
				Header: 'Def',
				accessor: 'def3',
				width:72,
			  	},{
				Header: 'Def',
				accessor: 'def4',
				width:72,
			  	},{
				Header: 'Def',
				accessor: 'def5',
				width:72,
			  	}]
		  	},{
		  	Header: 'Midfielders',
			headerClassName: 'my-favorites-column-header-group',
			columns: [{
				Header: 'Mid',
				accessor: 'mid1',
				width:72,
				},{
				Header: 'Mid',
				accessor: 'mid2',
				width:72,
				},{
				Header: 'Mid',
				accessor: 'mid3',
				width:72,
				},{
				Header: 'Mid',
				accessor: 'mid4',
				width:72,
				},{
				Header: 'Mid',
				accessor: 'mid5',
				width:72,
				}]
		  	},{
		 	Header: 'Forwards',
			headerClassName: 'my-favorites-column-header-group',
			columns: [{
				Header: 'Fwd',
				accessor: 'fwd1',
				width:72,
			  },{
				Header: 'Fwd',
				accessor: 'fwd2',
				width:72,
			  },{
				Header: 'Fwd',
				accessor: 'fwd3',
				width:72,
			  }]
		  	}];

export default allTeamsTableHeaders