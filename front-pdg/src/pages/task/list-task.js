import React from "react";
import { Grid, Box, Button } from "@material-ui/core/";
//import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import bgd from "../../img/backgrounds/B7.png";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import TableTask from "../../components/task/table-task";

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
  boxSearch: {
    backgroundColor: "#ff784e",
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

const TaskExplorer = () => {
  const classes = useStyles();
  return (
    <div className={classes.divContainer}>
      <Grid container>
        <Grid item xs={12} sm={12}>
          <h1 className={classes.title}>Gestionar tareas</h1>
        </Grid>
      </Grid>
      <Grid container className={classes.root} justify="center">
        <Grid item xs={12} sm={12}>
          <Box
            className={classes.boxSearch}
            color="text.primary"
            justifyContent="center"
          >
            <Grid item xs={12} sm={12}>
              <Paper component="form" className={classes.root2}>
                <IconButton className={classes.iconButton} aria-label="menu">
                  <MenuIcon />
                </IconButton>
                <InputBase
                  className={classes.input}
                  placeholder="Filtrar por "
                  inputProps={{ "aria-label": "search google maps" }}
                />
                <IconButton
                  type="submit"
                  className={classes.iconButton}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Box
            className={classes.boxContainer}
            color="text.primary"
            justifyContent="center"
          >
            <div className={classes.sectionDesktop}>
              <Grid item xs={12} className={classes.createStudent}>
                <Button variant="contained" color="primary" href="/createtask">
                  Crear +
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
              <TableTask></TableTask>
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

TaskExplorer.propTypes = {
  // instid: PropTypes.any,
};
export default connect(mapStateToProps)(TaskExplorer);
