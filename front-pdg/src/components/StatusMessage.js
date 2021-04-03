import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useDispatch } from "react-redux";
import { hideMessage } from "../actions/actionMessage";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const StatusMessage = (props) => {
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(hideMessage());
  };

  const showMsg = () => {
    return (
      <Snackbar
        open={props.errorMsg !== ""}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={props.errorType || "info"}>
          {props.errorMsg}
        </Alert>
      </Snackbar>
    );
  };
  return <>{showMsg()}</>;
};

StatusMessage.propTypes = {
  errorMsg: PropTypes.string.isRequired,
  errorType: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  console.log(state);
  return {
    errorMsg: state.reducerMessage.errorMsg,
    errorType: state.reducerMessage.errorType,
  };
}

export default connect(mapStateToProps, {})(StatusMessage);
