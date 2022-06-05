import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  deleteButton: {
    //positioning right absolute with returning to left 4%
    position: "absolute",
    top: "8px",
    right: "16px",
    
},
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(1),
  },
  form: {
    display: "flex",
    justifyContent: "center",
  },
  fileInput: {
    width: "97%",
    margin: "10px 0",
  },
  buttonSubmit: {
    marginBottom: 10,
    padding: 20,
    height : "60px"
  },
  date: {
    width:"900px"
  },
  fileInput: {
    width: "97%",
    margin: "10px 0",
  },
  link: {
    cursor: "pointer"
  }
}));
