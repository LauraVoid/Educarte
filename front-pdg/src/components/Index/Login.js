import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./styles/Login.css";
import TextField from "@material-ui/core/TextField";
import { Card, CardContent, Grid } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import axios from "../../utils/axios";
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import validate from "validate.js";
import loginUser from "../../actions/auth";
import bgd from "../../img/backgrounds/paisaje-login-edit.png";
import logoTitle from "../../img/logos/logo-login.png";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100ch",
    },
    card: {
      height: "100%",
      margin: 16,
    },
    title: {
      marginTop: theme.spacing(3),
    },
  },
  divContainer: {
    backgroundImage: `url(${bgd})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  title2: {
    width: "60%",
    marginLeft: "19%",
    marginBottom: "2%",
  },
  root2: {
    flexGrow: 1,
  },
}));

const loginForm = {
  password: {
    presence: { allowEmpty: false, message: "es requerido" },
    length: {
      maximum: 64,
    },
  },
  email: {
    presence: { allowEmpty: false },
    length: {
      maximum: 64,
    },
  },
};
const Login = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [typeUser, setTypeUser] = useState("student");
  //const [userType, setUserType] = useState("");

  const [loginState, setLoginState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });
  useEffect(() => {
    const errors = validate(loginState.values, loginForm);

    setLoginState((loginState) => ({
      ...loginState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [loginState.values]);

  const handleChange = (event) => {
    //event.persist();

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
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = (event) => {
    let data = {
      is: typeUser,
      email: loginState.values.email,
      password: loginState.values.password,
    };

    axios
      .post(`auth/api/auth/signin`, data)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          let dataLogin = res.data;
          dispatch(loginUser(dataLogin));
          if (data.is === "teacher") {
            history.push(`/teacher`);
          } else if (data.is === "institution") {
            history.push(`/institution`);
          }
        } else {
          console.log("hubo un error");
        }
      })
      .catch((error) => {
        let message1 = "Error";
        switch (error.response.data.message) {
          case "Invalid Password!": {
            message1 = "Contraseña incorrecta";
            break;
          }
          case "User Not found.": {
            message1 = "El usuario no se encuentra registrado";
            break;
          }
          default: {
            message1 = "Algo salió mal. No fue posible acceder";
          }
        }
        console.log(message1);
      });

    event.preventDefault();
  };

  const hasError = (field) =>
    loginState.touched[field] && loginState.errors[field] ? true : false;

  return (
    <div className={classes.divContainer}>
      <div style={{ padding: 20 }}>
        <div style={{ padding: 40, margin: 20 }}>
          <Grid container spacing={5} justify="center" alignItems="center">
            <Card
              className={classes.card}
              style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
            >
              <CardContent>
                <Grid container className={classes.root2} justify="center">
                  <Grid item xs={12}>
                    <img
                      src={logoTitle}
                      className={classes.title2}
                      alt="logoTitle"
                    ></img>
                  </Grid>
                </Grid>
                {/* <Typography
                  className="title"
                  color="textSecondary"
                  gutterBottom
                  variant="h4"
                >
                  Educarte
                </Typography> */}

                <form
                  className={classes.root}
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit}
                >
                  <Grid container spacing={5} direction="row">
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Tipo de usuario</FormLabel>
                      <RadioGroup
                        aria-label="who"
                        name="usertype"
                        value={typeUser || ""}
                        onChange={(event, newVal) => setTypeUser(newVal)}
                      >
                        <Grid item xs={6} sm={4} container direction="row">
                          <FormControlLabel
                            value="student"
                            control={<Radio />}
                            label="Estudiante"
                          />
                        </Grid>
                        <Grid item xs={6} sm={4} container direction="row">
                          <FormControlLabel
                            value="teacher"
                            control={<Radio />}
                            label="Profesor"
                          />
                        </Grid>
                        <Grid item xs={6} sm={4} container direction="row">
                          <FormControlLabel
                            value="institution"
                            control={<Radio />}
                            label="Institución"
                          />
                        </Grid>

                        <Grid item xs={6} sm={4} container direction="row">
                          <FormControlLabel
                            value="parent"
                            control={<Radio />}
                            label="Acudiente"
                          />
                        </Grid>
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel>Correo electronico/usuario</InputLabel>
                    <TextField
                      id="standard-basic"
                      label=""
                      fullWidth
                      onChange={handleChange}
                      name="email"
                      error={hasError("email")}
                      type="text"
                      value={loginState.values.email || ""}
                      helpertext={
                        hasError("email")
                          ? "Debes ingresar el usuario o correo"
                          : null
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <br></br>
                  </Grid>

                  <Grid item xs={12}>
                    <InputLabel htmlFor="standard-adornment-password">
                      Contraseña
                    </InputLabel>
                    <Input
                      id="standard-basic"
                      fullWidth
                      onChange={handleChange}
                      name="password"
                      error={hasError("password")}
                      type={showPassword ? "text" : "password"}
                      //type="password"
                      value={loginState.values.password || ""}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      helpertext={
                        hasError("password")
                          ? "Debes ingresar la contraseña"
                          : null
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <br></br>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid item xs={12} md={12}>
                      <br></br>
                      <br></br>
                    </Grid>
                    <Button
                      fullWidth
                      color="primary"
                      type="submit"
                      variant="contained"
                      disabled={
                        !loginState.isValid ||
                        typeUser === null ||
                        typeUser === ""
                      }
                    >
                      Iniciar sesión
                    </Button>
                    <Grid item xs={12} md={12}>
                      <br></br>
                      <br></br>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  institutionId: state.login.id,

  // instid: state.auth.instId,
});
const mapDispatchToProps = {
  loginUser,
};

Login.propTypes = {
  //instid: PropTypes.any,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
