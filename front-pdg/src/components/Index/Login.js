import React, { useState, useEffect } from "react";
import './styles/Login.css'
import TextField from '@material-ui/core/TextField';
import { Card, CardContent, Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import axios from "../../utils/axios";
import { connect } from "react-redux";
import validate from "validate.js";


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '100ch',
        },
        card: {
            height: "100%",
            margin: 16,
        },
        title: {
            marginTop: theme.spacing(3),
        },
    },
}));

const loginForm = {
    password: {
        presence: { allowEmpty: false, message: "es requerido" },
        length: {
            maximum: 64,
        },
    },
    institution: {
        presence: { allowEmpty: false, message: "es requerido" },
        length: {
            maximum: 64,
        },
    },
    email: {
        presence: { allowEmpty: false, message: "es requerido" },
        length: {
            maximum: 64,
        },
    },

};
const Login = () => {
    const classes = useStyles();
    const [institution, setInstitution] = useState([]);
    const [selInstitution, setSelInstitution] = useState([]);
    //const [userType, setUserType] = useState("");




    const [loginState, setLoginState] = useState({
        isValid: false,
        values: {},
        touched: {},
        errors: {},
    });



    useEffect(() => {
        const getinstitutions = () => {
            if (institution.length === 0) {
                axios
                    .get('inst/')
                    .then((res) => {
                        if (res.status === 200) {
                            setInstitution(res.data)
                        } else console.log(res.status);

                    })
                    .catch(() => {

                        // dispatch(showMessage(message));
                    });
            }

        };
        getinstitutions();
    }, [institution]);

    useEffect(() => {
        const errors = validate(loginState.values, loginForm);

        setLoginState((loginState) => ({
            ...loginState,
            isValid: errors ? false : true,
            errors: errors || {},
        }));
    }, [loginState.values]);

    const handleChange = (event) => {
        event.persist();

        setLoginState((loginState) => ({
            ...loginState,
            values: {
                ...loginState.values,
                [event.target.name]:
                    event.target.type === "checkbox"
                        ? event.target.checked
                        : event.target.value,
            },
            touched: {
                ...loginState.touched,
                [event.target.name]: true,
            },
        }));
    };
    const hasError = (field) =>
        loginState.touched[field] && loginState.errors[field]
            ? true
            : false;


    return (
        <div className=" background">
            <div style={{ padding: 20 }}>
                <div style={{ padding: 40, margin: 20 }}>
                    <Grid container spacing={5}
                        justify="center"
                        alignItems="center">


                        <Card className={classes.card}>
                            <CardContent>
                                <Typography className="title" color="textSecondary" gutterBottom
                                    variant="h4">
                                    Educarte
                                </Typography>
                                <form className={classes.root} noValidate autoComplete="off">
                                    {/* <Grid
                                        container
                                        direction="row"
                                        justify="flex-start"
                                        alignItems="flex-start"
                                        item xs={12} sm={12} >
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">Tipo de usuario</FormLabel>
                                            <RadioGroup aria-label="who" name="usertype"
                                                value={loginState.values.userType || ""} onChange={handleChange}>
                                                <FormControlLabel value="student" control={<Radio />} label="Estudiante" />
                                                <FormControlLabel value="teacher" control={<Radio />} label="Profesor" />
                                                <FormControlLabel value="institution" control={<Radio />} label="Institución" />

                                            </RadioGroup>
                                        </FormControl>
                                    </Grid> */}
                                    <Grid item xs={12} >
                                        <TextField id="standard-basic" label="Correo Electrónico/Usuario" fullWidth
                                            onChange={handleChange}
                                            name="email"
                                            error={hasError("email")}
                                            type="text"
                                            value={loginState.values.email || ""}
                                            helperText={
                                                hasError("email")
                                                    ? "Debes ingresar el usuario o correo"
                                                    : null
                                            } />

                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <br></br>

                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField id="standard-basic" label="Contraseña" fullWidth
                                            onChange={handleChange}
                                            name="password"
                                            error={hasError("password")}
                                            type="text"
                                            value={loginState.values.password || ""}
                                            helperText={
                                                hasError("password")
                                                    ? "Debes ingresar la contraseña"
                                                    : null
                                            } />
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <br></br>

                                    </Grid>
                                    <Grid item xs={12}>
                                        <Autocomplete
                                            fullWidth
                                            id="combo-box-demo"
                                            options={institution}
                                            name="institution"
                                            clearOnEscape
                                            getOptionLabel={(option) => option !== "" ? option.name : option}
                                            onChange={(event, newVal) => setSelInstitution(newVal)}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Institución" variant="outlined"
                                                    value={selInstitution} />

                                            )
                                            }
                                        />
                                        <Grid item xs={12} md={12}>
                                            <br></br>
                                            <br></br>

                                        </Grid>
                                        <Button fullWidth variant="contained" color="primary">Iniciar sesión</Button>
                                        <Grid item xs={12} md={12}>
                                            <br></br>
                                            <br></br>

                                        </Grid>


                                    </Grid>


                                </form>
                            </CardContent>
                        </Card>


                    </Grid>





                </div >



            </div>


        </div>
    )

}

const mapStateToProps = (state) => ({

    // instid: state.auth.instId,
});

Login.propTypes = {

    //instid: PropTypes.any,
};

export default connect(mapStateToProps)(Login);


