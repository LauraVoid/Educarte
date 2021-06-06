import React from "react";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Paper,
} from "@material-ui/core/";


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
}));



const Student = () => {
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
              Información de
            </Typography>
          </Grid>
          <Grid item xs={12}>
          <Card className={classes.card}>
                  <Grid container>
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography
                          className={classes.title}
                          color="textSecondary"
                          gutterBottom
                        >
                          Titulo
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
                          Nombre
                        </Typography>
                      
                      </CardContent>
                    </Grid>
                    
                  </Grid>
                </Card>
            
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
    studentId: state.login.studentId,
});

Student.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
  token: PropTypes.string,
  studentId: PropTypes.number,
};
export default connect(mapStateToProps)(Student);
