import jwt, { decode } from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    let decodedData;
    //own token
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "test");
      //this will give the data from each specific token,
      //will give us the username of the person and it's id...
      //test is the secret
      req.nameAdress = decodedData?.email.split("@")[0];
      req.userId = decodedData?.id;
    } //google token
    else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub; // sub is an id from google to users
    }
    //next used to pass the action
    //interact with something => auth middleware(next) => something controller
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
