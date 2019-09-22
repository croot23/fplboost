const playerTableHeaders = [{
			    Header: 'Name',
			    accessor: 'webName',
			    width:165,
			  },{
				  id: 'position',
				  Header: 'Position',
				  accessor: player => (player.position == 1 ? "GK" : (player.position == 2) ? "DEF ": (player.position == 3) ? "MID" : "FWD"),
				  width:60,
			  },{
				  id: 'price',
				  Header: 'Price',
				  accessor: player => (player.price.toFixed(1)),
				  sortMethod: (a, b) => Number(a)-Number(b),
				  width:50,
			  },{
				  Header: 'Change %',
				  accessor: 'change',
				  width:100,
				  sortMethod: (a, b) => Number(a)-Number(b),
			  },{
				  Header: 'Form',
				  accessor: 'form',
				  width:50,
				  sortMethod: (a, b) => Number(a)-Number(b),
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
				Header: 'Total Points',
			    accessor: 'totalPoints',
			    width:65,
			  },{
				Header: 'Points',
			    accessor: 'gameweekPoints',
			    width:65,
				  }];

export default playerTableHeaders