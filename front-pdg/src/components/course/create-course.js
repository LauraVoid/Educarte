import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./style/create-course.css";
//import { useHistory } from "react-router-dom";
import axios from "../../utils/axios";

export default class CreateCourse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courseName: "",
      dataError: false,    
      teacherCourse: {},
      listTeachers: [],
      students: [],
      studentsNew: [],
      messageError: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    axios
      .get("teacher/")
      .then((res) => {
        if (res.status === 200) {
          let result = res.data;

          this.setState({
            listTeachers: result,
          });
        } else console.log(res.status);
      })
      .catch((err) => console.log(err));

    axios
      .get("student/")
      .then((res) => {
        if (res.status === 200) {
          let result = res.data;

          this.setState({
            students: result,
          });
        } else console.log(res.status);
      })
      .catch((err) => console.log(err));
  }
  handleChangeTable(event) {
    console.log(event);

    let allStu = this.state.studentsNew.push({ name: "neww" });
    this.setState({ studentsNew: allStu });
    console.log(this.state);
  }

 
    handleSubmit(event){
        //revisar errores


        let data = {
            name: this.state.courseName,
            institutionId: 2

        }
        axios.post("/course",data).then((res) =>{
            if(res.status >=200 && res.status <300){
                console.log("curso creado con exito")
            }else{
                console.log("Hubo un error", res.data)
            }
        })


        

    }
    handleChange(event, value){
        event.persist();
        
        if (this.state.courseName !== "" && this.state.teacherCourse !== "" && this.state.teacherCourse !== undefined) {
            this.setState({
                dataError: false,
                messageError: "",
            });
               
        }
        
    }
        
        
    
    isDisabled(){

        console.log("entro")
        if (this.state.courseName !== "" && this.state.teacherCourse !== "" && this.state.teacherCourse !== undefined) {
            this.setState({
                dataError: false,
                messageError: "",
            });
            return true;
               
        }else{
            return false;
        }
        
       

        
    }
    render() {
        

        return (
            <div>
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
                                        <form className="root" noValidate autoComplete="off"  >
                                            {/* onSubmit={handleSubmit} */}
                                            <Grid item xs={12}>
                                                <TextField id="standard-basic" label="Nombre del curso" fullWidth
                                                onChange={(e)=> this.setState({ courseName:e.target.value})}
                                                name="courseName"
                                                type="text"
                                                value={this.state.courseName || ""} 
                                               // error={this.isDisabled ? true:false}                                                
                                                //helperText={this.state.courseName === " " ? 'No valido' : ''} 
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <br></br>
                                                <br></br>

                                            </Grid>

                                            <Grid item xs={12}>
                                                <Autocomplete
                                                    id="teacherCourse"
                                                    options={this.state.listTeachers}
                                                    name="teacherCourse"
                                                    clearOnEscape
                                                    getOptionLabel={(option) => option !=="" ? option.name:option}
                                                    
                                                    // error={this.state.teacherCourse === ""} 
                                                    //onChange={(event, newVal)=> this.handleChange(event,newVal)}
                                                   onChange={(event, newVal)=> this.setState({teacherCourse: newVal})}
                                                    //onChange={this.isDisabled}
                                                    // style={{ width: 300 }}
                                                    renderInput={(params) => (
                                                        <TextField {...params} label="Docente encargado" variant="outlined"
                                                        // onSelect={(e)=> console.log(e.target)} 
                                                        value={this.state.teacherCourse || ""}/>
                                                        
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
                                                onClick={this.handleSubmit}
                                                disabled={this.state.dataError}
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
                                                    options={this.state.students}
                                                    disableClearable
                                                    getOptionLabel={(option) => option !=="" ? option.name +" "+ option.lastname :option}                                                   
                                                    onChange={(event, newValue) => {
                                                        let list = this.state.studentsNew
                                                        list.push(newValue)
                                                        this.setState({studentsNew: list})
                                                      }}
                                                    // style={{ width: 300 }}
                                                    renderInput={(params) =>
                                                         <TextField {...params} label="Estudiantes del curso" variant="outlined" 
                                                         value={this.state.studentsNew || ""}/>}
                                                />
                                            </Grid>
                                        </form>

                                        <List component="nav" aria-label="secondary mailbox folders">
                                        {this.state.studentsNew.map((value, index) =>{
                                                   return(
                                                    <ListItem key={index} >
                                                    <ListItemText primary={value.name+ " " +value.lastname} />
                                                </ListItem>
                                                 
                                                   ) 
                                              }                                                                                                                                                
                                               )}
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
      </div>
    );
  }

}
