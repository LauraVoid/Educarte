import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import moment from "moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import "./style/account.css";

const states = [
  {
    value: "Cali",
    label: "Cali",
  },
  {
    value: "Medellín",
    label: "Medellín",
  },
  {
    value: "Bogotá",
    label: "Bogotá",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  typoH3: {
    fontWeight: 500,
    fontSize: 24,
    letterSpacing: "-0.06px",
  },
  avatar: {
    height: 100,
    width: 100,
  },
  box: {
    display: "flex",
    justifyContent: "flex-end",
    p: 2,
  },
  button: {
    marginTop: "3%",
    marginRight: "3%",
    marginBottom: "3%",
  },
  typoHeader: {
    color: "black",
    fontSize: "1.5rem",
    fontFamily: "Roboto Helvetica Arial sans-serif",
    fontWeight: "400",
    lineHeight: "1.334",
    letterSpacing: "0em",
    marginLeft: "2%",
    marginTop: "2%",
  },
}));

const AccountProfileDetails = (props) => {
  const classes = useStyles();
  const { user, name, lastname, email, rol } = props;
  const [values, setValues] = useState({
    firstName: name,
    lastName: lastname,
    email: email,
    phone: "",
    state: "Cali",
    country: "Colombia",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <Typography className={classes.typoHeader}>Mi Perfil</Typography>
        <CardHeader subheader="Aquí puedes encontrar tu información personal" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Nombres"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Apellidos"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Correo electrónico"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Número de contacto"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="País"
                name="country"
                onChange={handleChange}
                required
                value={values.country}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Ciudad"
                name="state"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
              >
                {states.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box className={classes.box}>
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
          >
            Guardar
          </Button>
        </Box>
      </Card>
    </form>
  );
};

const mapStateToProps = (state) => ({
  user: state.login.id,
  name: state.login.name,
  lastname: state.login.lastname,
  email: state.login.email,
  rol: state.login.roles,
  token: state.login.accessToken,
});

AccountProfileDetails.propTypes = {
  user: PropTypes.number,
  name: PropTypes.string,
  lastname: PropTypes.string,
  email: PropTypes.string,
  rol: PropTypes.number,
  token: PropTypes.string,
};

export default connect(mapStateToProps)(AccountProfileDetails);
