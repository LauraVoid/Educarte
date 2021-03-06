import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { Grid, Typography, Paper, Card, CardContent } from "@material-ui/core/";
import PropTypes from "prop-types";
import axios from "../../../utils/axios";

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
}));

const MeetingStudent = (props) => {
  const [meeting, setMeeting] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios
      .get(`meeting/find/` + props.courseId)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          setMeeting(res.data);
        } else console.log(res.status);
      })
      .catch((err) => console.log(err));
  }, [reload]);
  const classes = useStyles();
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
              Reuniones
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {meeting.map((meet) => {
              return (
                <Card className={classes.card}>
                  <Grid container>
                    <Grid item xs={12} sm={6}>
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
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography
                          className={classes.title}
                          color="textSecondary"
                          gutterBottom
                        >
                          {`${meet.date + " - " + meet.time}`}
                        </Typography>
                        <Typography
                          className={classes.title}
                          color="textSecondary"
                          gutterBottom
                        >
                          {meet.isVirtual === "F" ? "Presencial" : "Virtual"}
                        </Typography>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              );
            })}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => ({
  id: state.login.id,
  name: state.login.name,
  email: state.login.email,
  token: state.login.accessToken,
  courseId: state.login.courseId,
});

MeetingStudent.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
  token: PropTypes.string,
  courseId: PropTypes.number,
};
export default connect(mapStateToProps)(MeetingStudent);
