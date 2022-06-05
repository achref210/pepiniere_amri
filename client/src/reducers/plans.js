import { END_LOADING, START_LOADING } from "../constants/actionTypes";
const plansReducer = (  state = { isLoading: true, plans: [] },
action
) => {
switch (action.type) {
  case START_LOADING:
    return { ...state, isLoading: true };
  case END_LOADING:
    return { ...state, isLoading: false };

    case "UPDATE_PLAN":
      return {...state,
        plans: state.plans.map((plan) =>
        plan._id === action.payload._id ? action.payload : plan
      )};
    case "FETCH_ALL_PLANS":
      return { ...state, plans: action.payload }; //action.payload is actually coming from payload:data in actions/employers.js
    case "CREATE_PLAN":
      return { ...state, plans: [...state.plans, action.payload] };
      case "DELETE_PLAN":
        return {
          ...state,
          plans: state.plans.filter(
            (plan) => plan._id !== action.payload
          ),
        };
      default:
        return { ...state, plans: state.plans };
  }
};

export default plansReducer;
