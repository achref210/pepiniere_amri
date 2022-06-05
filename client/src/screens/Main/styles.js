import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    closeButton: {
      //positioning right absolute with returning to left 4%
      width:"4%", 
      position: "absolute",
      right: 0
      
  },
  pagination: {
    //positioning right absolute with returning to left 4%
    width:"4%", 
    position: "absolute",
    right: 0,
},
  mainContainer: {
    display: "flex",
    alignItems: "center",
    margin: theme.spacing(2),
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: "center",
  },
  head: {
    height: 100,
  },
  scroll: {
    scrollBehavior: "smooth"
  },
}));