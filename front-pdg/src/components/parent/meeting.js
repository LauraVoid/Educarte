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
  {
    id: "1",
    title: "Matemáticas",
    date: "03/07/2021 7:00 am",
    presencial: true,
  },
  { id: "2", title: "Español", date: "04/07/2021 9:00 am", presencial: true },
];

const MeetingStudent = () => {
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
            {meetingTest.map((meet) => {
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
                          {`${meet.title}`}
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
                          {`${meet.date}`}
                        </Typography>
                        <Typography
                          className={classes.title}
                          color="textSecondary"
                          gutterBottom
                        >
                          {meet.presencial ? "Presencial" : "Virtual"}
                        </Typography>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              );
            })}
          </Grid>
          {/*           <Grid item xs={12} className={classes.centrado}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              endIcon={<AddIcon />}
            >
              Ver más
            </Button>
          </Grid> */}
        </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => ({
  // instid: state.auth.instId,
});

MeetingStudent.propTypes = {
  // instid: PropTypes.any,
};
export default connect(mapStateToProps)(MeetingStudent);
