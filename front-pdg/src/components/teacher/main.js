import { Card, CardContent, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import EventNoteIcon from "@material-ui/icons/EventNote";
import Typography from "@material-ui/core/Typography";
import PeopleIcon from "@material-ui/icons/People";
import SchoolIcon from "@material-ui/icons/School";
import Button from "@material-ui/core/Button";
import axios from "../../utils/axios";
import ForumIcon from "@material-ui/icons/Forum";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";
// import {useSelector} from "react-redux"
import "./style/teacher.css";
import { blue, yellow } from "@material-ui/core/colors";
import { dark } from "@material-ui/core/styles/createPalette";

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

const MainTeacher = (props) => {
  const dispatch = useDispatch();
  let history = useHistory();
  
  // const stateLogin = useSelector(state => state.login)
  const classes = useStyles();

  const [courses, setCourses] = useState([]);
  const [courSelected, setCourSelected] = React.useState({});
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [totalResults, setTotalResults] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [selected, setSelected] = React.useState([]);

  const [mainState, setMainState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  const getCourses = () => {
 
    axios
      .get("course/")
      .then((res) => {
        if (res.status === 200) {
          setCourses(res.data);
          console.log (props.institutionId)
        } else console.log(res.status);
      })
      .catch(() => {
        // dispatch(showMessage(message));
      });
  };

  useEffect(() => {

    getCourses();
   
  }, [page]);

  const handleClickActiveOpen = (row) => {
    setCourSelected(row);
    //setActiveOpen(true);
  };

  const handleClick = (event, name) => {};

  return (
    <div className="background1">
      <div style={{ padding: 20 }}>
        <h1>Bienvenido {props.name +" " + props.lastname}</h1>

        <div style={{ padding: 40, margin: 50 }}>
          <Grid
            container
            spacing={5}
            className="Grid-main-blue"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={6} sm={3} container direction="column">
              <IconButton
                variant="contained"
                color="primary"
                href="/createcourse"
              >
                <ForumIcon className={classes.largeIcon} color="action" />
              </IconButton>
              <Typography
                className="title"
                color="textSecondary"
                gutterBottom
                align="center"
              >
                Mis mensajes
                
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3} container direction="column">
              <IconButton
                variant="contained"
                color="primary"
                href="/createcourse"
              >
                <EventNoteIcon className={classes.largeIcon} color="action" />
              </IconButton>
              <Typography
                className="title"
                color="textSecondary"
                gutterBottom
                align="center"
              >
                Ver tareas
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3} container direction="column">
              <IconButton
                variant="contained"
                color="primary"
                href="/createcourse"
              >
                <PeopleIcon className={classes.largeIcon} color="action" />
              </IconButton>
              <Typography
                className="title"
                color="textSecondary"
                gutterBottom
                align="center"
              >
                Crear reunión
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3} container direction="column">
              <IconButton
                variant="contained"
                color="primary"
                href="/createcourse"
              >
                <SchoolIcon className={classes.largeIcon} color="action" />
              </IconButton>
              <Typography
                className="title"
                color="textSecondary"
                gutterBottom
                align="center"
              >
                Explorar material
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
                <Card></Card>
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
                      Reuniones
                    </Typography>

                    <Card>
                      <CardContent>
                        <Typography
                          className={classes.title}
                          color="textSecondary"
                          gutterBottom
                        >
                          Reunion lunes 21
                        </Typography>
                      </CardContent>
                    </Card>
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

const mapStateToProps = (state) => ({
  institutionId: state.login.institutionId,
  id: state.login.id,
  name: state.login.name,
  lastname: state.login.lastname,
  
  // instid: state.auth.instId,
});

MainTeacher.propTypes = {
  institutionId: PropTypes.number,
  id: PropTypes.number,
  name: PropTypes.string,
  lastname: PropTypes.string,
  //instid: PropTypes.any,
};

export default connect(mapStateToProps, {})(MainTeacher);
