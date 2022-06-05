import { END_LOADING, START_LOADING } from "../constants/actionTypes";
const suppliersReducer = (
  state = { isLoading: true, suppliers: [] },
  action
) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };

    case "UPDATE":
      return {
        ...state,
        suppliers: state.suppliers.map((supplier) =>
          supplier._id === action.payload._id ? action.payload : supplier
        ),
      };

    case "FETCH_ALL":
      return { ...state, suppliers: action.payload }; //action.payload is actually coming from payload:data in actions/saplings.js

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
