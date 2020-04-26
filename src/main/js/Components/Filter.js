import React from 'react';
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

/* Component to display the gameweek filter slider */ 
export default class GameweekFilter extends React.Component {
	render() {
	  return (
	      <Nouislider
	        start={[1,this.props.gameweek]}
	      	step={1}
	      	pips={{
	          mode: 'steps',
	          stepped: true,
	          density: 1
	      	}}
	        range={{
	          min: 1,
	          max: this.props.gameweek
	        }}
	      onSet={this.props.updateRange}
	      />
	  );
	}
}