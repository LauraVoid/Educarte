import { Card, CardContent, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";

import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import PeopleIcon from "@material-ui/icons/People";
import SchoolIcon from "@material-ui/icons/School";
import Paper from '@material-ui/core/Paper';
import Accordion from '@material-ui/core/Accordion';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import axios from "../../utils/axios";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import IconButton from "@material-ui/core/IconButton";
import "./style/institution.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    height: "100%",
  },
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  contentHeader: {
    display: "flex",
    alignItems: "center",
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  contentBody: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  title: {
    marginTop: theme.spacing(3),
  },
  createButton: {
    marginTop: theme.spacing(20),
    width: 200,
    // marginLeft: theme.spacing(25),
  },
  gridForm: {
    marginTop: theme.spacing(20),
  },
  gridButton: {
    marginTop: theme.spacing(10),
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
    },
  },
  textField: {
    width: 142,
  },
  largeIcon: {
    width: 60,
    height: 60,
  },
  card: {
    // Provide some spacing between cards
    width: 580,
    margin: 16,
  },
}));

const MainInstitution = () => {
  const classes = useStyles();

  const [mainState, setMainState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  return (
    <div className="background1">
      <div style={{ padding: 20 }}>
        <h1>Bienvenido</h1>

        <div style={{ padding: 40, margin: 50 }}>
          <Grid
            container
            spacing={5}
            className="Grid-main-blue"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={6} sm={4} container direction="column">
              <IconButton variant="contained" color="primary" href="/courses">
                <HomeWorkIcon className={classes.largeIcon} color="action" />
              </IconButton>
              <Typography
                className="title"
                color="textSecondary"
                gutterBottom
                align="center"
              >
                Ver cursos
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4} container direction="column">
              <IconButton variant="contained" color="primary" href="/teachers">
                <PeopleIcon className={classes.largeIcon} color="action" />
              </IconButton>
              <Typography
                className="title"
                color="textSecondary"
                gutterBottom
                align="center"
              >
                Ver profesores
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4} container direction="column">
              <IconButton variant="contained" color="primary" href="/students">
                <SchoolIcon className={classes.largeIcon} color="action" />
              </IconButton>
              <Typography
                className="title"
                color="textSecondary"
                gutterBottom
                align="center"
              >
                Ver estudiantes:
              </Typography>
            </Grid>
          </Grid>
          <div style={{ margin: 20 }}>
            {/* wrap="nowrap" */}
            <Grid container spacing={3} className={classes.root}>
              <Grid item xs={12} md={12}>
                <br></br>
                <br></br>
              </Grid>

              <Grid item xs={12} sm={6} container className="Grid-main-purple">
                <Card className={classes.card}>
                  <CardContent>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      Estadisticas
                    </Typography>
                    <Paper elevation={3} >
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography className={classes.heading}>Estudiantes</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
          </Typography>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel2a-content"
                          id="panel2a-header"
                        >
                          <Typography className={classes.heading}>Docentes</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
          </Typography>
                        </AccordionDetails>
                      </Accordion>

                    </Paper>
                  </CardContent>
                </Card>
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                container
                wrap="nowrap"
                className="Grid-main-green"
              >
                <Card className={classes.card}>
                  <CardContent>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      Mensajes pendientes
                    </Typography>
                    <Paper elevation={3} >
                      <Card className={classes.root}>
                        <CardContent>
                          <Typography className={classes.title} color="textSecondary" gutterBottom >
                            Ana maria Restrepo
                            </Typography>
                          <Typography className={classes.pos} color="textSecondary">
                            profesor
                          </Typography>

                        </CardContent>
                        
                      </Card>
                    </Paper>

                    <Paper elevation={3} >
                      <Card className={classes.root}>
                        <CardContent>
                          <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Pedro Mejia
                            </Typography>
                          <Typography className={classes.pos} color="textSecondary">
                            acudiente
                          </Typography>

                        </CardContent>
                        
                      </Card>
                    </Paper>
                  </CardContent>
                </Card>

              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => (
  console.log(state), {

    id: state.login.id,
    name: state.login.name,
    email: state.login.email,
    // instid: state.auth.instId,
  });

MainInstitution.propTypes = {

  id: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
  //instid: PropTypes.any,
};

export default connect(mapStateToProps, {})(MainInstitution);
