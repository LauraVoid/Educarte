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
    minWidth: "50%",
  },
  date: {
    width: "50%",
  },
}));

const studentValidate = {
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
};

const EditStudent = (props) => {
  const { studentSelected, handleReload, closeEdit } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [course, setCourse] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [courses, setCourses] = React.useState([]);
  const [studentState, setStudentState] = React.useState({
    isValid: false,
    values: {
      id: studentSelected.id,
      documentStudent: studentSelected.idDocument,
      nameStudent: studentSelected.name,
      lastNameStudent: studentSelected.lastname,
      courseId: studentSelected.courseId,
    },
    touched: {},
    errors: {},
  });

  useEffect(() => {
    if (courses.length === 0) {
      axios.get(`/course/${studentSelected.courseId}`).then((res) => {
        setCourse(res.data.id);
      });
    }
  }, [studentSelected]);

  const handleChange = (event) => {
    event.persist();

    setStudentState((studentState) => ({
      ...studentState,
      values: {
        ...studentState.values,
        [event.target.name]: event.target.value,
      },
      touched: {
        ...studentState.touched,
        [event.target.name]: true,
      },
    }));
  };

  useEffect(() => {
    const errors = validate(studentState.values, studentValidate);
    setStudentState((studentState) => ({
      ...studentState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [studentState.values]);

  const hasError = (field) => {
    return studentState.touched[field] && studentState.errors[field]
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
      axios.get("/course/").then((res) => {
        setCourses(res.data);
      });
    }
  }, [courses]);

  /*  Method to add a student */
  const handleSubmit = (event) => {
    let data = {
      id: studentState.values.id,
      nameStudent: studentState.values.nameStudent,
      lastnameStudent: studentState.values.lastNameStudent,
      idDocumentStudent: studentState.values.documentStudent,
      dateBirthday: selectedDate,
      courseId: course,
      roleId: 3,
    };
    handleReload();
    axios
      .put(`/student/${data.id}`, data)
      .then((res) => {
        if (res.status === 200) {
          let message = {
            errorMsg: "Estudiante actualizado con éxito",
            errorType: "success",
          };
          dispatch(showMessage(message));
          handleReload();
          closeEdit();
        }
      })
      .catch((error) => {
        let message2 = {
          errorMsg: "Ha ocurrido un error. Inténtalo de nuevo",
          errorType: "error",
        };
        dispatch(showMessage(message2));
        closeEdit();
      });
  };

  return (
    <div>
      <Grid
        container
        alignItems="center"
        alignContent="center"
        justify="center"
      >
        <Grid item sm={12} className={classes.centrado}>
          <form>
            <Grid
              item
              xs={12}
              alignContent="center"
              className={classes.centrado}
            >
              <TextField
                id="standard-basic"
                label="Nombres"
                name="nameStudent"
                onChange={handleChange}
                error={hasError("nameStudent")}
                defaultValue={studentSelected.name}
                helperText={
                  hasError("nameStudent") ? "Debes ingresar un nombre" : null
                }
              />
            </Grid>
            <Grid item xs={12} className={classes.centrado}>
              <TextField
                id="standard-basic"
                label="Apellidos"
                defaultValue={studentSelected.lastname}
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
                  value={studentSelected.dateBirthday}
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
                id="standard-basic"
                label="Registro de nacimiento"
                name="documentStudent"
                type="text"
                defaultValue={studentSelected.idDocument}
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
                  key={course.id}
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
        <Grid item xs={12} className={classes.centrado}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            endIcon={<SaveIcon></SaveIcon>}
            disabled={!studentState.isValid}
            onClick={handleSubmit}
          >
            ACTUALIZAR
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  // instid: state.auth.instId,
});

EditStudent.propTypes = {
  studentSelected: PropTypes.any,
  handleReload: PropTypes.func.isRequired,
  reload: PropTypes.any,
  closeEdit: PropTypes.func.isRequired,
};
export default connect(mapStateToProps)(EditStudent);
