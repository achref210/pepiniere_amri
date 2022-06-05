import { END_LOADING, START_LOADING } from "../constants/actionTypes";
const employersReducer = (  state = { isLoading: true, employers: [] },
action
) => {
switch (action.type) {
  case START_LOADING:
    return { ...state, isLoading: true };
  case END_LOADING:
    return { ...state, isLoading: false };

  case "UPDATE_EMPLOYER":
    return {
      ...state,
      employers: state.employers.map((employer) =>
      employer._id === action.payload._id ? action.payload : employer
      ),
    };

  case "FETCH_ALL_EMPLOYERS":
    return { ...state, employers: action.payload }; //action.payload is actually coming from payload:data in actions/saplings.js

  case "CREATE_EMPLOYER":
    return { ...state, employers: [...state.employers, action.payload] };

  case "DELETE_EMPLOYER":
    return {
      ...state,
      employers: state.employers.filter(
        (employer) => employer._id !== action.payload
      ),
    };
  default:
    return { ...state, employers: state.employers };
}
};

export default employersReducer;
