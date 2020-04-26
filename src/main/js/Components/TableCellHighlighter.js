import React from 'react';
import highlightPlayer from '../Tools/Misc/highlight_player.js'

/* Component to input text for the cell highlighter function in Tools/Misc/highlight_player.js */
export default class TableCellHighlighter extends React.Component {
	render() {
		return (
				<input type="text" id="tableCellHighlighter" placeholder=" Type a players name..." onKeyUp={() => highlightPlayer(this.props.tableClassName)}></input>
		)
	}
}