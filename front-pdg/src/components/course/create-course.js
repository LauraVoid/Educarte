import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import PropTypes from "prop-types";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from "@material-ui/core/TableSortLabel";
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

const cellsHead = [  
  {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: "Nombre",
  }
  

];
HeadTable.propTypes = {
  classes: PropTypes.object.isRequired,
  
  onRequestSort: PropTypes.func.isRequired,
  
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
function HeadTable(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
  };

  return (
      <TableHead>
          <TableRow>
              <TableCell padding="checkbox"></TableCell>
              {cellsHead.map((headCell) => (
                  <TableCell
                      key={headCell.id}
                      align={headCell.numeric ? "left" : "left"}
                      padding={headCell.disablePadding ? "none" : "default"}
                      sortDirection={orderBy === headCell.id ? order : false}
                  >
                      <TableSortLabel
                          active={orderBy === headCell.id}
                          direction={orderBy === headCell.id ? order : "asc"}
                          onClick={createSortHandler(headCell.id)}
                      >
                          {headCell.label}
                      </TableSortLabel>
                  </TableCell>
              ))}
          </TableRow>
      </TableHead>
  );
}
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
      return -1;
  }
  if (b[orderBy] > a[orderBy]) {
      return 1;
  }
  return 0;
}
function getComparator(order, orderBy) {
  return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
}

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

  const [orderBy, setOrderBy] = React.useState("id");
  const [dense, setDense] = React.useState(true);
    const [order, setOrder] = React.useState("asc");
    const [selected, setSelected] = React.useState([]);


  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  const [studentsList, setStudentsList] = useState([]);
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
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
};


useEffect(()=>{
  setCoursesState((coursesState)=>({
    ...coursesState,
    studentsCou : studentsCourse

  }))
  
},[studentsCourse])


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
      institutionId: 1

    };


    axios
      .post(`/course`,data)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          console.log("Curso guardada con éxito");
         
          history.push("/courses");
        } else {
          console.log("hubo un error");
          console.log(res);
        }
      })
      .catch((error) => {
        let message1 = "Error";
        switch (error.response.data.message) {
          case "There is a problem": {
            message1 = "Algo salió mal. No fue posible crear el curso";
            break;
          }          
          default: {
            message1 = "Algo salió mal. No fue posible crear la comunidad";
          }
        }
        console.log(message1)
      });

    event.preventDefault();
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;
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
                              
                           
                            }

                            } 
                            // style={{ width: 300 }}
                            renderInput={(params) =>
                              <TextField {...params} label="Estudiantes del curso" variant="outlined"
                              value={coursesState.values.studentsCou || ""}
                               />}
                          />
                        </Grid>
                      </form>
                      <TableContainer>
                                <Table className="table"

                                    aria-labelledby="tableTitle"
                                    aria-label="enhanced table"
                                    size={dense ? "small" : "medium"}
                                >
                                    <HeadTable
                                        classes={classes}                                       
                                        order={order}
                                        orderBy={orderBy}
                                       
                                        onRequestSort={handleRequestSort}
                                        rowCount={studentsCourse.length}
                                    >
                                    </HeadTable >
                                    
                                    <TableBody >
                                        {stableSort(studentsCourse, getComparator(order, orderBy)).map(
                                            (row, index) => {
                                                const isItemSelected = isSelected(row.id);
                                                
                                                return (
                                                    <TableRow
                                                        hover
                                                        // onClick={(event) => handleClick(event, row.id)}
                                                        role="checkbox"
                                                        aria-checked={isItemSelected}
                                                        tabIndex={-1}
                                                        key={row.id}
                                                    
                                                    >
                                                        <TableCell></TableCell>
                                                        <TableCell align="left"> {row.name}</TableCell>
                                                       
                                                    </TableRow>
                                                );
                                            }
                                        )}

                                    </TableBody>
                                </Table>
                            </TableContainer>

                      
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
