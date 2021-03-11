import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
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

const CreateCourse = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const classes = useStyles();


  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [teacherCourse, setTeacherCourse] = useState([]);
  const [studentsCourse, setStudentsCourse] = useState([]);
 
  const [coursesState, setCoursesState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });


  const getTeachers =()=>{
    if (teachers.length === 0) {
      axios
        .get(`teacher/`)
        .then((res) => {
          
          if (res.status === 200) setTeachers(res.data);
          else console.log(res.status);
        })
        .catch((err) => console.log(err));
    }

  }

  const getStudents =()=>{
    
    axios
    .get(`student/`)
    .then((res) => {
      if (res.status === 200) {
        setStudents(res.data);
        

      } else console.log(res.status);
    })
    .catch((err) => console.log(err));
    

  }

  useEffect(() => {
   getTeachers();
   getStudents();
  }, [teachers]);


  useEffect(() => {
    const errors = validate(coursesState.values, course);

    //const errors= false;
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
      ...coursesState.values,

    };
    console.log(data);

    axios
      .post(`/course`,data)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          console.log("Comunidad guardada con éxito");
         
          history.push("/courses");
        } else {
          console.log("hubo un error");
          console.log(res);
        }
      })
      .catch((error) => {
        let message1 = "Error";
        switch (error.response.data.message) {
          case "The person doesn't exist": {
            message1 = "El host de la comunidad no existe";
            break;
          }
          case "The community is full": {
            message1 =
              "No es posible crear la comunidad, porque se ha alcanzado el aforo máximo permitido en ese espacio.";
            break;
          }
          case "The person is not community host": {
            message1 =
              "La persona que intenta crear la comunidad no es el host";
            break;
          }
          case "The person status is not authorized to create communities": {
            message1 =
              "Tu estado no es apto para crear comunidades ni para ingresar a ellas. Si te encuentras en la institución, por favor repórtate ante el personal de bioseguridad.";
            break;
          }
          default: {
            message1 = "Algo salió mal. No fue posible crear la comunidad";
          }
        }
        let message = {
          errorMsg: message1,
          errorType: "error",
        };
        // dispatch(showMessage(message));
      });

    event.preventDefault();
  };
  const hasError = (field) =>
    coursesState.touched[field] && coursesState.errors[field]
      ? true
      : false;

  return (
    <div className={classes.root}>
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
                      <form className="root"  autoComplete="off"  onSubmit={handleSubmit}>
                       
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
                                // onSelect={(e)=> console.log(e.target)} 
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
                      <form className="root" noValidate autoComplete="off" >


                        <Grid item xs={12}>
                          <Autocomplete
                            id="combo-box-demo"
                            options={students}
                            disableClearable
                            getOptionLabel={(option) => option !== "" ? option.name + " " + option.lastname : option}
                            onChange={(event, newVal) =>{
                              let arry = studentsCourse 
                              arry.push(newVal)
                              setStudentsCourse(arry)
                              console.log("TYPE",typeof studentsCourse)
                            }

                            } 
                            // style={{ width: 300 }}
                            renderInput={(params) =>
                              <TextField {...params} label="Estudiantes del curso" variant="outlined"
                                value={studentsCourse} />}
                          />
                        </Grid>
                      </form>

                      <List component="nav" aria-label="secondary mailbox folders">
                        {studentsCourse.forEach(function(student){
                          return(
                            <ListItem key={student.id} >
                            <ListItemText primary={student.name+ " " +student.lastname} />
                        </ListItem>
                         
                           ) 
                        })}
                        {/* {this.state.studentsNew.map((value, index) => {
                                                return (
                                                    <ListItem button>
                                                        <ListItemText primary={value.name} />
                                                    </ListItem>
                                                )
                                            })} */}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  
  // instid: state.auth.instId,
});

CreateCourse.propTypes = {
 
  // instid: PropTypes.any,
};

export default connect(mapStateToProps)(CreateCourse);
