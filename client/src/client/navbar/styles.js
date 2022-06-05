import { makeStyles } from '@mui/styles';

const drawerWidth = 0;

export default makeStyles((theme) => ({
  appBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  title: {
    flexGrow: 1,
    alignItems: 'center',
    display: 'flex',
    textDecoration: 'none',
  },
  image: {
    marginRight: '10px',
  },
  grow: {
    flexGrow: 1,
  },
}));