import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Topbar from "./components/Topbar";
import Footer from "../Main/components/Footer";

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
      <Footer />
    </div>
  );
};

Minimal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Minimal;
