import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Grid,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Tooltip,
} from "@material-ui/core/";
import ListAltIcon from "@material-ui/icons/ListAlt";
import AddIcon from "@material-ui/icons/Add";
import axios from "../../utils/axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import TablePagination from "@material-ui/core/TablePagination";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    marginTop: "3%",
  },
  centrado: {
    textAlign: "center",
    justifyItems: "center",
    marginBottom: "2%",
  },
  progress: {
    position: "fixed",
    zIndex: 50,
    top: "50%",
    left: "50%",
  },
}));

const TasksStudent = (props) => {
  const classes = useStyles();
  const [tasks, setTasks] = useState([]);
  const [viewProgress, setViewProgress] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [totalResults, setTotalResults] = React.useState(0);
  const [reload, setReload] = React.useState(false);
  const { user, token } = props;

  const getTasks = () => {
    setViewProgress(true);
    axios
      .get(`/homework/parent/${user}?page=${page}&&limit=${rowsPerPage}`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setTasks(res.data);
          setViewProgress(false);
        }
      })
      .catch(() => {
        setViewProgress(false);
      });
  };

  const getNumOfTasks = () => {
    let route = `/homework/parent/count/${user}`;
    axios
      .get(route, {
        headers: {
          "x-access-token": props.token,
        },
      })
      .then((response) => {
        setTotalResults(response.data.total);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getNumOfTasks();
    getTasks();
  }, [page, rowsPerPage]);

  useEffect(() => {
    getNumOfTasks();
    getTasks();
  }, [reload]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const numOfPages = () => {
    return Math.ceil(totalResults / rowsPerPage);
  };

  return (
    <div>
      <Paper>
        <Grid container>
          <Grid item xs={12} alignContent="center" alignItems="center">
            <Typography
              variant="h5"
              style={{ color: "black" }}
              className={classes.title}
              align="center"
            >
              Tareas
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <List className={classes.root}>
              {tasks.map((stud) => {
                return (
                  <ListItem key={`${stud.id}`} button alignItems="center">
                    <Grid container>
                      <Grid container xs={6}>
                        <Grid item xs={2}>
                          <ListItemIcon>
                            <ListAltIcon></ListAltIcon>
                          </ListItemIcon>
                        </Grid>
                        <Grid item xs={10}>
                          <ListItemText
                            id={`${stud.id}`}
                            primary={`${stud.title}`}
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs={3}>
                        <ListItemSecondaryAction>
                          <Tooltip title="Enviar tarea" aria-label="add">
                            <IconButton edge="end" aria-label="comments">
                              <AddIcon />
                            </IconButton>
                          </Tooltip>
                        </ListItemSecondaryAction>
                      </Grid>
                    </Grid>
                    <Divider></Divider>
                  </ListItem>
                );
              })}
            </List>
          </Grid>
          <Grid item xs={12} className={classes.centrado}>
            <TablePagination
              style={{ fontSize: "14px" }}
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalResults}
              labelRowsPerPage="Filas por página:"
              labelDisplayedRows={() =>
                (totalResults === 0 ? 0 : page + 1) +
                " de " +
                numOfPages() +
                " páginas"
              }
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Grid>
        </Grid>
        {viewProgress ? (
          <CircularProgress className={classes.progress}></CircularProgress>
        ) : (
          <></>
        )}
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.login.id,
  token: state.login.accessToken,
});

TasksStudent.propTypes = {
  user: PropTypes.number,
  token: PropTypes.string,
};
export default connect(mapStateToProps)(TasksStudent);
