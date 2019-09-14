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
		    width:100,
		  },{
		    Header: 'Transfers',
		    accessor: 'totalTransfers',
		    width:125,
		  },{
			id: 'wildcard',
		    Header: 'Wildcard',
		    accessor: team => (team.wildcard ? "Y" : ""),
		    width:90,
		  },{
			id: 'freeHit',
		    Header: 'FH',
		    accessor: team => (team.freeHit ? "Y" : ""),
		    width:65,
		  },{
			id: 'benchBoost',
		    Header: 'BB',
		    accessor: team => (team.benchBoost ? "Y" : ""),
		    width:65,
		  },{
			id: 'tripleCaptain',
		    Header: 'TC',
		    accessor: team => (team.tripleCaptain ? "Y" : ""),
		    width:65,
		  },{
			id: 'captain',
		    Header: 'Captain',
		    accessor: team => (team.captain.webName+" ("+(team.captain.gameweekPoints)*2+")"),
		    width:130,
			  },{
		    Header: 'Gameweek',
		    accessor: 'gameweekPoints',
		    width:100,
		  },{
		    Header: 'Total Points',
		    accessor: 'totalPoints',
		    width:110,
		  }];


export default mainTableHeaders