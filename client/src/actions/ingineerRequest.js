import * as api from "../api";

export const createIngineerRequest = (request) => async (dispatch) => {
    try {
      const { data } = await api.createIngineerRequest(request);
  
      dispatch({ type: "CREATE_INGENEER_REQUEST", payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const getIngineerRequests = () => async (dispatch) => {
    try {
      const { data } = await api.fetchIngineerRequests();
      console.log(data)
      dispatch({ type: "FETCH_INGINEER_REQUESTS", payload: data });
    } catch (error) {
      console.log(error);
    }
};

export const confirmReceipt = (id) => async (dispatch) => {
  try {
    const { data } = await api.confirmReceipt(id);
    dispatch({ type: "UPDATE_INGINEER_REQUEST", payload: data });
  } catch (error) {
    console.log(error);
  }
};
