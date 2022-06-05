import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  tabs: {
    margin:'80px',
    paddingLeft:"180px"
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    width:800
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  buttonSubmit: {
    marginBottom: 10,
    padding: 10,
  },
  container: {
    height: "200px",
    display: "flex",
    alignItems:"center",
    justify:"center" },

  title1: {
      padding:"50px"
    },
    divider: {
      height:"5px"
    },
}));