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

const courseValidate = {
  nameCourse: {
    presence: { allowEmpty: false, message: "El nombre es requerido" },
  },
  
};

const EditCourse = (props) => {
  const { courseSelected, handleReload, closeEdit,instId } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [teacher, setTeacher] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [teachers, setTeachers] = React.useState([]);
  const [courseState, setCourseState] = React.useState({
    isValid: false,
    values: {
      courseId: courseSelected.courseId,
      teacherId: courseSelected.teacherId,
      nameCourse: courseSelected.nameCourse,
      
    },
    touched: {},
    errors: {},
  });


  const handleChange = (event) => {
    // event.persist();

    setCourseState((courseState) => ({
      ...courseState,
      values: {
        ...courseState.values,
        [event.target.name]: event.target.value,
      },
      touched: {
        ...courseState.touched,
        [event.target.name]: true,
      },
    }));
  };

  useEffect(() => {
    const errors = validate(courseState.values, courseValidate);
    setCourseState((courseState) => ({
      ...courseState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [courseState.values]);

  const hasError = (field) => {
    return courseState.touched[field] && courseState.errors[field]
      ? true
      : false;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };


  const handleSelect = (event) => {   
    console.log(event.target.value)
    setTeacher(event.target.value);

  };

  /* All teachers */
  useEffect(() => {
    if (teachers.length === 0) {
      axios.get(`teacher/all/`+instId).then((res) => {
        setTeachers(res.data);
      });
    }
  }, [teachers]);

  /*  Method to add a student */
  const handleSubmit = (event) => {
    let data = {
      id: courseState.values.courseId,
      name: courseState.values.nameCourse,
      teacherId: teacher === 0? courseSelected.teacherId:teacher
      
    };
    // handleReload();
   
    axios
      .put(`/course/${data.id}`, data, {
        headers: {
          'x-access-token': props.token
        }
      })
      .then((res) => {
        if (res.status >= 200 && res.status <300) {
          let message = {
            errorMsg: "Curso actualizado con éxito",
            errorType: "success",
          };
          dispatch(showMessage(message));
          handleReload();
          closeEdit();
        }
      })
      .catch((err) => {
        let message2 = {
          errorMsg: "",
          errorType: "error",
        };
        {
          if (err.message.includes("403")) {
             message2 = {
              errorMsg: "Forbidden",
            };         

          } 
          else if(err.message.includes("401")){
             message2 = {
              errorMsg: "Unauthorized",
            }; 

          }
          else{
            message2 = {
              errorMsg: "Ha ocurrido un error",
            }; 
          }
        }        
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
              className={classes.centrado}
            >
              <TextField
                id="standard-basic"
                label="Nombre"
                name="nameCourse"
                onChange={handleChange}
                error={hasError("nameCourse")}
                defaultValue={courseSelected.nameCourse}
                helperText={
                  hasError("nameCourse") ? "Debes ingresar un nombre" : null
                }
              />
            </Grid>
           
            <Grid item xs={12} className={classes.centrado}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">
                 Profesor del curso
                </InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={open}
                  key={teacher.id}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={teacher}
                  onChange={handleSelect}
                >
                  <MenuItem key= {courseSelected.teacherId} value={courseSelected.teacherId}>
                    <em>{courseSelected.teacherName}</em>
                  </MenuItem>
                  {teachers.map((crs) => {
                    return (
                      <MenuItem key={crs.id} value={crs.id}>
                        {crs.name }
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
            disabled={!courseState.isValid}
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
  token: state.login.accessToken
});

EditCourse.propTypes = {
  courseState: PropTypes.any,
  closeEdit: PropTypes.func.isRequired,
  token: PropTypes.string,
};
export default connect(mapStateToProps)(EditCourse);
