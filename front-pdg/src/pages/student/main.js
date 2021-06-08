import React from "react";
import { Grid, Paper } from "@material-ui/core/";
//import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import bgd from "../../img/backgrounds/B7.png";
import BannerStudent from "../../components/student/main/banner";
import Meeting from "../../components/student/main/meeting";

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

const HomeParent = () => {
  const classes = useStyles();
  return (
    <div className={classes.divContainer}>
      <Grid container className={classes.root} justify="center">
        <Paper className={classes.paperBanner} elevation={10}>
          <BannerStudent></BannerStudent>
        </Paper>        
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paperMeeting} elevation={10}>
            <Meeting></Meeting>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
const mapStateToProps = (state) => ({

});

HomeParent.propTypes = {
  
};
export default connect(mapStateToProps)(HomeParent);
