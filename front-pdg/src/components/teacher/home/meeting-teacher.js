import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Paper,
  Button,
  Card,
  CardContent,
  IconButton,
  Tooltip,
} from "@material-ui/core/";
import AddIcon from "@material-ui/icons/Add";
import PropTypes from "prop-types";
import axios from "../../../utils/axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useDispatch } from "react-redux";
import { showMessage } from "../../../actions/actionMessage";

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
  card: {
    width: "80%",
    justifyItems: "center",
    justifyContent: "center",
    marginLeft: "10%",
    marginBottom: "3%",
    marginTop: "2%",
  },
  progress: {
    position: "fixed",
    zIndex: 50,
    top: "50%",
    left: "50%",
  },
}));

const MeetingTeacher = (props) => {
  const classes = useStyles();
  const [meetings, setMeetings] = useState([]);
  const [viewProgress, setViewProgress] = useState(false);
  const [copy, setCopy] = useState(false);
  let dispatch = useDispatch();
  const { user, token } = props;

  useEffect(() => {
    setViewProgress(true);
    if (meetings.length === 0) {
      axios
        .get(`/meeting/${user}`, {
          headers: {
            "x-access-token": token,
          },
        })
        .then((res) => {
          console.log("Soy todo el res de meeting", res);
          console.log("Soy el data en prod", res.data);
          if (res.status === 200) {
            setMeetings(res.data);
            console.log(res.data);
            setViewProgress(false);
          }
        })
        .catch(() => {
          setViewProgress(false);
        });
    }
  }, []);

  useEffect(() => {
    if (copy) {
      let message = {
        errorMsg: "Enlace copiado",
        errorType: "success",
      };
      dispatch(showMessage(message));
      setCopy(false);
    }
  }, [copy]);

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
              Mis Reuniones
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {meetings.map((meet) => {
              return (
                <Card className={classes.card}>
                  <Grid container>
                    <Grid item xs={12} sm={3}>
                      <CardContent>
                        <Typography
                          className={classes.title}
                          color="textSecondary"
                          gutterBottom
                        >
                          {`${meet.name}`}
                        </Typography>
                      </CardContent>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <CardContent>
                        <Typography
                          className={classes.title}
                          color="textSecondary"
                          gutterBottom
                        >
                          {`${meet.date}` + " " + `${meet.time}`}
                        </Typography>
                      </CardContent>
                    </Grid>
                    {meet.isVirtual === "F" ? (
                      <Grid item xs={12} sm={4}>
                        <CardContent>
                          <Typography
                            className={classes.title}
                            color="textSecondary"
                            gutterBottom
                          >
                            Presencial
                          </Typography>
                        </CardContent>
                      </Grid>
                    ) : (
                      <></>
                    )}
                    {meet.isVirtual === "V" ? (
                      <Grid item xs={12} sm={2}>
                        <CardContent>
                          <Tooltip title="Copiar enlace" aria-label="add">
                            <CopyToClipboard
                              text={meet.link}
                              onCopy={() => setCopy(true)}
                            >
                              <IconButton edge="end" aria-label="comments">
                                <FileCopyIcon />
                              </IconButton>
                            </CopyToClipboard>
                          </Tooltip>
                        </CardContent>
                      </Grid>
                    ) : (
                      <></>
                    )}
                    {meet.isVirtual === "V" ? (
                      <Grid item xs={12} sm={2}>
                        <CardContent>
                          <Tooltip title="Iniciar reunión" aria-label="add">
                            <IconButton
                              edge="end"
                              href={meet.link}
                              target="_blank"
                              aria-label="comments"
                            >
                              <PlayCircleFilledWhiteIcon />
                            </IconButton>
                          </Tooltip>
                        </CardContent>
                      </Grid>
                    ) : (
                      <></>
                    )}
                  </Grid>
                </Card>
              );
            })}
          </Grid>
          <Grid item xs={12} className={classes.centrado}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              endIcon={<AddIcon />}
              href="/meetingsteacher"
            >
              Ver más
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

MeetingTeacher.propTypes = {
  user: PropTypes.number,
  token: PropTypes.string,
};
export default connect(mapStateToProps)(MeetingTeacher);
