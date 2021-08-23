import { LOAD_PEOPLE_DEATAILS, LOAD_PEOPLE_DEATAILS_FAILURE, LOAD_PEOPLE_DEATAILS_SUCCESS } from "./actions";

const initialState = {
  data: null,
  error: null,
  loading: false
}

export default function peopleDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PEOPLE_DEATAILS:
      return {
        ...state,
        loading: true
      }
    
    case LOAD_PEOPLE_DEATAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null
      }

    case LOAD_PEOPLE_DEATAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    default:
      return state
  }
}