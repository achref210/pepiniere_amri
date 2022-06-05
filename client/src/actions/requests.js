import * as api from "../api";

//Action Creators
export const getRequests = () => async (dispatch) => {
  try {
    const { data } = await api.fetchRequests();
    await dispatch({ type: "FETCH_ALL_REQUESTS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getUserRequests = () => async (dispatch) => {
  try {
    const { data } = await api.fetchUserRequests();
    dispatch({ type: "FETCH_USER_REQUESTS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createRequest = (request) => async (dispatch) => {
  try {
    const { data } = await api.createRequest(request);

    await dispatch({ type: "CREATE_REQUEST", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateRequest = (id, request) => async (dispatch) => {
  try {
    await api.updateRequest(id, request);
  } catch (error) {
    console.log(error);
  }
};

export const deleteRequest = (id) => async (dispatch) => {
  try {
    await api.deleteRequest(id);

    dispatch({ type: "DELETE_REQUEST", payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const accepteRequest = (id) => async (dispatch) => {
  try {
    const { data } = await api.accepteRequest(id);
    dispatch({ type: "UPDATE_REQUEST", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const refuseRequest = (id) => async (dispatch) => {
  try {
    const { data } = await api.refuseRequest(id);

    dispatch({ type: "UPDATE_REQUEST", payload: data });
  } catch (error) {
    console.log(error);
  }
};
