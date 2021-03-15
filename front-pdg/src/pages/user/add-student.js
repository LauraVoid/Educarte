import React from "react";
import Grid from "@material-ui/core/Grid";
//import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const CreateStudent = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root} spacing={1}>
      <Grid item>HOLA</Grid>
    </Grid>
  );
};
const mapStateToProps = (state) => ({
  // instid: state.auth.instId,
});

CreateStudent.propTypes = {
  // instid: PropTypes.any,
};
export default connect(mapStateToProps)(CreateStudent);
