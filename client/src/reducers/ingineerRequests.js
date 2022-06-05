import { END_LOADING, START_LOADING } from "../constants/actionTypes";
const ingineerRequestsReducer = (  state = { isLoading: true, ingineerrequests: [] },
action
) => {
switch (action.type) {
  case START_LOADING:
    return { ...state, isLoading: true };
  case END_LOADING:
    return { ...state, isLoading: false };

    case "UPDATE_INGINEER_REQUEST":
      return {...state,
        ingineerrequests: state.ingineerrequests.map((request) =>
        request._id === action.payload._id ? action.payload : request
      )};
    case "FETCH_INGINEER_REQUESTS":
      return { ...state, ingineerrequests: action.payload }; //action.payload is actually coming from payload:data in actions/employers.js
    case "CREATE_INGENEER_REQUEST":
      return { ...state, ingineerrequests: [...state.ingineerrequests, action.payload] };
      case "DELETE_INGENEER_REQUEST":
        return {
          ...state,
          ingineerRequests: state.ingineerRequests.filter(
            (request) => request._id !== action.payload
          ),
        };
      default:
        return { ...state, ingineerRequests: state.requests };
  }
};

export default ingineerRequestsReducer;
