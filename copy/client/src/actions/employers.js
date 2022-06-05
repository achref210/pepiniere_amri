import * as api from "../api";

//Action Creators
export const getEmployers = () => async (dispatch) => {
  try {
    const { data } = await api.fetchEmployers();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createEmployer = (employer) => async (dispatch) => {
  try {
    const { data } = await api.createEmployer(employer);

    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateEmployer = (id, employer) => async (dispatch) => {
  try {
    const { data } = await api.updateEmployer(id, employer);

    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const absence = (id) => async (dispatch) => {
  try {
    const { data } = await api.absence(id);

    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const reinitialiser = (id) => async (dispatch) => {
  try {
    const { data } = await api.reinitialiser(id);

    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteEmployer = (id) => async (dispatch) => {
  try {
    await api.deleteEmployer(id);

    dispatch({ type: "DELETE", payload: id });
  } catch (error) {
    console.log(error);
  }
};
