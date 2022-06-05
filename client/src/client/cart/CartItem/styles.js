import { makeStyles } from '@mui/styles';
import { height } from '@mui/system';

export default makeStyles((theme) => ({
  customHoverFocus: {
    "&:hover, &.Mui-focusVisible": { backgroundColor: "yellow" }
  },
    blue_slider: {
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
      color: 'white',
      padding: '0 30px',
      margin: 8,
    },
  red_button: {
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 30,
    padding: '0 30px',
    margin: 8,
  },
  blue_button: {
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white',
    height: 30,
    padding: '4 30px',
    margin: 8,
  },
  cardActions:{
      justifyContent: 'space-between'
  },
  buttons: {
      display:'flex',
      alignItems:'center'
  },
  container: {
    position: "relative"
  },
  
  topright: {
    position: "absolute",
    top: "8px",
    right: "12px",
  },
  spacingSlider: {
    width: '60px',
    height: '20px'
  },
  selectSize:{
    margin:'4px'
  },
  noSelectSize:{
    margin:"5px"
  },
  spacing: {
    margin:"0.5px"
  },
  media: {
    height: 260,
    width:300,
    marginTop:10,
  },
  CardContent:{
    maxHeight:20
  }
}));