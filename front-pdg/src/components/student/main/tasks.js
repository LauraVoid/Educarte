import React, { useState, useEffect }  from "react";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Grid,
  Typography,
  Paper,
  Card,
  CardContent,
} from "@material-ui/core/";
import axios from '../../../utils/axios';


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



const Student = (props) => {

  const [tasks, setTasks] = useState([]);
  const [reload, setReload] = useState(false)

  useEffect(() => {
    
      axios
        .get(`homework/course/`+props.courseId)
        .then((res) => {

          if (res.status >= 200 && res.status <300){
            setTasks(res.data);

          } 
          else console.log(res.status);
        })
        .catch((err) => console.log(err));
    

  },[reload]);
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
              Tareas
            </Typography>
          </Grid>
          <Grid item xs={12}>
          <Card className={classes.card}>
          {tasks.map((task) => {
              return (
                <Grid container>
                <Grid item xs={12} sm={6}>
                  <CardContent>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      {task.title}
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
                      {task.message}
                    </Typography>
                  
                  </CardContent>
                </Grid>                
              </Grid>
                
              );
            })}
                 
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
    courseId: state.login.courseId,
  
});

Student.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
  token: PropTypes.string,
  courseId: PropTypes.number,

};
export default connect(mapStateToProps)(Student);
