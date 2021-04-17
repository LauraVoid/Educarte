import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Topbar from "./components/Topbar";
import Footer from "./components/Footer";
import ShowMessage from "../../components/StatusMessage";

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 56,
    height: "100%",
  },
  content: {
    height: "100%",
  },
}));

const Main = (props) => {
  const { children } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Topbar />
      <main className={classes.content}>
        <ShowMessage></ShowMessage>
        {children}
      </main>
      <Footer />
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Main;
