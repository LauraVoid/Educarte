import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Topbar } from "./components";

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 56,
    height: "100%",
  },
  content: {
    height: "100%",
  },
}));

const Minimal = (props) => {
  const { children } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Topbar />
      <main className={classes.content}>{children}</main>
      {/* Aquí iria el Footer */}
    </div>
  );
};

Minimal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Minimal;
