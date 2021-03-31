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
  title: {
    marginLeft: "5%",
    marginTop: "3%",
  },
}));

const CreateTeacher = () => {
  const classes = useStyles();
  return (
    <div>
      <Grid container className={classes.gridContainer}>
        <Grid item sm={12} xs={12}>
          <Typography variant="h6" color="initial" className={classes.title}>
            Datos del profesor:
          </Typography>
        </Grid>
        <Grid item sm={6}>
          <form className={classes.root}>
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
                label="N° de identificación"
              />
            </Grid>
          </form>
        </Grid>
        <Grid item sm={6}>
          <form className={classes.root}>
            <Grid item xs={12} className={classes.centrado}>
              <TextField
                className={classes.componentsItems}
                id="standard-basic"
                label="Celular"
              />
            </Grid>
            <Grid item xs={12} className={classes.centrado}>
              <TextField
                className={classes.componentsItems}
                id="standard-basic"
                label="Correo"
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

CreateTeacher.propTypes = {
  // instid: PropTypes.any,
};
export default connect(mapStateToProps)(CreateTeacher);
