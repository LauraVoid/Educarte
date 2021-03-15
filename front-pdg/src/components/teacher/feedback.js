import { Grid } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import validate from "validate.js"
import Box from '@material-ui/core/Box';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import axios from '../../utils/axios';

import { useHistory } from "react-router-dom";
import './style/teacher.css';

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
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      },
}));

const feedback = {
    id: {
        length: {
            maximum: 64,
        },
    },
    title: {
        presence: { allowEmpty: false, message: "es requerido" },
        length: {
            maximum: 64,
        },
    },
    date: {
        presence: { allowEmpty: false, message: "es requerido" },
        length: {
            minimum: 6,
        },
    },
    message: {
        presence: { allowEmpty: false, message: "es requerido" },
        length: {
            maximum: 64,
        },
    }

};
const FeedbackStudent = () => {
    const dispatch = useDispatch();
    let history = useHistory();
    const classes = useStyles();

    const [valueRating, setValueRating] = React.useState(0);


    const [feedbackState, setFeedbackState] = useState({
        isValid: false,
        values: {},
        touched: {},
        errors: {},
    });

    useEffect(() => {
        const errors = validate(feedbackState.values, feedback);

        //const errors= false;
        setFeedbackState((feedbackState) => ({
            ...feedbackState,
            isValid: errors ? false : true,
            errors: errors || {},
        }));
    }, [feedbackState.values]);

    const handleChange = (event) => {
        event.persist();

        setFeedbackState((feedbackState) => ({
            ...feedbackState,
            values: {
                ...feedbackState.values,
                [event.target.name]:
                    event.target.type === "checkbox"
                        ? event.target.checked
                        : event.target.value,
            },
            touched: {
                ...feedbackState.touched,
                [event.target.name]: true,
            },
        }));
    };

    const handleSubmit = (event) => {

        let data = {
            ...feedbackState.values,

        };
        console.log(data);

        axios
            .post(`/course`, data)
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
        feedbackState.touched[field] && feedbackState.errors[field]
            ? true
            : false;





    return (
        <div className="background1">
            <div style={{ padding: 20 }}>
                <h1>Retroalimentación de pepita</h1>

                <div style={{ padding: 40, margin: 20 }} className={classes.root}>
                    <Grid container spacing={5} className="Grid-main-green">
                        <Grid
                            item
                            md={12}
                            xs={12}
                        >

                            <div >
                                <form className="background-form" autoComplete="off" onSubmit={handleSubmit}
                                >
                                    <Grid className={classes.gridForm} container
                                    alignItems="center"
                                    style={ {margin:30}}>

                                        <Grid item xs={6}>
                                            <TextField id="standard-basic" label="Título"
                                                onChange={handleChange}
                                                
                                                name="title"
                                                error={hasError("title")}
                                                type="text"
                                                value={feedbackState.values.title || ""}
                                                helperText={
                                                    hasError("title")
                                                        ? "Debes darle un título"
                                                        : null
                                                }

                                            />
                                        </Grid>

                                        <Grid item xs={6}>
                                            <TextField 
                                                id="date"
                                                label="Fecha"
                                                onChange={handleChange}
                                                className={classes.textField}
                                                name="date"
                                                error={hasError("date")}
                                                type="date"
                                                value={feedbackState.values.date || ""}
                                                helperText={
                                                    hasError("date")
                                                        ? "Debes ingresar una fecha"
                                                        : null
                                                }

                                            />
                                        </Grid>

                                        <Grid item xs={12} md={12}>
                                            <br></br>
                                            <br></br>

                                        </Grid>
                                        <Grid item xs={6}>
                                            <Box component="fieldset" mb={3} borderColor="transparent">
                                                <Typography component="legend">Desempeño</Typography>
                                                <Rating
                                                    name="simple-controlled"
                                                    value={valueRating}
                                                    onChange={(event, newValue) => {
                                                        setValueRating(newValue);
                                                    }}
                                                />
                                            </Box>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <TextField
                                                id="outlined-multiline-static"
                                                label="Mensaje"
                                                onChange={handleChange}
                                                name="message"
                                                error={hasError("message")}
                                                value={feedbackState.values.message || ""}
                                                multiline
                                                rows={4}
                                                variant="outlined"
                                                helperText={
                                                    hasError("message")
                                                        ? "Debes ingresar un mensaje"
                                                        : null
                                                }
                                            />

                                        </Grid>



                                        <Grid item xs={12}>
                                            <Button variant="contained" color="primary"
                                            style={{ margin: 20 }}
                                            >
                                                Guardar Desempeño
                                        </Button>

                                        </Grid>

                                    </Grid>









                                </form>
                            </div>
                        </Grid>
                    </Grid>

                </div >




            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({

    // instid: state.auth.instId,
});
FeedbackStudent.propTypes = {

    //instid: PropTypes.any,
};
export default connect(mapStateToProps)(FeedbackStudent);