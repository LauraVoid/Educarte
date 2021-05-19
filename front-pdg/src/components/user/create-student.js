import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import validate from "validate.js";
import PropTypes from "prop-types";
import { showMessage } from "../../actions/actionMessage";
import {
  Grid,
  TextField,
  Typography,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core/";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import axios from "../../utils/axios";
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
  select: {
    minWidth: "90%",
    marginLeft: "10%",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
  },
  date: {
    width: "95%",
    marginLeft: "8%",
  },
}));

const studentParentValidate = {
  nameStudent: {
    presence: { allowEmpty: false, message: "El nombre es requerido" },
  },
  lastNameStudent: {
    presence: { allowEmpty: false, message: "El apellido es requerido" },
  },
  documentStudent: {
    presence: { allowEmpty: false, message: "El registro es requerido" },
    length: {
      maximum: 64,
      minimum: 1,
    },
  },
  nameParent: {
    presence: { allowEmpty: false, message: "El nombre es requerido" },
  },
  lastNameParent: {
    presence: { allowEmpty: false, message: "El apellido es requerido" },
  },
  documentParent: {
    presence: { allowEmpty: false, message: "Este campo es requerido" },
    length: {
      maximum: 64,
      minimum: 1,
    },
  },
  email: {
    presence: { allowEmpty: false, message: "El correo es requerido" },
    email: true,
  },
  phone: {
    presence: { allowEmpty: false, message: "El correo es requerido" },
    format: {
      pattern: /^[+]?([0-9]+(?:[.][0-9]*)?|[0-9]+)$/,
      message: "Debe ser un número válido",
    },
    length: {
      maximum: 64,
      minimum: 1,
    },
  },
};

