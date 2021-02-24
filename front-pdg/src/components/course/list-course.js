import { Grid, IconButton } from '@material-ui/core'
import React,{ useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import EyeButton from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Create';
import axios from '../../utils/axios'
import './style/create-course.css'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 24,
    },
    pos: {
        marginBottom: 12,
    },
    table: {
        minWidth: 650,
    },
});


export default function ListCourse() {
    const classes = useStyles();
    const  [courses, setCourses]= useState([]);

    // useEffect(() => {
        
    //     axios.get('course/')
    //     .then((res)=>{
    //         if(res.status === 200) setCourses(res.data)
    //         else console.log(res.status);
    //     })
    //     .catch((err)=> console.log(err))
        
    // }, [courses])

    return (
        <div style={{ padding: 20 }}>
            <h1>Gestionar cursos</h1>

            <div style={{ padding: 40, margin:50 }}>
                <Grid container spacing={5} className="Grid-main-purple">
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" href="/createcourse">
                            Agregar +
                        </Button>

                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
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
                                    {courses.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell >{row.id}</TableCell>
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>                                            
                                            <TableCell align="right">
                                                <IconButton>
                                                    <EyeButton />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton>
                                                    <EyeButton />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="right">
                                                
                                            <IconButton>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton>
                                                    <DeleteIcon />
                                                </IconButton>
                                                
                                            </TableCell>


                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>



                </Grid>

            </div >




        </div>
    )

}
