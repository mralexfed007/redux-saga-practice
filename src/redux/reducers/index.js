import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import { createBrowserHistory } from 'history';
import peopleReducer from './people';
import peopleDetailsReducer from './peopleDetails';

export const history = createBrowserHistory();

const initial = {};

export function appReducer(state = initial, action) {
  return state;
}

const rootReducer = combineReducers({
  app: appReducer,
  people: peopleReducer,
  peopleDetails: peopleDetailsReducer,
  router: connectRouter(history),
})

export default rootReducer;