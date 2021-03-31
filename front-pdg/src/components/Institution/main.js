import { Card, CardContent, Grid } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";

import { connect } from "react-redux";

import Typography from "@material-ui/core/Typography";
import PeopleIcon from '@material-ui/icons/People';
import SchoolIcon from '@material-ui/icons/School';
import Button from '@material-ui/core/Button';
import axios from '../../utils/axios';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import IconButton from '@material-ui/core/IconButton';
import './style/institution.css';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
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
    largeIcon: {
        width: 60,
        height: 60,
    },
    card: {
        // Provide some spacing between cards
        width:580,
        margin: 16,      
        
      }

}));



const MainInstitution = () => {

    const classes = useStyles();

    const [mainState, setMainState] = useState({
        isValid: false,
        values: {},
        touched: {},
        errors: {},
    });



    return (
        <div className="background1">
            <div style={{ padding: 20 }}>
                <h1>Bienvenido</h1>

                <div style={{ padding: 40, margin: 50 }}>
                    <Grid container spacing={5} className="Grid-main-blue"
                        justify="center"
                        alignItems="center">                       
                        <Grid item xs={6} sm={4}
                            container
                            direction="column" >
                            <IconButton variant="contained" color="primary" href="/courses">
                                <HomeWorkIcon
                                    className={classes.largeIcon}
                                    color="action" />
                            </IconButton>
                            <Typography className="title" color="textSecondary" gutterBottom
                                align='center'>
                                Ver cursos
                            </Typography>


                        </Grid>
                        <Grid item xs={6} sm={4}
                            container
                            direction="column" >
                            <IconButton variant="contained" color="primary" href="/createcourse">
                                <PeopleIcon
                                    className={classes.largeIcon}
                                    color="action" />
                            </IconButton>
                            <Typography className="title" color="textSecondary" gutterBottom
                                align='center'>
                                Ver profesores
                            </Typography>


                        </Grid>
                        <Grid item xs={6} sm={4}
                            container
                            direction="column" >
                            <IconButton variant="contained" color="primary" href="/createcourse">
                                <SchoolIcon
                                    className={classes.largeIcon}
                                    color="action" />
                            </IconButton>
                            <Typography className="title" color="textSecondary" gutterBottom
                                align='center'>
                                Ver estudiantes
                            </Typography>


                        </Grid>

                    </Grid>
                    <div style={{ margin: 20 }}>
                        {/* wrap="nowrap" */}
                        <Grid container spacing={3} className={classes.root}>
                            <Grid item xs={12} md={12}>
                                <br></br>
                                <br></br>

                            </Grid>

                            <Grid item xs={12} sm={6}
                                container
                                className="Grid-main-purple">
                                <Card className={classes.card}>
                                    <CardContent>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                            Estadisticas
                                    </Typography>

                                    </CardContent>

                                </Card>

                            </Grid>

                            <Grid item xs={12} sm={6}

                                container
                                wrap="nowrap"
                                className="Grid-main-green">
                                <Card className={classes.card}>
                                    <CardContent
                                    >
                                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                                            Reuniones
                                        </Typography>

                                        <Card>
                                            <CardContent>
                                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                    Reunion lunes 21

                                                </Typography>
                                            </CardContent>
                                        </Card>



                                    </CardContent>

                                </Card>

                            </Grid>

                        </Grid>

                    </div>



                </div >




            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({

    // instid: state.auth.instId,
});

MainInstitution.propTypes = {

    //instid: PropTypes.any,
};

export default connect(mapStateToProps)(MainInstitution);

