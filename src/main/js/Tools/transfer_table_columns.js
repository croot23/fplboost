const transferTableHeaders = [{
		Header: 'Weekly Transfers',
		headerClassName: 'my-favorites-column-header-group',
		columns: [{
			    Header: 'Transfer In',
			    accessor: 'playerInName',
			    width:135,
			  	},{
				  Header: 'Points',
				  accessor: 'playerInPoints',
				  width:55,
			  	},{
				  Header: 'Transfer Out',
				  accessor: 'playerOutName',
				  width:135,
			  	},{
				  Header: 'Points',
				  accessor: 'playerOutPoints',
				  width:55,
			  	}]
		}];

export default transferTableHeaders