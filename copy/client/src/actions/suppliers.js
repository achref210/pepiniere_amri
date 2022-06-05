import * as api from "../api";

//Action Creators
export const getSuppliers = () => async (dispatch) => {
  try {
    const { data } = await api.fetchSuppliers();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createSupplier = (supplier) => async (dispatch) => {
  try {
    const { data } = await api.createSupplier(supplier);

    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateSupplier = (id, employer) => async (dispatch) => {
  try {
    const { data } = await api.updateSupplier(id, employer);

    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteSupplier = (id) => async (dispatch) => {
  try {
    await api.deleteSupplier(id);

    dispatch({ type: "DELETE", payload: id });
  } catch (error) {
    console.log(error);
  }
};
