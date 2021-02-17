import React from "react";
import './styles/Login.css'
import TextField from '@material-ui/core/TextField';
import { Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '100ch',
        },
    },
}));
export default function Login() {
    const classes = useStyles();
    return (
        <div className=" background">
            <div className="rectangle">
                <h1>Educarte</h1>

                <form className={classes.root} noValidate autoComplete="off">
                    <Grid item xs={12} >
                        <TextField id="standard-basic" label="Correo Electrónico/Usuario" fullWidth />

                    </Grid>
                    <Grid item xs={12} md={12}>
                        <br></br>

                    </Grid>

                    <Grid item xs={12}>
                        <TextField id="standard-basic" label="Contraseña" fullWidth />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <br></br>

                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            fullWidth
                            id="combo-box-demo"
                        //options={top100Films}
                        //getOptionLabel={(option) => option.title}
                        // style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Institución" variant="outlined" />}
                        />
                        <Grid item xs={12} md={12}>
                            <br></br>

                        </Grid>
                        <Button fullWidth variant="contained" color="primary">Iniciar sesión</Button>

                    </Grid>


                </form>

            </div>


        </div>
    )

}


