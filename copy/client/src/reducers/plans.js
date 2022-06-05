const plansReducer = (plans = [], action) => {
  switch (action.type) {
    case "UPDATE":
      return plans.map((plan) =>
        plan._id === action.payload._id ? action.payload : plan
      );
    case "FETCH_ALL":
      return action.payload; //action.payload is actually coming from payload:data in actions/employers.js
    case "CREATE":
      return [...plans, action.payload];
    /*case "DELETE":
      return employers.filter((employer) => employer._id !== action.payload);*/
    default:
      return plans;
  }
};
export default plansReducer;
