import React from "react";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { Grid, TextField, Typography, Button } from "@material-ui/core/";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  gridContainer: {
    backgroundColor: "white",
    borderRadius: "2em",
  },
  componentsItems: {
    marginLeft: "10%",
    marginBottom: "10%",
  },
  buttonSave: {
    marginLeft: "45%",
    marginBottom: "2%",
  },
  centrado: {
    textAlign: "center",
    justifyItems: "center",
    marginBottom: "2%",
  },
}));

const CreateStudent = () => {
  const classes = useStyles();
  return (
    <div>
      <Grid container className={classes.gridContainer}>
        <Grid item sm={6}>
          <form className={classes.root}>
            <Typography
              className={classes.componentsItems}
              variant="h6"
              color="initial"
            >
              Datos del estudiante:
            </Typography>
            <Grid item xs={12} className={classes.centrado}>
              <TextField
                className={classes.componentsItems}
                id="standard-basic"
                label="Nombres"
              />
            </Grid>
            <Grid item xs={12} className={classes.centrado}>
              <TextField
                className={classes.componentsItems}
                id="standard-basic"
                label="Apellidos"
              />
            </Grid>
            <Grid item xs={12} className={classes.centrado}>
              <TextField
                className={classes.componentsItems}
                id="standard-basic"
                label="Fecha de nacimiento"
              />
            </Grid>
            <Grid item xs={12} className={classes.centrado}>
              <TextField
                className={classes.componentsItems}
                id="standard-basic"
                label="Registro de nacimiento"
              />
            </Grid>
          </form>
        </Grid>
        <Grid item sm={6}>
          <form className={classes.root}>
            <Typography
              className={classes.componentsItems}
              variant="h6"
              color="initial"
            >
              Datos del acudiente:
            </Typography>
            <Grid item xs={12} className={classes.centrado}>
              <TextField
                className={classes.componentsItems}
                id="standard-basic"
                label="Nombres"
              />
            </Grid>
            <Grid item xs={12} className={classes.centrado}>
              <TextField
                className={classes.componentsItems}
                id="standard-basic"
                label="Apellidos"
              />
            </Grid>
            <Grid item xs={12} className={classes.centrado}>
              <TextField
                className={classes.componentsItems}
                id="standard-basic"
                label="Número de identificación"
              />
            </Grid>
            <Grid item xs={12} className={classes.centrado}>
              <TextField
                className={classes.componentsItems}
                id="standard-basic"
                label="Correo electrónico"
              />
            </Grid>
            <Grid item xs={12} className={classes.centrado}>
              <TextField
                className={classes.componentsItems}
                id="standard-basic"
                label="Número teléfonico"
              />
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12} className={classes.centrado}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            endIcon={<SaveIcon></SaveIcon>}
          >
            Guardar
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  // instid: state.auth.instId,
});

CreateStudent.propTypes = {
  // instid: PropTypes.any,
};
export default connect(mapStateToProps)(CreateStudent);
