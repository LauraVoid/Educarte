import React from "react";
import { Grid, Box, Button } from "@material-ui/core/";
//import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import bgd from "../../img/backgrounds/B7.png";
import TableStudent from "../../components/student/table-student";

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
}));

const StudentExplorer = () => {
  const classes = useStyles();
  return (
    <div className={classes.divContainer}>
      <Grid container>
        <Grid item xs={12} sm={12}>
          <h1 className={classes.title}>Gestionar estudiantes</h1>
        </Grid>
      </Grid>
      <Grid container className={classes.root} justify="center">
        <Grid item xs={12} sm={12}>
          <Box
            className={classes.boxContainer}
            color="text.primary"
            justifyContent="center"
          >
            <div className={classes.sectionDesktop}>
              <Grid item xs={12} className={classes.createStudent}>
                <Button
                  variant="contained"
                  color="primary"
                  href="/createstudent"
                >
                  Agregar +
                </Button>
              </Grid>
            </div>
            <div className={classes.sectionMobile}>
              <Grid item xs={12} className={classes.createStudent}>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  href="/createstudent"
                >
                  Agregar +
                </Button>
              </Grid>
            </div>

            <Grid item xs={12} sm={12}>
              <TableStudent></TableStudent>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};
const mapStateToProps = (state) => ({
  // instid: state.auth.instId,
});

StudentExplorer.propTypes = {
  // instid: PropTypes.any,
};
export default connect(mapStateToProps)(StudentExplorer);
