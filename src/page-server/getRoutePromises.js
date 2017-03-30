const getRoutePromises = (routes, promises , url) => {
  if(!(Array.isArray(routes) && routes.length)) {
    return promises;
  }
  const route = routes.find(route => {
    const match = matchPath(url, route);

    if ((match || !route.path) && route.component && route.component.preload) { 
      promises.push(route.component.preload(store.dispatch))
    }

    if(match || !route.path) {
      return route
    }
      
    return match
  });
  if(route) {
    return getRoutePromises(route.routes, promises, url);
  }
  return promises;
}