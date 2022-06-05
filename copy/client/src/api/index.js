import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

const url1 = "http://localhost:5000/plantations/saplings";
const url2 = "http://localhost:5000/plantations/seeds";

const url11 = "http://localhost:5000/employers";

const url21 = "http://localhost:5000/user/signin";
const url22 = "http://localhost:5000/user/signup";
const url23 = "http://localhost:5000/user/plan";

export const fetchSaplingsBySearch = (searchQuery) =>
  API.get(
    `/plantations/saplings/search?searchQuery=${searchQuery.search || "none"}`
  );
/*
    `/plantations/saplings?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`*/
export const fetchSapling = (id) => API.get(`/plantations/saplings/${id}`);
export const fetchSaplings = () => API.get("/plantations/saplings");
export const createSapling = (newSapling) =>
  API.post("/plantations/saplings", newSapling);
export const createRow = (id) => API.post(`/plantations/saplings/stock/${id}`);
export const updateCol = (id1, id2, key, value) =>
  API.patch(`/plantations/saplings/stock/${id1}/${id2}`, key, value);
export const deleteRow = (id1, id2) =>
  API.delete(`/plantations/saplings/stock/${id1}/${id2}`);
export const updateSapling = (id, updatedSapling) =>
  API.patch(`/plantations/saplings/${id}`, updatedSapling);
export const deleteSaplings = (id) => API.delete(`/plantations/saplings/${id}`);

export const fetchSeedsBySearch = (searchQuery) =>
  API.get(
    `/plantations/seeds/search?searchQuery=${searchQuery.search || "none"}`
  );
/*
    `/plantations/saplings?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`*/
export const fetchSeed = (id) => API.get(`/plantations/seeds/${id}`);
export const fetchSeeds = () => API.get("/plantations/seeds");
export const createSeed = (newSeed) => API.post("/plantations/seeds", newSeed);
export const updateSeed = (id, updatedSeed) =>
  API.patch(`/plantations/seeds/${id}`, updatedSeed);
export const deleteSeeds = (id) => API.delete(`/plantations/seeds/${id}`);

export const fetchEmployers = () => axios.get(url11);
export const createEmployer = (newEmployer) => axios.post(url11, newEmployer);
export const updateEmployer = (id, updatedEmployer) =>
  axios.patch(`${url11}/${id}`, updatedEmployer);
export const deleteEmployer = (id) => axios.delete(`${url11}/${id}`);
export const absence = (id) => axios.patch(`${url11}/${id}/absence`);
export const reinitialiser = (id) =>
  axios.patch(`${url11}/${id}/reinitialiser`);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
export const exist = (formData, email) =>
  API.get(`user/signup/${email}`, formData);

export const fetchPlans = () => API.get("/user/plan");
export const createPlan = (newPlan) => API.post("/user/plan", newPlan);
export const updatePlan = (id, updatedPlan) =>
  API.patch(`/user/plan/${id}`, updatedPlan);
export const deletePlan = (id) => API.delete(`/user/plan/${id}`);
export const votePlan = (id) => API.patch(`/user/plan/${id}/votePlan`);
export const activatePlan = (id) => API.patch(`/user/plan/${id}/activatePlan`);

export const disactivatePlan = (id) =>
  API.patch(`/user/plan/${id}/disactivatePlan`);

export const fetchSuppliers = () => API.get("/supplier");
export const createSupplier = (newPlan) => API.post("/supplier", newPlan);
export const updateSupplier = (id, updatedPlan) =>
  API.patch(`/supplier/${id}`, updatedPlan);
export const deleteSupplier = (id) => API.delete(`/supplier/${id}`);
