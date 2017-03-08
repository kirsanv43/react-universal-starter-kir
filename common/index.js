// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './components/App.jsx';
const React = require('react');
const ReactDOM = require('react-dom');
const App = require('./components/App.jsx');

const rootEl = document.getElementById('root');
const render = Component => ReactDOM.render( < Component />, 
rootEl);
render(App);

if(process.env.NODE_ENV == 'development' && module.hot) {
    module.hot.accept('./components/App.jsx', () => {
        render(App);
    });
}