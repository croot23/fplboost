import React from 'react';

const mainTableHeaders = [{
		    Header: 'Team Name',
		    accessor: 'teamName',
		    width:200,
		  },{
		    Header: 'Manager',
		    accessor: 'managerName',
		    width:170,
		  },{
			id: 'teamValue',
		    Header: 'Team Value',
		    accessor: team => ((team.teamValue/10).toFixed(1)),
		    sortMethod: (a, b) => Number(a)-Number(b),
		    width:100,
		  },{
		    Header: 'Transfers',
		    accessor: 'transfersThisGameweek',
		    width:125,
		  },{
			id: 'wildcard',
		    Header: 'Wildcard',
		    accessor: team => (team.wildcard ? (team.wildcardGameweek == team.gameweek ? "Active" : "Y") : ""),
		    width:90,
		    getProps:
		        (state, rowInfo) => ({
		          style: {
		        	  fontWeight: (rowInfo.original.wildcardGameweek == rowInfo.original.gameweek ?'bold':'')
		          }
		        }),
		        Cell: team => { return <span title={"Played in gameweek "+team.original.wildcardGameweek}>{team.original.wildcard ? team.original.wildcardGameweek == team.original.gameweek ? "Active" : "Y" : ""}</span>; }
		  },{
			id: 'freeHit',
		    Header: 'FH',
		    accessor: team => (team.freeHit ? (team.freeHitGameweek == team.gameweek ? "Active" : "Y") : ""),
		    width:65,
		    getProps:
		        (state, rowInfo) => ({
		          style: {
		        	  fontWeight: (rowInfo.original.freeHitGameweek == rowInfo.original.gameweek ?'bold':'')
		          }
		        }),
		        Cell: team => { return <span title={"Played in gameweek "+team.original.freeHitGameweek}>{team.original.freeHit ? team.original.freeHitGameweek == team.original.gameweek ? "Active" : "Y" : ""}</span>; }
		  },{
			id: 'benchBoost',
		    Header: 'BB',
		    accessor: 'benchBoost',
		    width:65,
		    getProps:
		       (state, rowInfo) => ({
		    	   style: {
		    		   fontWeight: (rowInfo.original.benchBoostGameweek == rowInfo.original.gameweek ?'bold':'')
		    	   }
		       }),
		    Cell: team => { return <span title={"Played in gameweek "+team.original.benchBoostGameweek}>{team.original.benchBoost ? team.original.benchBoostGameweek == team.original.gameweek ? "Active" : "Y" : ""}</span>; }
		  },{
			id: 'tripleCaptain',
		    Header: 'TC',
		    accessor: team => (team.tripleCaptain ? (team.tripleCaptainGameweek == team.gameweek ? "Active" : "Y") : ""),
		    width:65,
		    getProps:
		        (state, rowInfo) => ({
		          style: {
		        	  fontWeight: (rowInfo.original.tripleCaptainGameweek == rowInfo.original.gameweek ?'bold':'')
		          }
		        }),
		        Cell: team => { return <span title={"Played in gameweek "+team.original.tripleCaptainGameweek}>{team.original.tripleCaptain ? team.original.tripleCaptainGameweek == team.original.gameweek ? "Active" : "Y" : ""}</span>; }
		  },{
			id: 'captain',
		    Header: 'Captain',
		    accessor: team => (team.tripleCaptainGameweek == team.gameweek ? team.captain.webName+" ("+(team.captain.gameweekPoints)*3+")" : team.captain.webName+" ("+(team.captain.gameweekPoints)*2+")"),
		    width:130,
			  },{
		    Header: 'Gameweek',
		    accessor: 'gameweekPoints',
		    width:100,
		  },{
		    Header: 'Total Points',
		    accessor: 'totalPoints',
		    width:110,
		  },{
			Header: 'Total Points',
			accessor: 'totalPoints',
			width:110,
			  }];


export default mainTableHeaders