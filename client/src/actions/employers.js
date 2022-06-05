import * as api from "../api";
import { END_LOADING, START_LOADING } from "../constants/actionTypes";

//Action Creators
export const getEmployers = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchEmployers();
    dispatch({ type: "FETCH_ALL_EMPLOYERS", payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const createEmployer = (employer) => async (dispatch) => {
  try {
    const { data } = await api.createEmployer(employer);

    dispatch({ type: "CREATE_EMPLOYER", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateEmployer = (id, employer) => async (dispatch) => {
  try {
    const { data } = await api.updateEmployer(id, employer);

    dispatch({ type: "UPDATE_EMPLOYER", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const absence = (id) => async (dispatch) => {
  try {
    const { data } = await api.absence(id);

    dispatch({ type: "UPDATE_EMPLOYER", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const reinitialiser = (id) => async (dispatch) => {
  try {
    const { data } = await api.reinitialiser(id);

    dispatch({ type: "UPDATE_EMPLOYER", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteEmployer = (id) => async (dispatch) => {
  try {
    await api.deleteEmployer(id);

    dispatch({ type: "DELETE_EMPLOYER", payload: id });
  } catch (error) {
    console.log(error);
  }
};
