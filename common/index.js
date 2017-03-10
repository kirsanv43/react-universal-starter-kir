import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { AppContainer } from 'react-hot-loader';

const rootEl = document.getElementById('root');
const render = Component => {
    return ReactDOM.render(
        <AppContainer><Component/></AppContainer> , rootEl);
}
render(App);
if (module.hot) module.hot.accept('./components/App', () => render(App));

// if (process.env.NODE_ENV == 'development' && module.hot) {
//     module
//         .hot
//         .accept('./components/App.js', () => {
//             render(App);
//         });
// }