const CreateStudent = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [course, setCourse] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [courses, setCourses] = React.useState([]);
  const [studentParent, setStudentParent] = React.useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  const handleChange = (event) => {
    event.persist();

    setStudentParent((studentParent) => ({
      ...studentParent,
      values: {
        ...studentParent.values,
        [event.target.name]: event.target.value,
      },
      touched: {
        ...studentParent.touched,
        [event.target.name]: true,
      },
    }));
  };

  useEffect(() => {
    const errors = validate(studentParent.values, studentParentValidate);
    setStudentParent((studentParent) => ({
      ...studentParent,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [studentParent.values]);

  const hasError = (field) => {
    return studentParent.touched[field] && studentParent.errors[field]
      ? true
      : false;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  /* Date birthday */
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2018/08/18")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSelect = (event) => {
    setCourse(event.target.value);
  };

  /* All courses */
  useEffect(() => {
    if (courses.length === 0) {
      axios.get("/course/", {
        headers: {
          'x-access-token': props.token
        }
      }).then((res) => {
        setCourses(res.data);
      });
    }

    console.log(courses);
  }, [courses]);

  /*  Method to add a student */
  const handleSubmit = (event) => {
    let data = {
      nameParent: studentParent.values.nameParent,
      lastnameParent: studentParent.values.lastNameParent,
      idDocumentParent: studentParent.values.documentParent,
      email: studentParent.values.email,
      phone: studentParent.values.phone,
      institutionId: 1,

      nameStudent: studentParent.values.nameStudent,
      lastnameStudent: studentParent.values.lastNameStudent,
      idDocumentStudent: studentParent.values.documentStudent,
      username: studentParent.values.documentStudent,
      dateBirthday: selectedDate,
      courseId: course,
      roleId: 3,
    };

    axios
      .post("/student/", data)
      .then((res) => {
        if (res.status === 200) {
          let message = {
            errorMsg: "Estudiante y acudiente creado con éxito",
            errorType: "success",
          };
          dispatch(showMessage(message));
        }
      })
      .catch((error) => {
        let message2 = {
          errorMsg: "Ha ocurrido un error",
          errorType: "error",
        };
        dispatch(showMessage(message2));
      });
  };

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
                name="nameStudent"
                onChange={handleChange}
                error={hasError("nameStudent")}
                helperText={
                  hasError("nameStudent") ? "Debes ingresar un nombre" : null
                }
              />
            </Grid>
            <Grid item xs={12} className={classes.centrado}>
              <TextField
                className={classes.componentsItems}
                id="standard-basic"
                label="Apellidos"
                name="lastNameStudent"
                onChange={handleChange}
                error={hasError("lastNameStudent")}
                helperText={
                  hasError("lastNameStudent")
                    ? "Debes ingresar un apellido"
                    : null
                }
              />
            </Grid>
            <Grid item xs={12} className={classes.centrado}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  className={classes.date}
                  margin="normal"
                  id="date-picker-dialog"
                  label="Fecha de nacimiento"
                  format="dd/MM/yyyy"
                  value={selectedDate}
                  onChange={handleDateChange}
                  name="birthdayStudent"
                  invalidDateMessage="Fecha ingresada inválida"
                  maxDateMessage="La fecha ingresada es mayor a la fecha actual"
                  minDateMessage="La fecha ingresada es muy antigua"
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} className={classes.centrado}>
              <TextField
                className={classes.componentsItems}
                id="standard-basic"
                label="Registro de nacimiento"
                name="documentStudent"
                type="text"
                onChange={handleChange}
                error={hasError("documentStudent")}
                helperText={
                  hasError("documentStudent")
                    ? "Debes ingresar el número de documento"
                    : null
                }
              />
            </Grid>
            <Grid item xs={12} className={classes.centrado}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">
                  Curso al que pertenece
                </InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={open}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={course}
                  onChange={handleSelect}
                >
                  <MenuItem value={undefined}>
                    <em>Ninguno</em>
                  </MenuItem>
                  {courses.map((crs) => {
                    return (
                      <MenuItem key={crs.id} value={crs.id}>
                        {crs.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
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
                name="nameParent"
                onChange={handleChange}
                error={hasError("nameParent")}
                helperText={
                  hasError("nameParent") ? "Debes ingresar un nombre" : null
                }
              />
            </Grid>
            <Grid item xs={12} className={classes.centrado}>
              <TextField
                className={classes.componentsItems}
                id="standard-basic"
                label="Apellidos"
                name="lastNameParent"
                onChange={handleChange}
                error={hasError("lastNameParent")}
                helperText={
                  hasError("lastNameParent")
                    ? "Debes ingresar los apellidos"
                    : null
                }
              />
            </Grid>
            <Grid item xs={12} className={classes.centrado}>
              <TextField
                className={classes.componentsItems}
                id="standard-basic"
                label="N° de identificación"
                name="documentParent"
                onChange={handleChange}
                error={hasError("documentParent")}
                helperText={
                  hasError("documentParent")
                    ? "Debes ingresar un número de identificación"
                    : null
                }
              />
            </Grid>
            <Grid item xs={12} className={classes.centrado}>
              <TextField
                className={classes.componentsItems}
                id="standard-basic"
                label="Correo electrónico"
                name="email"
                onChange={handleChange}
                error={hasError("email")}
                helperText={
                  hasError("email") ? "Debes ingresar un correo válido" : null
                }
              />
            </Grid>
            <Grid item xs={12} className={classes.centrado}>
              <TextField
                className={classes.componentsItems}
                id="standard-basic"
                label="Número teléfonico"
                name="phone"
                onChange={handleChange}
                error={hasError("phone")}
                helperText={
                  hasError("phone")
                    ? "Debes ingresar un número de contacto"
                    : null
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
            endIcon={<SaveIcon></SaveIcon>}
            disabled={!studentParent.isValid}
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
  idInst: state.login.id,
  name: state.login.name,
  email: state.login.email,
  token: state.login.accessToken,
  
});

CreateStudent.propTypes = {
  idInst: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
  token: PropTypes.string

};
export default connect(mapStateToProps)(CreateStudent);
