import React from "react";
import { Grid, Paper, Box, IconButton, InputBase } from "@material-ui/core/";
//import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import bgd from "../../img/backgrounds/B7.png";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import MessagesExplorer from "../../components/messages/list-messages-parent";
import NavMessage from "../../components/messages/nav-option-parent";

// CSS OF THIS TEMPLATE
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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

  boxSearch: {
    backgroundColor: "#ff784e",
    marginLeft: "5%",
    marginRight: "5%",
    marginBottom: "1%",
    borderRadius: "2em",
    padding: "2%",
    marginTop: "2%",
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
  paperStudents: {
    backgroundColor: "#ff9100",
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
    padding: "5%",
    width: "90%",
  },
}));

const MessageTeacher = () => {
  const classes = useStyles();
  return (
    <div className={classes.divContainer}>
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
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paperStudents} elevation={10}>
            <MessagesExplorer></MessagesExplorer>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paperMeeting} elevation={10}>
            <NavMessage></NavMessage>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
const mapStateToProps = (state) => ({
  // instid: state.auth.instId,
});

MessageTeacher.propTypes = {
  // instid: PropTypes.any,
};
export default connect(mapStateToProps)(MessageTeacher);
