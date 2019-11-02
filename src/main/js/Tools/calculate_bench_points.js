function calculateBenchPoints(substitutes) {
	
	let pointsOnTheBench = 0;
	
	substitutes.forEach(function(sub) {
		pointsOnTheBench += sub.gameweekPoints;
	});
	
	return pointsOnTheBench;
}

export default calculateBenchPoints