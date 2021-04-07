import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import validate from "validate.js";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./style/create-course.css";
//import { useHistory } from "react-router-dom";
import axios from "../../utils/axios";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: "100%",
  },
  grid: {
    height: "100%",
  },
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  contentHeader: {
    display: "flex",
    alignItems: "center",
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  contentBody: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  title: {
    marginTop: theme.spacing(3),
  },
  createButton: {
    marginTop: theme.spacing(20),
    width: 200,
    // marginLeft: theme.spacing(25),
  },
  gridForm: {
    marginTop: theme.spacing(20),
  },
  gridButton: {
    marginTop: theme.spacing(10),
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
    },
  },
  textField: {
    width: 142,
  },
}));



const course = {
  id: {
    length: {
      maximum: 64,
    },
  },
  name: {
    presence: { allowEmpty: false, message: "es requerido" },
    length: {
      maximum: 64,
    },
  },

};


const EditCourse = (props) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const classes = useStyles();


 //true = esta en creación del curso, false terminó de crear el curso sigue agregar estudiantes
  const [courseCreate, setCourseCreate] = useState(true)
  const [createOpen, setCreateOpen] = useState(false)
  const [courseCreated, setCourseCreated] = useState(0) 
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  const [teacherCourse, setTeacherCourse] = useState([]);
  const [studentsCourse, setStudentsCourse] = useState([]);

  const [coursesState, setCoursesState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });


  useEffect(() => {
    if (teachers.length === 0) {
      axios
        .get(`teacher/`)
        .then((res) => {

          if (res.status === 200) setTeachers(res.data);
          else console.log(res.status);
        })
        .catch((err) => console.log(err));
    }

  });

  useEffect(() => {
      
        axios
        .get(`student/`)
        .then((res) => {
          if (res.status === 200) {
            setStudents(res.data);  
  
          } else console.log(res.status);
        })
        .catch((err) => console.log(err));          
      
  });

  useEffect(() => {
    if(students.length === 0){
      axios
      .get(`/find/`+ 2)
      .then((res) => {
        if (res.status === 200) {
            setCoursesState({
                values: {
                    name: res.data.course.name,
                    id: res.data.course.id

                }
            })
            setTeacherCourse(res.data.teacher)
        } else console.log(res.status);
      })
      .catch((err) => console.log(err));          
    }
});


  useEffect(() => {
    setStudentsCourse(studentsCourse)

  }, [studentsCourse])

  const handleStudents = (event, newVal) => {
    
    setStudentsCourse(newVal)   

  }
  const handleCloseCreate = () => {
    setCreateOpen(false);
  };
  const handleActiveStudents = () => {
    setCourseCreate(false)
    setCreateOpen(false);
  };  
  const handleSubmitStudents = (event) => {
    console.log("STATE",studentsCourse)
    console.log("STATE ID",courseCreated)
    let data = {
      students: studentsCourse,
      institutionId: 1,
      courseId: courseCreated
    };
    axios
      .put(`/student`, data)
      .then((res) => {

        if (res.status >= 200 && res.status < 300) {
          console.log("Estudiantes agregados con éxito");

          history.push("/courses");
        } else {
          console.log("hubo un error");
          console.log(res);
        }
      })
      .catch((error) => {
        let message1 = "Error";
        switch (error.data.message) {
          case "There is a problem": {
            message1 = "Algo salió mal. No fue posible crear el curso";
            break;
          }
          default: {
            message1 = "Algo salió mal. No fue posible crear el curso";
          }
        }
        console.log(message1)
      });

    event.preventDefault();
  }


  useEffect(() => {
    const errors = validate(coursesState.values, course);
    setCoursesState((coursesState) => ({
      ...coursesState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [coursesState.values]);

  const handleChange = (event) => {
    event.persist();

    setCoursesState((coursesState) => ({
      ...coursesState,
      values: {
        ...coursesState.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...coursesState.touched,
        [event.target.name]: true,
      },
    }));
  };


  const handleSubmit = (event) => {

    let data = {
      name: coursesState.values.name,
      institutionId: props.idInst,
      teacherId: teacherCourse.id
    };
    axios
      .put(`/course`, data)
      .then((res) => {
         if (res.status >= 200 && res.status < 300) {
          setCreateOpen(true);      
          setCourseCreated(res.data.course.id)
          console.log("Curso guardado con éxito");

          
        } else {
          console.log("hubo un error");
          console.log(res);
        }
      })
      .catch((error) => {
        let message1 = "Error";
        switch (error.data.message) {
          case "There is a problem": {
            message1 = "Algo salió mal. No fue posible crear el curso";
            break;
          }
          default: {
            message1 = "Algo salió mal. No fue posible crear el curso";
          }
        }
        console.log(message1)
      });

    event.preventDefault();
  };
 

  const hasError = (field) =>
    coursesState.touched[field] && coursesState.errors[field]
      ? true
      : false;

  return (
    <div className="background">
      <Grid container className={classes.grid}>
        <Grid

          item
          md={12}
          xs={12}

        >
          <div style={{ padding: 20 }}>
            <h1>Crear un curso</h1>

            <div style={{ padding: 40 }}>
              <Grid container spacing={5} className="Grid-main-blue">
               
                <Grid item xs={6}>
                  <Card>
                    <CardContent>
                      <Typography className="title" color="textSecondary" gutterBottom>
                        Datos del curso
                                </Typography>
                      <form className="root" autoComplete="off" onSubmit={handleSubmit}>

                        <Grid item xs={12}>
                          <TextField id="standard-basic" label="Nombre del curso" fullWidth
                            onChange={handleChange}
                            name="name"
                            error={hasError("name")}
                            type="text"
                            value={coursesState.values.name || ""}
                            helperText={
                              hasError("name")
                                ? "Debes darle un nombre al curso"
                                : null
                            }

                          />
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <br></br>
                          <br></br>

                        </Grid>

                        <Grid item xs={12}>
                          <Autocomplete
                            id="teacherCourse"
                            options={teachers}
                            name="teacherCourse"
                            clearOnEscape
                            getOptionLabel={(option) => option !== "" ? option.name + " " + option.lastname : option}

                            // error={this.state.teacherCourse === ""} 
                            //onChange={(event, newVal)=> this.handleChange(event,newVal)}
                            onChange={(event, newVal) => setTeacherCourse(newVal)}
                            //onChange={this.isDisabled}
                            // style={{ width: 300 }}
                            renderInput={(params) => (
                              <TextField {...params} label="Docente encargado" variant="outlined"
                             
                                value={teacherCourse} />

                            )
                            }
                          />
                        </Grid>

                        <Grid item xs={12} md={12}>
                          <br></br>
                          <br></br>

                        </Grid>

                        <Grid item xs={12}>
                          <Button variant="contained" color="primary"
                            type="submit"
                          >
                            Guardar curso
                          </Button>

                        </Grid>



                      </form>

                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card>
                    <CardContent>
                      <Typography className="title" color="textSecondary" gutterBottom>
                        Estudiantes del curso
                            </Typography>
                            <Typography variant="body2" component="p">
                              Para agregar estudiantes debes primero guardar el curso
         
                            </Typography>
                      <form className="root" noValidate autoComplete="off"
                        onSubmit={handleSubmitStudents}>
                        <Button variant="contained" color="primary"
                          type="submit"
                          disabled={
                            courseCreate                            
                        }
                        >
                          Guardar estudiantes
                          </Button>
                        <Grid item xs={12} md={12}>
                          <br></br>
                          <br></br>

                        </Grid>


                        <Grid item xs={12}>
                        <Autocomplete
                            multiple
                            id="tags-standard"
                            options={students}
                            getOptionLabel={(option) => option !== "" ? option.name + " " + option.lastname : option}
                            onChange={(event, newVal) => handleStudents(event, newVal)}

                            renderInput={(params) => (
                              <TextField
                                {...params}

                                variant="standard"
                                label="Multiple values"
                                placeholder="Favorites"
                              />
                            )}
                          />
                          

                         
                        </Grid>
                      </form>
                      <Grid item xs={12} md={12}>
                        <br></br>
                        <br></br>

                      </Grid>


                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </div>
          </div>
        </Grid>
        <Dialog
                                onClose={handleCloseCreate}
                                aria-labelledby="customized-dialog-title"
                                open={createOpen}
                            >
                                <DialogTitle id="customized-dialog-title" onClose={handleCloseCreate}>
                                    Curso guardado con exito
                                </DialogTitle>
                                <DialogContent dividers>
                                    <Typography gutterBottom>
                                        {"¿Desea agregar los estudiantes?"}
                                    </Typography>
                                </DialogContent>
                                <DialogActions>
                                    <Button autoFocus  color="primary"
                                    href="/courses">
                                        No
                                    </Button>
                                    <Button autoFocus onClick={handleActiveStudents} color="primary">
                                        Sí
                                    </Button>
                                </DialogActions>
                            </Dialog>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({

  idInst: state.login.id,
  name: state.login.name,
  email: state.login.email,
  // instid: state.auth.instId,
});

EditCourse.propTypes = {
  idInst: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string
  // instid: PropTypes.any,
};

export default connect(mapStateToProps)(EditCourse);
