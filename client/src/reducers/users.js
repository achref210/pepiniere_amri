import { END_LOADING, START_LOADING } from "../constants/actionTypes";
const usersReducer = (state = { isLoading: true, users: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case "GET_USERS":
            return { ...state, users: action.payload };
        default:
            return state;
    }
};

export default usersReducer;
