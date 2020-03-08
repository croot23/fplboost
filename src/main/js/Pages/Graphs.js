import React from 'react';
import Chart from "react-apexcharts";

export default class Graphs extends React.Component {
	
	constructor(props) {
	    super(props);

	    this.state = {
	       options: {
	    	   chart: {
	    		   id: "basic-bar"
	    	   }
	       },
	       series: [
	    	   {
	    		   name: "Cowlin",
	    		   data: 
	    			   [{"x" : "GW1", "y" : 56},
	    			    {"x" : "GW2", "y" : 89},
	    			    {"x" : "GW3", "y" : 148}]
	    	   },{
	    		   name: "Croot",
	    		   data: 
	    			   [{"x" : "GW1", "y" : 48},
	    				{"x" : "GW2", "y" : 77},
	    				{"x" : "GW3", "y" : 143}]
	    	   }
	    	]
	     };
	  }

    render() {  
      return (
    		  <div>
    		  	<div class="mainContainer">
    		  		<div className="row">
    		  			<div className="mixed-chart">
    		  				<Chart
    		  				options={this.state.options}
    		  				series={this.state.series}
    		  				type="line"
    		  				width="700"
    		  				/>
    		  			</div>
    		  		</div>
    		  	</div>
    		  </div>
    		  )
    }
}