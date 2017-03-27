import React, {Component} from 'react';
require("./app.css");
 export default class App extends Component {
  render() {
    return (
      <div>
 
        {this.props.children}
      </div>
    );
  }
}
