import { END_LOADING, START_LOADING } from "../constants/actionTypes";
const seedsReducer = (state = { isLoading: true, seeds: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };

    case "UPDATE":
      return {
        ...state,
        seeds: state.seeds.map((seed) =>
          seed._id === action.payload._id ? action.payload : seed
        ),
      };

    case "FETCH_SEED":
      return { ...state, seeds: action.payload }; //action.payload is actually coming from payload:data in actions/saplings.js
    case "FETCH_ALL":
      return { ...state, seeds: action.payload }; //action.payload is actually coming from payload:data in actions/saplings.js
    case "FETCH_BY_SEARCH":
      return { ...state, seeds: action.payload };
    case "CREATE":
      return { ...state, seeds: [...state.seeds, action.payload] };
    case "DELETE":
      return {
        ...state,
        seeds: state.seeds.filter((seed) => seed._id !== action.payload),
      };
    default:
      return { ...state, seeds: state.seeds };
  }
};
export default seedsReducer;
