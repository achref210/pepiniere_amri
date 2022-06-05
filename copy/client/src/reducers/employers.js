const employersReducer = (employers = [], action) => {
  switch (action.type) {
    case "INC":
    case "UPDATE":
      return employers.map((employer) =>
        employer._id === action.payload._id ? action.payload : employer
      );
    case "FETCH_ALL":
      return action.payload; //action.payload is actually coming from payload:data in actions/employers.js
    case "CREATE":
      return [...employers, action.payload];
    case "DELETE":
      return employers.filter((employer) => employer._id !== action.payload);
    default:
      return employers;
  }
};

export default employersReducer;
