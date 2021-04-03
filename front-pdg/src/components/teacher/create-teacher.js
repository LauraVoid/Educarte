import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { Grid, TextField, Typography, Button } from "@material-ui/core/";
import SaveIcon from "@material-ui/icons/Save";
import axios from "../../utils/axios";
import { useDispatch } from "react-redux";
import { showMessage } from "../../actions/actionMessage";
import validate from "validate.js";

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

/* Validaciones para el formulario de crear profesor con la libreria Validate.js */
const teacher = {
  name: {
    presence: { allowEmpty: false, message: "El nombre es requerido" },
  },
  lastname: {
    presence: { allowEmpty: false, message: "El apellido es requerido" },
  },
  identification: {
    presence: { allowEmpty: false, message: "La identificación es requerida" },
  },
  cellphone: {
    presence: { allowEmpty: false, message: "El número es requerido" },
    format: {
      pattern: /^[+]?([0-9]+(?:[.][0-9]*)?|[0-9]+)$/,
      message: "Debe ser un número válido",
    },
    length: {
      maximum: 64,
      minimum: 1,
    },
  },
  email: {
    presence: { allowEmpty: false, message: "El correo es requerido" },
    email: true,
  },
};

const CreateTeacher = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [teacherState, setTeacherState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  /* Se ejecuta cada que se cambia un campo del formulario */
  const handleChange = (event) => {
    event.persist();

    setTeacherState((teacherState) => ({
      ...teacherState,
      values: {
        ...teacherState.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...teacherState.touched,
        [event.target.name]: true,
      },
    }));
  };

  /* Validar siempre que se llene un campo que esté bien */
  /* errors devuelve un array con todos los mensajes de los campos que tienen error.:) */
  useEffect(() => {
    const errors = validate(teacherState.values, teacher);
    setTeacherState((teacherState) => ({
      ...teacherState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [teacherState.values]);

  /* En este caso teacherState.errors[field] devuelve un array 
  así pues todo valor si existe, es verdadero, en caso contrario si es un NaN, undefined
  es falso. */
  const hasError = (field) => {
    return teacherState.touched[field] && teacherState.errors[field]
      ? true
      : false;
  };

  const handleSubmit = (event) => {
    let data = {
      ...teacherState.values,
      institutionId: 1,
    };

    axios.post(`teacher/`, data).then((res) => {
      if (res.status === 200) {
        let message = {
          errorMsg: "Profesor creado con éxito",
          errorType: "success",
        };
        dispatch(showMessage(message));
      } else {
        console.log("hubo un error al crear al profesor");
      }
    });
  };
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
                name="name"
                type="text"
                onChange={handleChange}
                error={hasError("name")}
                helperText={
                  hasError("name") ? "Debes ingresar un nombre" : null
                }
              />
            </Grid>
            <Grid item xs={12} className={classes.centrado}>
              <TextField
                className={classes.componentsItems}
                id="standard-basic"
                label="Apellidos"
                name="lastname"
                onChange={handleChange}
                error={hasError("lastname")}
                helperText={
                  hasError("lastname") ? "Debes ingresar los apellidos" : null
                }
              />
            </Grid>
            <Grid item xs={12} className={classes.centrado}>
              <TextField
                className={classes.componentsItems}
                id="standard-basic"
                label="N° de identificación"
                name="identification"
                onChange={handleChange}
                error={hasError("identification")}
                helperText={
                  hasError("identification")
                    ? "Debes ingresar un número de identificación"
                    : null
                }
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
                name="cellphone"
                onChange={handleChange}
                error={hasError("cellphone")}
                helperText={
                  hasError("cellphone")
                    ? "Debes ingresar un número de contacto"
                    : null
                }
              />
            </Grid>
            <Grid item xs={12} className={classes.centrado}>
              <TextField
                className={classes.componentsItems}
                id="standard-basic"
                label="Correo"
                name="email"
                onChange={handleChange}
                error={hasError("email")}
                helperText={
                  hasError("email") ? "Debes ingresar un correo válido" : null
                }
              />
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12} className={classes.centrado}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            endIcon={<SaveIcon></SaveIcon>}
            disabled={!teacherState.isValid}
            onClick={handleSubmit}
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
