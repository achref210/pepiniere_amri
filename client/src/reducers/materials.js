import { END_LOADING, START_LOADING } from "../constants/actionTypes";
const materialsReducer = (state = { isLoading: true, materials: []}, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };

    case "UPDATE_MATERIAL":
      return {
        ...state,
        materials: state.materials.map((material) =>
        material._id === action.payload._id ? action.payload : material
        ),
      };

      case "CREATE_ROW":
      return { ...state, material: action.payload };
    case "DELETE_ROW":
      return { ...state, material: action.payload };

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
    
    case "FETCH_MATERIAL":
      return { ...state, material: action.payload }; //action.payload is actually coming from payload:data in actions/saplings.js
    case "FETCH_ALL_MATERIALS":
      return { ...state, materials: action.payload }; //action.payload is actually coming from payload:data in actions/saplings.js
    case "FETCH_MATERIALS_BY_SEARCH":
      return { ...state, materials: action.payload };
      case "FETCH_MATERIALS_BY_Family":
        return { ...state, materials: action.payload };
    case "CREATE_MATERIAL":
      return { ...state, materials: [...state.materials, action.payload] };
    case "DELETE_MATERIAL":
      return {
        ...state,
        materials: state.materials.filter((material) => material._id !== action.payload),
      };
    default:
      return { ...state, materials: state.materials };
  }
};
export default materialsReducer;
