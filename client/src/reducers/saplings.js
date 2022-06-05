import { END_LOADING, START_LOADING } from "../constants/actionTypes";
const saplingsReducer = (state = { isLoading: true, saplings: [],defaultPlan: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };

    case "UPDATE_SAPLING":
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
    case "FETCH_ALL_SAPLINGS":
      return { ...state, saplings: action.payload }; //action.payload is actually coming from payload:data in actions/saplings.js
    case "FETCH_BY_SEARCH":
      return { ...state, saplings: action.payload };
    case "CREATE_SAPLING":
      return { ...state, saplings: [...state.saplings, action.payload] };

    case "DELETE_SAPLING":
      return {
        ...state,
        saplings: state.saplings.filter(
          (sapling) => sapling._id !== action.payload
        ),
      };
    case "GET_DEFAULT_FERTILIZATION_PLAN":
      return { ...state, defaultPlan: action.payload };

    case "UPDATE_DEFAULT_FERTILIZATION_PLAN":
      return {
        ...state,
        defaultPlan: state.defaultPlan.map((product) =>
          product._id === action.payload._id ? action.payload : product
        ),
      };

      case "DELETE_DEFAULT_FERTILIZATION_PRODUCT":
        return {
          ...state,
          defaultPlan: state.defaultPlan.filter((product) => product._id !== action.payload),
        };

    case "CREATE_DEFAULT_FERTILIZATION_PRODUCT":
      return { ...state, defaultPlan: [...state.defaultPlan, action.payload] };
    default:
      return { ...state, defaultPlan: state.defaultPlan };
  }
};
export default saplingsReducer;
