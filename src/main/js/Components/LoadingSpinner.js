import React from 'react';
import Loader from 'react-loader-spinner'

export default class Spinner extends React.Component {
  //other logic
    render() {
     return(
      <Loader
      	 className={this.props.isLoading}
         type="Circles"
         color="#4c16aa"
         height={100}
         width={100}
      />
     );
    }
 }