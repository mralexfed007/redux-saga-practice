import React from "react";
import { Route, Switch } from "react-router-dom";
import App from "./pages/App"
import Details from "./pages/Details"

export const MAIN_ROUTE = 'MAIN_ROUTE';
export const PEOPLES_DETAILS_ROUTE = 'PEOPLES_DETAILS_ROUTE';

const routes = [
  {
    id: MAIN_ROUTE,
    path: '/',
    exact: true,
    component: App
  },
  {
    id: PEOPLES_DETAILS_ROUTE,
    path: '/people/:id',
    exact: true,
    component: Details
  }
];

export const getRouteConfig = id => {
  const route = routes.find(route => route.id === id)

  if (route) {
    const {component, ...rest} = route;

  return rest;
  }
}

export default function Routes() {
  return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column">
              <Switch>
                {routes.map(route => {
                  const {id, ...props} = route;
                  return (
                    <Route key={id} path={props.path} exact component={props.component} />
                )})}
              </Switch>
            </div>
          </div>
        </div>
      </section>
  )
}