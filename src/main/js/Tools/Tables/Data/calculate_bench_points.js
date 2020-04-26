/* Method to calculate the points on a teams bench */
export default function calculateBenchPoints(substitutes) {
	
	return substitutes.reduce((previous, current) => previous + current.gameweekPoints, 0);
	
}
