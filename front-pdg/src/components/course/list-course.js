import { Grid } from '@material-ui/core'
import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Course from './course'
import axios from "axios";
import './style/create-course.css';

export default class ListCourse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            coursesView: false
            
        };
    }
    renderCourses = () => {
        if(!this.state.coursesView){
            axios.get('http://localhost:8000/course/')
            .then((res) => {
                if (res.status === 200) {
                    let courses = res.data
                    let itemCourse = courses.map(course => <Course key={course.id} course={course}></Course>)
                    console.log(itemCourse)
                    this.setState({
                        coursesView:true
                    })
                    return itemCourse;

                }
                else console.log(res.status);
            })
            .catch((err) => console.log(err))


        }
     
    }
    render() {
            return (
                <div>
                    <div style={{ padding: 20 }}>
                        <h1>Gestionar cursos</h1>

                        <div style={{ padding: 40, margin: 50 }}>
                            <Grid container spacing={5} className="Grid-main-purple">
                                <Grid item xs={12}>
                                    <Button variant="contained" color="primary" href="/createcourse">
                                        Agregar +
                            </Button>

                                </Grid>
                                <Grid item xs={12}>
                                    <TableContainer component={Paper}>
                                        <Table className="table" aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell >Id</TableCell>
                                                    <TableCell >Curso</TableCell>
                                                    <TableCell align="right">Ver estudiantes</TableCell>
                                                    <TableCell align="right">Ver profesor(es)</TableCell>
                                                    <TableCell align="right"></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {this.renderCourses()}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>



                            </Grid>

                        </div >




                    </div>
                </div>
            )
        

    }
}
