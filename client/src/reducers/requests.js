import { END_LOADING, START_LOADING } from "../constants/actionTypes";
const requestsReducer = (  state = { isLoading: true, requests: [], userrequests: []},
action
) => {
switch (action.type) {
  case START_LOADING:
    return { ...state, isLoading: true };
  case END_LOADING:
    return { ...state, isLoading: false };

    case "UPDATE_REQUEST":
      return {...state,
        requests: state.requests.map((request) =>
        request._id === action.payload._id ? action.payload : request
      )};
    case "FETCH_USER_REQUESTS":
      return { ...state, userrequests: action.payload }; //action.payload is actually coming from payload:data in actions/employers.js
    case "FETCH_ALL_REQUESTS":
      return { ...state, requests: action.payload }; //action.payload is actually coming from payload:data in actions/employers.js
    case "CREATE_REQUEST":
      return { ...state, requests: [...state.requests, action.payload] };
      case "DELETE_REQUEST":
        return {
          ...state,
          requests: state.requests.filter(
            (request) => request._id !== action.payload
          ),
        };
      default:
        return { ...state, requests: state.requests };
  }
};

export default requestsReducer;
