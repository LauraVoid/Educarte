import React from "react";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
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
}));

const studentTest = [
  { id: "1", name: "Clase ed. Fisica", lastname: "08:00am" },
  { id: "2", name: "Pintura", lastname: "11:00am" },
  { id: "3", name: "Natación", lastname: "11:00am" },
  { id: "4", name: "Clase nuevos estudiantes", lastname: "09:00am" },
];

const StudentsTeacher = () => {
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
              Reuniones presenciales programadas
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <List className={classes.root}>
              {studentTest.map((stud) => {
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

StudentsTeacher.propTypes = {
  // instid: PropTypes.any,
};
export default connect(mapStateToProps)(StudentsTeacher);
