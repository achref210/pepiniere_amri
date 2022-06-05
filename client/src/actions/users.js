import * as api from "../api";
import { END_LOADING, START_LOADING } from "../constants/actionTypes";

//Action Creators
export const getUsers = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchUsers();
    dispatch({ type: "GET_USERS", payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateUser = (id,info) => async (dispatch) => {
  try {
    console.log(id,info)
    const { data } = await api.updateUser(id,info);
    dispatch({ type: "UPDATE_USER", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
