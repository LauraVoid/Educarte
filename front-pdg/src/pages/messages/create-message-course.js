import React from "react";
import { Grid, Box } from "@material-ui/core/";
//import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import bgd from "../../img/backgrounds/B6.png";
import FormCreateMessage from "../../components/messages/create-message-course";

// CSS OF THIS TEMPLATE
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  divContainer: {
    backgroundImage: `url(${bgd})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  boxContainer: {
    backgroundColor: "#2196f3",
    marginLeft: "5%",
    marginRight: "5%",
    marginBottom: "5%",
    borderRadius: "2em",
    padding: "2%",
  },
  title: {
    marginLeft: "3%",
  },
}));

const CreateMessageCourse = () => {
  const classes = useStyles();
  return (
    <div className={classes.divContainer}>
      <Grid container>
        <Grid item xs={12}>
          <h1 className={classes.title}>Crear mensaje</h1>
        </Grid>
      </Grid>
      <Grid container className={classes.root} justify="center">
        <Box
          className={classes.boxContainer}
          color="text.primary"
          justifyContent="center"
        >
          <FormCreateMessage></FormCreateMessage>
        </Box>
      </Grid>
    </div>
  );
};
const mapStateToProps = (state) => ({
  // instid: state.auth.instId,
});

CreateMessageCourse.propTypes = {
  // instid: PropTypes.any,
};
export default connect(mapStateToProps)(CreateMessageCourse);
