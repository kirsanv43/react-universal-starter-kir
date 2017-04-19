import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
@connect(
  () => ({}),
  dispatch => ({ dispatch }),
)
export default class Home extends Component {

  static preload = (match, dispatch) => {
    return new Promise((success, reject) => {
      axios.get('https://jsonplaceholder.typicode.com/posts/1').then(response => {
        success(dispatch({ type: 'USER_LOAD_SUCCESS', data: response.data }));
      }).catch(error => {
        reject(error);
      });
    });
  }

  pushAbout = () => {
    this.props.dispatch(push('/about'));
  }
  render() {
    return (
      <div>
        <h2>Home</h2>
        <Link to="/about">About</Link>
        <button onClick={this.pushAbout}>About</button>
      </div>
    );
  }
}
