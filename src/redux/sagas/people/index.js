import { LOCATION_CHANGE } from 'connected-react-router';
import { matchPath } from 'react-router-dom';
import { call, apply, put, takeEvery, take, select, fork, takeLatest, delay, all, join } from 'redux-saga/effects';
import { getRouteConfig, MAIN_ROUTE, PEOPLES_DETAILS_ROUTE } from '../../../routes';
import { LOAD_USERS, LOAD_USERS_SUCCESS, LOAD_FILTERED_USERS } from '../../reducers/people/actions';
import { selectPeople } from '../../reducers/people/selectors';
import { LOAD_PEOPLE_DEATAILS, LOAD_PEOPLE_DEATAILS_FAILURE, LOAD_PEOPLE_DEATAILS_SUCCESS } from '../../reducers/peopleDetails/actions';

export function* LoadDataFromArray(data) {
  let res = null;
  if (Array.isArray(data)) {
    res = yield all(data.map(link => {
    const res = call(LoadSomeDataByPerson, link)
    return res
  }))} else {
    res = yield call(LoadSomeDataByPerson, data)
  }
  return res
};

export function* LoadSomeDataByPerson(url) {
  try {
    const request = yield call(
      fetch,
      url
    )
    const data = yield apply(request, request.json)
    return {
      data,
      error: false,
      url
    }
  } catch(error) {
    return {
      data: null,
      error: true,
      url
    }
  }
};

export function* LoadPeopleDetails({ payload }) {
  const { id  } = payload;
  try {
    const request = yield call(
    fetch,
    `https://swapi.dev/api/people/${id}`
  )

  let data = yield apply(request, request.json)
  const {films, vehicles, starships, homeworld} = data

  const requestData = yield all([
    fork(LoadDataFromArray, films),
    fork(LoadDataFromArray, vehicles),
    fork(LoadDataFromArray, starships),
    fork(LoadDataFromArray, homeworld)])
  
  const res = yield join(requestData)

  data = {
    ...data,
    films: res[0],
    vehicles: res[1],
    starships: res[2],
    homeworld: res[3].data.name
  }

  yield put({
    type: LOAD_PEOPLE_DEATAILS_SUCCESS,
    payload: data
  })} catch (error) {
    yield put({
      type: LOAD_PEOPLE_DEATAILS_FAILURE,
      payload: error
    })
  }
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
  yield delay(500)
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
  yield takeEvery(LOAD_PEOPLE_DEATAILS, LoadPeopleDetails)
};
