import { Grid } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
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
});

const teachers = [
    { name: 'The Shawshank Redemption' },
    { name: 'The Godfather' },
    { name: 'Dark Knight' },
]

export default function Createcourse() {
    const classes = useStyles();

    return (
        <div style={{ padding: 20 }}>
            <h1>Crear un curso</h1>

            <div style={{ padding: 40 }}>
                <Grid container spacing={5} className="Grid-main-blue">
                    <Grid item xs={6}>
                        <Card>
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Datos del curso
                            </Typography>
                                <form className={classes.root} noValidate autoComplete="off" >
                                    {/* onSubmit={handleSubmit} */}
                                    <Grid item xs={12}>
                                        <TextField id="standard-basic" label="Nombre del curso" fullWidth />
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

                                    <Grid item xs={12}
                                    justify="center"
                                    alignItems="center">
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
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Estudiantes del curso
                            </Typography>
                                <form className={classes.root} noValidate autoComplete="off" >


                                    <Grid item xs={12}>
                                        <Autocomplete
                                            id="combo-box-demo"
                                            options={teachers}
                                            getOptionLabel={(option) => option.name}
                                            // style={{ width: 300 }}
                                            renderInput={(params) => <TextField {...params} label="Estudiantes del curso" variant="outlined" />}
                                        />
                                    </Grid>
                                </form>

                                <List component="nav" aria-label="secondary mailbox folders">
                                    <ListItem button>
                                        <ListItemText primary="Pepito Perez" />
                                    </ListItem>
                                    <ListItem >
                                        <ListItemText primary="Gabriela Mejia" />
                                    </ListItem>

                                </List>


                            </CardContent>
                        </Card>
                    </Grid>


                </Grid>

            </div >




        </div>
    )

}
