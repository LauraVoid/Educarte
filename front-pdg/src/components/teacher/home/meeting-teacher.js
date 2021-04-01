import React from "react";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Paper,
  Button,
  Card,
  CardContent,
} from "@material-ui/core/";
import AddIcon from "@material-ui/icons/Add";

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

const meetingTest = [
  { id: "1", title: "Matemáticas", date: "10/10/2021 7:00 am" },
  { id: "2", title: "Español", date: "10/10/2021 9:00 am" },
  { id: "3", title: "Naturales", date: "10/10/2021 11:00 am" },
];

const MeetingTeacher = () => {
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
              Mis Reuniones
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {meetingTest.map((meet) => {
              return (
                <Card className={classes.card}>
                  <Grid container>
                    <Grid item xs={6}>
                      <CardContent>
                        <Typography
                          className={classes.title}
                          color="textSecondary"
                          gutterBottom
                        >
                          {`${meet.title}`}
                        </Typography>
                      </CardContent>
                    </Grid>
                    <Grid item xs={6}>
                      <CardContent>
                        <Typography
                          className={classes.title}
                          color="textSecondary"
                          gutterBottom
                        >
                          {`${meet.date}`}
                        </Typography>
                      </CardContent>
                    </Grid>
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
            >
              Ver más
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => ({
  // instid: state.auth.instId,
});

MeetingTeacher.propTypes = {
  // instid: PropTypes.any,
};
export default connect(mapStateToProps)(MeetingTeacher);
