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


export default class CreateCourse extends Component {

    constructor(props) {
        super(props);
        const studentsNew =[{
            name:"nuevo estu"
        }]
        this.state = {
            courseName: "",
            teacherCourse: "",
            students: [],
            studentsNew

        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        console.log(event)
        let allStu = this.state.studentsNew.push({name: "neww"})
        this.setState({ studentsNew: allStu});
        console.log(this.state)
        
        
    }
    render() {
        const teachers = [
            { name: 'The Shawshank Redemption' },
            { name: 'The Godfather' },
            { name: 'Dark Knight' },
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
                                        <form className="root" noValidate autoComplete="off" >
                                            {/* onSubmit={handleSubmit} */}
                                            <Grid item xs={12}>
                                                <TextField id="standard-basic" label="Nombre del curso" fullWidth value={this.state.courseName} />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <br></br>
                                                <br></br>

                                            </Grid>

                                            <Grid item xs={12}>
                                                <Autocomplete
                                                    id="combo-box-demo"
                                                    options={teachers}
                                                    getOptionLabel={(option) => option.name}
                                                    // style={{ width: 300 }}
                                                    renderInput={(params) => <TextField {...params} label="Docente encargado" variant="outlined" />}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={12}>
                                                <br></br>
                                                <br></br>

                                            </Grid>

                                            <Grid item xs={12}>
                                                <Button variant="contained" color="primary">
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
                                                    options={teachers}
                                                    getOptionLabel={(option) => option.name}                                                   
                                                    onChange={(event, newValue) => {
                                                        this.handleChange(newValue);
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





