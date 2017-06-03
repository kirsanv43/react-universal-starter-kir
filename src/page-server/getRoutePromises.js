import { matchPath } from 'react-router-dom';

/**
 * grab all preloaders from containers
 * @param  {Array} appRoutes array of routes
 * @param  {String} url       current url
 * @param  {Function} dispatch  dispatch from store
 * @param  {Array} promises  empty array
 * @return {Array}           array with promises
 */
function getRoutePromises(appRoutes, url, dispatch, promises = []) {
  if (!(Array.isArray(appRoutes) && appRoutes.length)) {
    return promises;
  }

  const route = appRoutes.find(route => {
    const match = matchPath(url, route);

    if ((match || !route.path) && route.component && route.component.preload) {
      promises.push(route.component.preload(dispatch));
    }
    if (match || !route.path) {
      return route;
    }

    return match;
  });

  if (route) {
    return getRoutePromises(route.routes, url, dispatch, promises);
  }

  return promises;
}

export default getRoutePromises;
