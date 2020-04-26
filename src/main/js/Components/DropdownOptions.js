import React from 'react';

/* Returns a list of option elements to be placed inside a select element */
export default class DropdownOptions extends React.Component {
	render() {
		return (
				<option key={this.props.options.id} value={this.props.options.id}>{this.props.options.name}</option>
		)
	}
}