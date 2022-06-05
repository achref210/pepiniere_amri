import * as api from "../api";

//Action Creators
export const getPlans = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPlans();
    console.log(data);
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createPlan = (plan) => async (dispatch) => {
  try {
    const { data } = await api.createPlan(plan);

    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePlan = (id, plan) => async (dispatch) => {
  try {
    const { data } = await api.updatePlan(id, plan);

    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePlan = (id) => async (dispatch) => {
  try {
    await api.deletePlan(id);

    dispatch({ type: "DELETE", payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const votePlan = (id) => async (dispatch) => {
  try {
    const { data } = await api.votePlan(id);

    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const disactivatePlan = (id) => async (dispatch) => {
  try {
    const { data } = await api.disactivatePlan(id);

    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const activatePlan = (id) => async (dispatch) => {
  try {
    const { data } = await api.activatePlan(id);

    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};
