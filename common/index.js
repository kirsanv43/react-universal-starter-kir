import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
//import {AppContainer} from 'react-hot-loader';

const rootEl = document.getElementById('root');
const render = Component => {
    console.log(<Component/>);
    return ReactDOM.render(
        <Component/> , rootEl);
}
render(App);

// if (process.env.NODE_ENV == 'development' && module.hot) {
//     module
//         .hot
//         .accept('./components/App.js', () => {
//             render(App);
//         });
// }