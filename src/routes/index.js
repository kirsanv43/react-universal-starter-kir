import React from 'react';
import {Switch, StaticRouter, Route} from 'react-router-dom';
import Home from 'components/Home';
import App from 'components/App';
import About from 'components/About';
import { renderRoutes } from 'react-router-config';
//
// const routes = (
//     <Switch>
//       <Route exact path="/" render={(a,b) => <Home {...a} {...b}/>}  />
//       <Route path="/about" render={(a,b) => <About {...a} {...b}/>}/>
//     </Switch>
// );



const routes =
[
  { path: '/',
    exact: true,
    component: Home
  },
  { path: '/about',
    component: About
  }
]

// const Root = ({ route }) => (
//   <div>
//     <h1>Root</h1>
//     {/* child routes won't render without this */}
//     {renderRoutes(route.routes)}
//   </div>
// )
//
// const Home = ({ route }) => (
//   <div>
//     <h2>Home</h2>
//   </div>
// )
//
// const Child = ({ route }) => (
//   <div>
//     <h2>Child</h2>
//   </div>
// )
//
// const routes = [
//   { component: Root,
//     routes: [
//       { path: '/',
//         exact: true,
//         component: Home
//       },
//       { path: '/child/:id',
//         component: Child,
//       }
//     ]
//   }
// ]




export default routes;
