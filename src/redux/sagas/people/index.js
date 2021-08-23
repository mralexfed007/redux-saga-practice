import { LOCATION_CHANGE } from 'connected-react-router';
import { matchPath } from 'react-router-dom';
import { call, apply, put, takeEvery, take, select, fork, takeLatest, delay} from 'redux-saga/effects';
import { getRouteConfig, MAIN_ROUTE, PEOPLES_DETAILS_ROUTE } from '../../../routes';
import { LOAD_USERS, LOAD_USERS_SUCCESS, LOAD_FILTERED_USERS } from '../../reducers/people/actions';
import { selectPeople } from '../../reducers/people/selectors';
import { LOAD_PEOPLE_DEATAILS, LOAD_PEOPLE_DEATAILS_SUCCESS } from '../../reducers/peopleDetails/actions';

export function* LoadPeopleDetails({ payload }) {
  const { id  } = payload;
  const request = yield call(
    fetch,
    `https://swapi.dev/api/people/${id}`
  )

  const data = yield apply(request, request.json)

  yield put({
    type: LOAD_PEOPLE_DEATAILS_SUCCESS,
    payload: data
  })
}

export function* LoadPeopleList({ payload }) {
  const { page, search } = payload;
  const request = yield call(
    fetch,
    `https://swapi.dev/api/people?page=${page}&search=${search}`
    )

    const data = yield apply (request, request.json);
    yield put ({
      type: LOAD_USERS_SUCCESS,
      payload: data
    })
}

export function* LoadFilteredPeopleList({ payload }) {
  yield delay(1500)
  yield put({
    type: LOAD_USERS,
    payload,
  })
}

export function* loadUsersOnRouterEnter() {
  while (true) {
    const action = yield take (LOCATION_CHANGE)

    if (matchPath(action.payload.location.pathname, getRouteConfig(MAIN_ROUTE))) {
      const state = yield select(selectPeople);
      const { page, search } = state;

      yield put({
        type: LOAD_USERS,
        payload: {
          page, search
        }
      })
    }

    const detailsPage = matchPath(action.payload.location.pathname, getRouteConfig(PEOPLES_DETAILS_ROUTE))

    if (detailsPage) {
      const {id} = detailsPage.params;

      if (id) {
        yield put({
          type: LOAD_PEOPLE_DEATAILS,
          payload: {
            id
          }
        })
      }
    }
  }
}

export default function* peopleSaga() {
  yield fork (loadUsersOnRouterEnter);
  yield takeEvery(LOAD_USERS, LoadPeopleList)
  yield takeLatest(LOAD_FILTERED_USERS, LoadFilteredPeopleList)
  yield takeLatest(LOAD_PEOPLE_DEATAILS, LoadPeopleDetails)
};
