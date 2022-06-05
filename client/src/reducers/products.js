import * as actionTypes from "../constants/actionTypes";

const productsReducer = (state = {adding:false , isLoading: true, products: [] }, action) => {
  switch (action.type) {
    case actionTypes.START_LOADING:
      return { ...state, isLoading: true };
    case actionTypes.END_LOADING:
      return { ...state, isLoading: false };

      case actionTypes.START_ADDING:
        return { ...state, isLoading: true };
      case actionTypes.END_ADDING:
        return { ...state, isLoading: false };

    case actionTypes.ADD_COMM:
      return {
        ...state,
        products: state.products.map((product) =>
        product._id === action.payload._id ? action.payload : product
        ),
      };
  
    case "FETCH_CATEGORY":
      return { ...state, products : action.payload };

    case "FETCH_FRUITS":
      return { ...state, products : action.payload }; //action.payload is actually coming from payload:data in actions/saplings.js

    /*case "UPDATE":
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
      };*/
    default:
      return { ...state, products: state.products };
  }
};
export default productsReducer;