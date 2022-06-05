import { END_LOADING, START_LOADING } from "../constants/actionTypes";
const saplingsReducer = (state = { isLoading: true, saplings: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };

    case "UPDATE":
      return {
        ...state,
        saplings: state.saplings.map((sapling) =>
          sapling._id === action.payload._id ? action.payload : sapling
        ),
      };

    case "CREATE_ROW":
      return { ...state, sapling: action.payload };
    case "DELETE_ROW":
      return { ...state, sapling: action.payload };

    case "FETCH_SAPLING":
      return { ...state, sapling: action.payload }; //action.payload is actually coming from payload:data in actions/saplings.js
    case "FETCH_ALL":
      return { ...state, saplings: action.payload }; //action.payload is actually coming from payload:data in actions/saplings.js
    case "FETCH_BY_SEARCH":
      return { ...state, saplings: action.payload };
    case "CREATE":
      return { ...state, saplings: [...state.saplings, action.payload] };

    case "DELETE":
      return {
        ...state,
        saplings: state.saplings.filter(
          (sapling) => sapling._id !== action.payload
        ),
      };
    default:
      return { ...state, saplings: state.saplings };
  }
};
export default saplingsReducer;
