import React from 'react';

const playerTableHeaders = [{
			    Header: 'Name',
			    accessor: 'webName',
			    width:150,
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
				  Header: 'Total Points',
				  accessor: 'totalPoints',
				  width:85,
			  },{
				  Header: 'Change %',
				  accessor: 'change',
				  width:80,
				  sortMethod: (a, b) => Number(a)-Number(b),
			  },{
				  Header: 'Form',
				  accessor: 'form',
				  width:50,
				  sortMethod: (a, b) => Number(a)-Number(b),
			  },{
				  Header: 'Mins',
				  accessor: 'minutesPlayed',
				  width:50,
			  },{
				  id: 'cleanSheet',
				  Header: 'CS',
				  width:50,
				  accessor: player => (player.cleanSheet == true && player.position != 4 ? "1" : (player.cleanSheet == false && player.position != 4) ? "-" : "-"),
			  },{
				  id: 'goalScored',
				  Header: 'GS',
				  accessor: player => (player.goalsScored == 0 ? "-" : player.goalsScored),
				  width:50,
			  },{
				  id: 'assists',
				  Header: 'A',
				  accessor: player => (player.assists == 0 ? "-" : player.assists),
				  width:50,
			  },{
				  id: 'bonusPoints',
				  Header: 'BP',
				  accessor: player => (player.bonusPoints == 0 ? "-" : player.bonusPoints),
				  width:50,
			  },{
				Header: 'Points',
			    accessor: 'gameweekPoints',
			    width:0,
			  },{
				Header: 'Points',
				accessor: 'gameweekPoints',
				width:65,
			}];
export default playerTableHeaders;