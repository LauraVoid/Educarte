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
  Button,
} from "@material-ui/core/";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CommentIcon from "@material-ui/icons/Comment";
import ForumIcon from "@material-ui/icons/Forum";
import AddIcon from "@material-ui/icons/Add";
import axios from "../../../utils/axios";
import CircularProgress from "@material-ui/core/CircularProgress";

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

const StudentsTeacher = (props) => {
  const classes = useStyles();
  const [students, setStudents] = useState([]);
  const [viewProgress, setViewProgress] = useState(false);
  const { user, token } = props;

  useEffect(() => {
    console.log("Entre al useEffect");
    setViewProgress(true);
    if (students.length === 0) {
      axios
        .get(`/teacher/students/${user}`, {
          headers: {
            "x-access-token": token,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data[0]);
            setStudents(res.data[0]);
            setViewProgress(false);
          }
        })
        .catch(() => {
          setViewProgress(false);
        });
    }
  }, []);

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
              Mis Estudiantes
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <List className={classes.root}>
              {students.map((stud) => {
                return (
                  <ListItem key={`${stud.id}`} button alignItems="center">
                    <Grid container>
                      <Grid container xs={6}>
                        <Grid item xs={4}>
                          <ListItemIcon>
                            <AccountCircleIcon></AccountCircleIcon>
                          </ListItemIcon>
                        </Grid>
                        <Grid item xs={8}>
                          <ListItemText
                            id={`${stud.id}`}
                            primary={`${stud.name} ${stud.lastname}`}
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs={3}>
                        <ListItemSecondaryAction>
                          <IconButton edge="end" aria-label="comments">
                            <CommentIcon />
                          </IconButton>
                          <IconButton edge="end" aria-label="comments">
                            <ForumIcon />
                          </IconButton>
                          <IconButton edge="end" aria-label="comments">
                            <AddIcon />
                          </IconButton>
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
            <Button
              variant="contained"
              color="primary"
              size="small"
              endIcon={<AddIcon />}
              href="/teacherstudents/"
            >
              Ver m??s
            </Button>
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

StudentsTeacher.propTypes = {
  user: PropTypes.number,
  token: PropTypes.string,
};
export default connect(mapStateToProps)(StudentsTeacher);
