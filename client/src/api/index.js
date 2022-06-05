import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token
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
export const createSapling = (newSaplingData, newStockData) =>
  API.post("/plantations/saplings", newSaplingData, newStockData);
export const createRow = (id) => API.post(`/plantations/saplings/stock/${id}`);
export const addFertilizationRow = (id1, id2) => API.post(`/plantations/saplings/stock/fertilization/${id1}/${id2}`);
export const updateFertilizationCol = (id1, id2, id3, key, value) => API.patch(`/plantations/saplings/stock/fertilization/${id1}/${id2}/${id3}`, key, value);
export const setDefaultFertilizationPlan = (id1, id2) => API.patch(`/plantations/saplings/stock/defaultFertilization/${id1}/${id2}`);
export const deleteFertilizationRow = (id1, id2, id3) =>
  API.delete(`/plantations/saplings/stock/fertilization/${id1}/${id2}/${id3}`);
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
export const fetchMaterialsByFamily = (searchQuery) =>
  API.get(
    `/materials/family?searchQuery=${searchQuery.family || "none"}`
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
export const createSeedRow = (id) => API.post(`/plantations/seeds/stock/${id}`);
export const deleteSeedRow = (id1, id2) =>
  API.delete(`/plantations/seeds/stock/${id1}/${id2}`);
export const updateSeedCol = (id1, id2, key, value) =>
  API.patch(`/plantations/seeds/stock/${id1}/${id2}`, key, value);

export const fetchEmployers = () => axios.get(url11);
export const createEmployer = (newEmployer) => axios.post(url11, newEmployer);
export const updateEmployer = (id, updatedEmployer) =>
  axios.patch(`${url11}/${id}`, updatedEmployer);
export const deleteEmployer = (id) => axios.delete(`${url11}/${id}`);
export const absence = (id) => axios.patch(`${url11}/${id}/absence`);
export const reinitialiser = (id) =>
  axios.patch(`${url11}/${id}/reinitialiser`);

export const fetchUsers = () => API.get("/user");
export const updateUser = (id, data) => API.patch(`/user/${id}`, data);

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


export const fetchSupplier = (id) => API.get(`/suppliers/${id}`);
export const fetchSuppliers = () => API.get("/suppliers");
export const createSupplier = (supplier) => API.post("/suppliers", supplier);
export const updateSupplier = (id, updatedPlan) =>
  API.patch(`/suppliers/${id}`, updatedPlan);
export const deleteSupplier = (id) => API.delete(`/suppliers/${id}`);
export const fetchSuppliersBySearch = (searchQuery) =>
  API.get(
    `/suppliers/search?searchQuery=${searchQuery.search || "none"}`
  );
export const createSaplingArticle = (id, newSaplingArticle) => API.patch(`/suppliers/${id}/saplingArticle`, newSaplingArticle);
export const createSeedArticle = (id, newSeedArticle) => API.patch(`/suppliers/${id}/seedArticle`, newSeedArticle);
export const createMaterialArticle = (id, newMaterialArticle) => API.patch(`/suppliers/${id}/materialArticle`, newMaterialArticle);
export const deleteSaplingArticle = (id1, id2) => API.delete(`/suppliers/${id1}/saplingArticle/${id2}`);
export const deleteSeedArticle = (id1, id2) => API.delete(`/suppliers/${id1}/seedArticle/${id2}`);
export const deleteMaterialArticle = (id1, id2) => API.delete(`/suppliers/${id1}/materialArticle /${id2}`);
export const updateSaplingArticle = (id, updatedSaplingArticle) => API.patch(`/suppliers/${id}/updateSaplingArticle/`, updatedSaplingArticle);
export const updateSeedArticle = (id, updatedSeedArticle) => API.patch(`/suppliers/${id}/updateSeedArticle/`, updatedSeedArticle);
export const updateMaterialArticle = (id, updatedMaterialArticle) => API.patch(`/suppliers/${id}/updateMaterialArticle /`, updatedMaterialArticle);

export const fetchDefaultFertilizationPlan = () => API.get("/plan/default");
export const createDefaultFertilizationProduct = () => API.post("/plan/default");
export const updateDefaultFertilizationPlan = (id, data) => API.patch(`/plan/default/${id}`, data);
export const deleteDefaultFertilizationProduct = (id) => API.delete(`/plan/default/${id}`);

export const fetchRefBySearch = (searchQuery) =>
  API.get(
    `/refSeeds/search?searchQuery=${searchQuery || "none"}`
  );
export const fetchRefs = () => API.get("/refSeeds");
export const createRef = () => API.post("/refSeeds");
export const updateRef = (id, data) => API.patch(`/refSeeds/${id}`, data);
export const deleteRef = (id) => API.delete(`/refSeeds/${id}`);

export const fetchMaterials = () => API.get("/materials");
export const fetchMaterial = (id) => API.get(`/materials/${id}`);
export const createMaterial = (newMaterial) => API.post("/materials", newMaterial);
export const updateMaterial = (id, updatedMaterial) =>
  API.patch(`/materials/${id}`, updatedMaterial);
export const deleteMaterials = (id) => API.delete(`/materials/${id}`);
export const createMaterialRow = (id) => API.post(`/materials/stock/${id}`);
export const deleteMaterialRow = (id1, id2) =>
  API.delete(`/materials/stock/${id1}/${id2}`);
export const updateMaterialCol = (id1, id2, key, value) =>
  API.patch(`/materials/stock/${id1}/${id2}`, key, value);
export const fetchMaterialsBySearch = (searchQuery) =>
  API.get(
    `/materials/search?searchQuery=${searchQuery.search || "none"}`
  );

export const fetchGeo = () => API.get("/geo");
export const createGeo = (newGeo) => API.post("/geo", newGeo);
export const updateGeo = (id, updatedMaterial) =>
  API.patch(`/geo/${id}`, updatedMaterial);
export const deleteGeo = (id) => API.delete(`/geo/${id}`);

///client///
export const refreshProducts = () => API.post("/products");
export const fetchFruits = () => API.get("/products");
export const fetchCategory = (category) => API.get(`/products/category?category=${category}`);
export const addComment = (id, comment) => API.patch(`/products/addComment/${id}`, comment)

export const fetchRequests = () => API.get("/request");
export const fetchUserRequests = () => API.get("/request/user");
export const createRequest = (newRequest) => API.post("/request", newRequest);
export const updateRequest = (id, updatedRequest) => API.patch(`/request/${id}`, updatedRequest);
export const deleteRequest = (id) => API.delete(`$/request/${id}`);
export const accepteRequest = (id) => API.patch(`/request/${id}/accepte`);
export const refuseRequest = (id) => API.patch(`/request/${id}/refuse`);

export const createIngineerRequest = (newRequest) => API.post("/ingineerRequest", newRequest);
export const fetchIngineerRequests = () => API.get("/ingineerRequest");
export const confirmReceipt = (id) => API.patch(`/ingineerRequest/${id}/confirmReceipt`);
