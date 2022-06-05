import {makeStyles} from '@mui/styles';

export default makeStyles(()=>({
    root: {
        maxWidth:"100%"
    },
    info: {
      padding:"5px",
  },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
      cardActions: {
        display: 'flex',
        justifyContent: 'flex-end',
      },
      cardContent: {
        display: 'flex',
        justifyContent: 'space-between',
      },
      blue_slider: {
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
        color: 'white',
        padding: '0 30px',
        margin: 8,
      },
    gris_textfield: {
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(85, 90, 90, .3)',
        color: 'white',
        height: 30,
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
    blue_submit_button: {
      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
      color: 'white',
      height: 48,
      padding: '0 30px',
      margin: 8,
    },
    }))