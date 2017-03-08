// import React from 'react'; import ReactDOM from 'react-dom'; import App from
// '../common/components/App.jsx'; import { AppContainer } from
// 'react-hot-loader';

import React from 'react';
import ReactDOM from 'react-dom';
import App from '../common/components/App.jsx';

const rootEl = document.getElementById('root');
const render = Component => ReactDOM.render(
    <Component/>, rootEl);
    
render(App);
if (module.hot) 
    module.hot.accept('../common/components/App', () => {
        const app = render(App);
        console.log(app)
        return app;
    });