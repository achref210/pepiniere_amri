import { END_LOADING, START_LOADING } from "../constants/actionTypes";
const geoReducer = (  state = { isLoading: true, geo: [] },
action
) => {
switch (action.type) {
  case START_LOADING:
    return { ...state, isLoading: true };
  case END_LOADING:
    return { ...state, isLoading: false };

    /*case "UPDATE":
      return {...state,
        plans: state.plans.map((plan) =>
        plan._id === action.payload._id ? action.payload : plan
      )};*/
    case "FETCH_GEOS":
      return { ...state, geo: action.payload }; //action.payload is actually coming from payload:data in actions/employers.js
    case "CREATE":
      return { ...state, geo: [...state.geo, action.payload] };
    case "DELETE_GEO":
        return {
          ...state,
          geo: state.geo.filter(
            (mark) => mark._id !== action.payload
          ),
        };
      default:
        return { ...state, geo: state.geo };
  }
};

export default geoReducer;
