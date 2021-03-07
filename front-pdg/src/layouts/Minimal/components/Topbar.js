import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: "none",
  },
  text: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontSize: 20,
    color: "white",
    paddingLeft: 10,
  },
}));

const Topbar = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      position="fixed"
      color="primary"
    >
      <Toolbar variant="dense">
        <RouterLink to="/home">
          <img height="35px" alt="logo" src="../../../img/logos/logo192.png" />
        </RouterLink>
        <Typography>Educarte</Typography>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
};

export default Topbar;
