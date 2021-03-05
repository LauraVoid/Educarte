import { Grid } from '@material-ui/core'
import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './style/create-course.css'
import axios from '../../utils/axios';


export default class CreateCourse extends Component {

    constructor(props) {
        super(props);
        // const studentsNew =[{
        //     name:"nuevo estu"
        // }]
        this.state = {
            courseName: "",
            courseError:false,
            teacherError:false,
            teacherCourse: {},
            listTeachers:[],
            students: [],
            studentsNew:[],
            messageError:""

        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount(){
        //get teachers student
        axios.get('teacher/')
        .then((res) => {
            if (res.status === 200) {
               // console.log(res.data)
                let result =res.data; 
                
                this.setState({                    
                    listTeachers: result,
                })                   

            }
            else console.log(res.status);
        })
        .catch((err) => console.log(err))

        axios.get('student/')
        .then((res) => {
            if (res.status === 200) {
                //console.log(res.data)
                let result =res.data; 
                
                this.setState({                    
                    students: result,
                })                   

            }
            else console.log(res.status);
        })
        .catch((err) => console.log(err))

        


    

}
    handleChangeTable(event) {
        console.log(event)

        let allStu = this.state.studentsNew.push({name: "neww"})
        this.setState({ studentsNew: allStu});
        console.log(this.state)
        
        
    }
    handleSubmit(event){

        console.log(this.state)
        // if(!this.state.teacherError && !this.state.courseError){
        //     axios.post()
        // }

        

    }
    handleChange(event){
        event.persist();
        this.setState({
            courseName:event.target.value

        })
        
        if (this.state.courseName === "") {
            this.setState({
                courseError: true,
                messageError: this.state.messageError +"Ingresar un nombre de curso",
            });
           
        }else{
            this.setState({
                courseError: false,
               
            });
            
        }
        if(this.state.teacherCourse === "" || this.state.teacherCourse === undefined){
            this.setState({
                teacherError: true,
                messageError: this.state.messageError +"Ingresar profesor de curso",
            });
        
        }else{
            this.setState({
                teacherError: false,
               
            });
            
        }
        
        
    }
    isDisabled(event){
        console.log(event)

        
    }
    render() {
        const teachers = [
            { id:1, name: 'The Shawshank Redemption' },
            { id:2,name: 'The Godfather' },
            { id:3,name: 'Dark Knight' },
        ]        


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
                                        <form className="root" noValidate autoComplete="off" onSubmit={this.handleSubmit} >
                                            {/* onSubmit={handleSubmit} */}
                                            <Grid item xs={12}>
                                                <TextField id="standard-basic" label="Nombre del curso" fullWidth
                                                onChange={(e)=> this.setState({ courseName:e.target.value})}
                                                name="courseName"
                                                type="text"
                                                value={this.state.courseName || ""} 
                                                error={this.state.courseName === ""}                                                
                                                helperText={this.state.courseName === " " ? 'No valido' : ''} />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <br></br>
                                                <br></br>

                                            </Grid>

                                            <Grid item xs={12}>
                                                <Autocomplete
                                                    id="combo-box-demo"
                                                    options={this.state.listTeachers}
                                                    name="teacherCourse"
                                                    clearOnEscape
                                                    getOptionLabel={(option) => option !=="" ? option.name:option}
                                                    
                                                    // error={this.state.teacherCourse === ""} 
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
                                                disabled={this.state.courseError || this.state.teacherError}>
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
                                                    getOptionLabel={(option) => option !=="" ? option.name:option}                                                   
                                                    onChange={(event, newValue) => {
                                                        let list = this.state.studentsNew
                                                        list.push(newValue)
                                                        this.setState({studentsNew: list})
                                                      }}
                                                    // style={{ width: 300 }}
                                                    renderInput={(params) => <TextField {...params} label="Estudiantes del curso" variant="outlined" />}
                                                />
                                            </Grid>
                                        </form>

                                        <List component="nav" aria-label="secondary mailbox folders">
                                        {this.state.studentsNew.map((value, index) =>{
                                                   return(
                                                    <ListItem key={index} >
                                                    <ListItemText primary={value.name} />
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

                    </div >




                </div>

            </div>
        )
    }
}





