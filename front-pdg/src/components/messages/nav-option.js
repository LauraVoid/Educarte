import React from "react";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { Grid, Typography, Paper, Button } from "@material-ui/core/";

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
    marginBottom: "20%",
    marginTop: "10%",
  },
  button: {
    height: "150%",
  },
}));

const studentTest = [
  { id: "1", name: "Pepito", lastname: "Perez" },
  { id: "2", name: "Laura Eustaquia", lastname: "Rubio" },
  { id: "3", name: "David Pancrasio", lastname: "Huertas" },
  { id: "4", name: "Douglas", lastname: "Lopez" },
  { id: "5", name: "Juanma", lastname: "Cecilia" },
  { id: "6", name: "David Fides", lastname: "Obando" },
];

const NavMessage = () => {
  const classes = useStyles();
  return (
    <div>
      <Paper>
        <Grid container>
          <Grid item xs={12} sm={12} alignContent="center" alignItems="center">
            <Typography
              variant="h5"
              style={{ color: "black" }}
              className={classes.title}
              align="center"
            >
              Herramientas
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.centrado}>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              size="large"
            >
              Mostrar no leídos
            </Button>
          </Grid>
          <Grid item xs={12} className={classes.centrado}>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              size="large"
              href="/createmessagecourse"
            >
              Enviar mensaje al curso
            </Button>
          </Grid>
          <Grid item xs={12} className={classes.centrado}>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              size="large"
              href="/createmessageparent"
            >
              Enviar mensaje al padre
            </Button>
          </Grid>
          <Grid item xs={12} className={classes.centrado}>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              size="large"
            >
              Vaciar bandeja
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

NavMessage.propTypes = {
  // instid: PropTypes.any,
};
export default connect(mapStateToProps)(NavMessage);
