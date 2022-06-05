import { END_LOADING, START_LOADING } from "../constants/actionTypes";
const seedsReducer = (state = { isLoading: true, seeds: [], refs: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };

    case "UPDATE_SEED":
      return {
        ...state,
        seeds: state.seeds.map((seed) =>
          seed._id === action.payload._id ? action.payload : seed
        ),
      };

    case "CREATE_ROW":
      return { ...state, seed: action.payload };
    case "DELETE_ROW":
      return { ...state, seed: action.payload };

    case "GET_REFS":
      return { ...state, refs: action.payload };

    case "UPDATE_REF":
      return {
        ...state,
        refs: state.refs.map((ref) =>
          ref._id === action.payload._id ? action.payload : ref
        ),
      };

    case "CREATE_REF":
      return { ...state, refs: [...state.refs, action.payload] };
    case "DELETE_REF":
      return {
        ...state,
        refs: state.refs.filter((ref) => ref._id !== action.payload),
      };
    case "FETCH_REF_BY_SEARCH":
      return { ...state, refs: [action.payload] };

    case "FETCH_SEED":
      return { ...state, seed: action.payload }; //action.payload is actually coming from payload:data in actions/saplings.js
    case "FETCH_SEEDS":
      return { ...state, seeds: action.payload }; //action.payload is actually coming from payload:data in actions/saplings.js
    case "FETCH_BY_SEARCH":
      return { ...state, seeds: action.payload };
    case "CREATE_SEED":
      return { ...state, seeds: [...state.seeds, action.payload] };
    case "DELETE_SEED":
      console.log("aa", state.seeds)
      return {
        ...state,
        seeds: state.seeds.filter((seed) => seed._id !== action.payload),
      };
    default:
      return { ...state, seeds: state.seeds };
  }
};
export default seedsReducer;
