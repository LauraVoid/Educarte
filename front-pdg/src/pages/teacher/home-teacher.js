import React from "react";
import { Grid, Box, Button, Paper } from "@material-ui/core/";
//import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import bgd from "../../img/backgrounds/B7.png";
import BannerTeacher from "../../components/teacher/home/main-banner";
import StudentsTeacher from "../../components/teacher/home/students-teacher";
import MeetingTeacher from "../../components/teacher/home/meeting-teacher";

// CSS OF THIS TEMPLATE
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  root2: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  divContainer: {
    backgroundImage: `url(${bgd})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  boxContainer: {
    backgroundColor: "#9c27b0",
    marginLeft: "5%",
    marginRight: "5%",
    marginBottom: "5%",
    borderRadius: "2em",
    padding: "2%",
  },

  title: {
    marginLeft: "3%",
  },
  createStudent: {
    marginBottom: "3%",
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    marginLeft: "4%",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  paperBanner: {
    backgroundColor: "#2196f3",
    marginLeft: "5%",
    marginRight: "5%",
    marginBottom: "3%",
    borderRadius: "2em",
    marginTop: "2%",
    padding: "2%",
    width: "100%",
  },
  paperStudents: {
    backgroundColor: "#d500f9",
    marginLeft: "5%",
    marginRight: "5%",
    marginBottom: "3%",
    borderRadius: "2em",
    marginTop: "2%",
    padding: "2%",
    width: "90%",
  },
  paperMeeting: {
    backgroundColor: "#00e676",
    marginLeft: "5%",
    marginRight: "5%",
    marginBottom: "3%",
    borderRadius: "2em",
    marginTop: "2%",
    padding: "2%",
    width: "90%",
  },
}));

const HomeTeacher = () => {
  const classes = useStyles();
  return (
    <div className={classes.divContainer}>
      <Grid container className={classes.root} justify="center">
        <Paper className={classes.paperBanner} elevation={10}>
          <BannerTeacher></BannerTeacher>
        </Paper>
        <Grid item xs={6}>
          <Paper className={classes.paperStudents} elevation={10}>
            <StudentsTeacher></StudentsTeacher>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paperMeeting} elevation={10}>
            <MeetingTeacher></MeetingTeacher>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
const mapStateToProps = (state) => ({
  // instid: state.auth.instId,
});

HomeTeacher.propTypes = {
  // instid: PropTypes.any,
};
export default connect(mapStateToProps)(HomeTeacher);
