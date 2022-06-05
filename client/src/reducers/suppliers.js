import { END_LOADING, START_LOADING, START_LOADING_ARTICLES, END_LOADING_ARTICLES } from "../constants/actionTypes";
const suppliersReducer = (
  state = { articleLoading: false, isLoading: true, suppliers: [] },
  action
) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };

    case START_LOADING_ARTICLES:
        return { ...state, articleLoading: true };
    case END_LOADING_ARTICLES:
        return { ...state, articleLoading: false };

    case "UPDATE_SUPPLIER":
      return {
        ...state,
        suppliers: state.suppliers.map((supplier) =>
          supplier._id === action.payload._id ? action.payload : supplier
        ),
      };

      case "FETCH_SUPPLIER":
      return { ...state, supplier: action.payload };
      case "FETCH_SUPPLIER_BY_SEARCH":
      return { ...state, suppliers: action.payload };

    case "FETCH_SUPPLIERS":
      return { ...state, suppliers: action.payload }; //action.payload is actually coming from payload:data in actions/saplings.js

    case "CREATE_SUPPLIER":
      return { ...state, suppliers: [...state.suppliers, action.payload] };

    case "DELETE_SUPPLIER":
      return {
        ...state,
        suppliers: state.suppliers.filter(
          (supplier) => supplier._id !== action.payload
        ),
      };
    default:
      return { ...state, suppliers: state.suppliers };
  }
};
export default suppliersReducer;
