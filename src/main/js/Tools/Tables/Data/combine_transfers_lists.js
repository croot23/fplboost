function combineTransferLists(weeklyTransfersListIn, weeklyTransfersListOut) {
	
	var transfers = [];
	var numberOfTransfers = weeklyTransfersListIn.length;
	
	for (let i=0; i < numberOfTransfers; i++) {
		var transfer = {
			"playerInName" : weeklyTransfersListIn[i].webName,
			"playerInPoints" : weeklyTransfersListIn[i].gameweekPoints,
			"playerInPosition" : weeklyTransfersListIn[i].position,
			"playerOutName" : weeklyTransfersListOut[i].webName,
			"playerOutPoints" : weeklyTransfersListOut[i].gameweekPoints,
			"playerOutPosition" : weeklyTransfersListOut[i].position,
		};
		transfers.push(transfer);
		transfer = {};
	}
	
	// If no transfers have been made this week
	if (numberOfTransfers == 0) {
		var transfer = {
			"playerInName" : "No transfers",
		};
		transfers.push(transfer);
	}
	
	return transfers;
}

export default combineTransferLists