import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
// import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

export default function Header(props: any) {
  const classes = useStyles();
  const { title } = props

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
       
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="left"
          noWrap
          className={classes.toolbarTitle}
        >
        {title}
        </Typography>
        {/* <IconButton>
          <SearchIcon />
        </IconButton> */}
       
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
       
      </Toolbar>
    </React.Fragment>
  );
}
