/* Function to highlight a cell base on text in a Components/TableCellHighlighter.js component */
export default function highlightPlayer(tableClassName) {
	const markInstance = new Mark(document.querySelector(tableClassName));
	// Read the keyword
	var keyword = document.getElementById("tableCellHighlighter").value;
	markInstance.unmark({
	  	done: function(){
	    	markInstance.mark(keyword);
	    }
	 });
}