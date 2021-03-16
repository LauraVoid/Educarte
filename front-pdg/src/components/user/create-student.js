import React from "react";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { Grid, TextField, Typography, Button } from "@material-ui/core/";

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
    margin: "2%",
  },
  buttonSave: {
    marginLeft: "45%",
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
            <TextField
              className={classes.componentsItems}
              id="standard-basic"
              label="Nombres"
            />
            <TextField
              className={classes.componentsItems}
              id="standard-basic"
              label="Apellidos"
            />
            <TextField
              className={classes.componentsItems}
              id="standard-basic"
              label="Fecha de nacimiento"
            />
            <TextField
              className={classes.componentsItems}
              id="standard-basic"
              label="Registro de nacimiento"
            />
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
            <TextField
              className={classes.componentsItems}
              id="standard-basic"
              label="Nombres"
            />
            <TextField
              className={classes.componentsItems}
              id="standard-basic"
              label="Apellidos"
            />
            <TextField
              className={classes.componentsItems}
              id="standard-basic"
              label="Número de identificación"
            />
            <TextField
              className={classes.componentsItems}
              id="standard-basic"
              label="Correo electrónico"
            />
          </form>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Button
              className={classes.buttonSave}
              variant="contained"
              color="primary"
              size="large"
            >
              Guardar
            </Button>
          </Grid>
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
