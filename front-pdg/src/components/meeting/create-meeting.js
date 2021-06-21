import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import {
  Grid,
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core/";
import { Autocomplete } from "@material-ui/lab";
import FormControl from "@material-ui/core/FormControl";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import SendIcon from "@material-ui/icons/Send";
import { useDispatch } from "react-redux";
import validate from "validate.js";
import axios from "../../utils/axios";
import GroupIcon from "@material-ui/icons/Group";
import { showMessage } from "../../actions/actionMessage";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { green } from "@material-ui/core/colors";
import PropTypes from "prop-types";
import GoogleLogin from "react-google-login";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  gridContainer: {
    backgroundColor: "white",
    borderRadius: "2em",
  },
  componentsItems: {
    marginLeft: "10%",
    marginBottom: "10%",
  },
  buttonSave: {
    marginLeft: "45%",
    marginBottom: "2%",
  },
  centrado: {
    textAlign: "center",
    justifyItems: "center",
    marginBottom: "2%",
  },
  title: {
    marginLeft: "5%",
    marginTop: "3%",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
    marginBottom: "10%",
  },
  input: {
    display: "none",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    marginTop: "5%",
  },
  upload: {
    marginTop: "5%",
  },
  send: {
    marginTop: "10%",
  },
  separate: {
    marginTop: "5%",
  },
  checkbox: {
    marginTop: "5%",
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  separateField: {
    marginTop: "5%",
  },
  separateGoogle: {
    marginTop: "20%",
  },
}));

const meeting = {
  name: {
    presence: { allowEmpty: false, message: "El asunto es requerido" },
  },
  description: {
    presence: { allowEmpty: false, message: "El mensaje es requerido" },
    length: {
      maximum: 64,
      minimum: 1,
    },
  },
  date: {
    presence: { allowEmpty: false, message: "La fecha de inicio es requerida" },
  },
  time: {
    presence: { allowEmpty: false, message: "La hora de inicio es requerida" },
  },
};

const CreateMessageCourse = (props) => {
  const { user } = props;
  const classes = useStyles();
  const [isVirtual, setIsVirtual] = React.useState(false);
  const [tokenGoogle, setTokenGoogle] = React.useState("");
  const [clientId, setClientId] = React.useState("");
  const [clientSectre, setClientSecret] = React.useState("");
  let history = useHistory();

  /* Serve for setting select */
  const dispatch = useDispatch();
  const [meetingState, setMeetingState] = React.useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  const [myCourses, setMyCourses] = React.useState([]);
  const [course, setCourse] = React.useState(0);
  const [open2, setOpen2] = React.useState(false);

  const handleSelectCourse = (event) => {
    setCourse(event.target.value);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleOpen2 = () => {
    setOpen2(true);
  };

  useEffect(() => {
    let route = `/course/teacher/${user}`;
    axios
      .get(route, {
        headers: {
          "x-access-token": props.token,
        },
      })
      .then((result) => {
        setMyCourses(result.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const checkedChange = (event) => {
    setIsVirtual(event.target.checked);
  };

  /* End to save image file */

  const handleChange = (event) => {
    event.persist();

    setMeetingState((meetingState) => ({
      ...meetingState,
      values: {
        ...meetingState.values,
        [event.target.name]: event.target.value,
      },
      touched: {
        ...meetingState.touched,
        [event.target.name]: true,
      },
    }));
  };

  useEffect(() => {
    const errors = validate(meetingState.values, meeting);
    setMeetingState((meetingState) => ({
      ...meetingState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [meetingState.values]);

  const hasError = (field) => {
    return meetingState.touched[field] && meetingState.errors[field]
      ? true
      : false;
  };

  const handleSubmit = (event) => {
    var data = {
      name: meetingState.values.name,
      date: meetingState.values.date,
      time: meetingState.values.time,
      description: meetingState.values.description,
      isVirtual: isVirtual ? "V" : "F",
      teacherId: user,
      courseId: course,
      tokenGoogle: tokenGoogle,
    };

    console.log(data);

    axios
      .post("/meeting/", data, {
        headers: {
          "x-access-token": props.token,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          let message = {
            errorMsg: "Reunión creada con éxito",
            errorType: "success",
          };
          dispatch(showMessage(message));
          history.push("/teacher/");
        }
      })
      .catch((error) => {
        let message1 = "Error";

        switch (error.response.data.error) {
          case "Joining to Google": {
            message1 = "Inicia sesión en Google para crear la reunión.";
            break;
          }
          default: {
            message1 = "Algo salió mal. No fue posible crear la reunión";
          }
        }
        let message2 = {
          errorMsg: message1,
          errorType: "error",
        };
        dispatch(showMessage(message2));
      });
  };

  const responseGoogle = (response) => {
    console.log(response);
    setClientSecret(response.code);
    setTokenGoogle(response.tokenObj.id_token);
  };

  return (
    <div>
      <Grid container className={classes.gridContainer}>
        <Grid item sm={6} className={classes.separate}>
          <form className={classes.root}>
            <Grid item xs={12} className={classes.centrado}>
              <TextField
                className={classes.componentsItems}
                id="standard-basic"
                label="Título"
                name="name"
                onChange={handleChange}
                error={hasError("name")}
                helperText={
                  hasError("name") ? "Debes ingresar un título" : null
                }
              />
            </Grid>
            <Grid item xs={12} className={classes.centrado}>
              <TextField
                id="date"
                label="Fecha de inicio"
                type="date"
                //defaultValue="2021-06-30"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                name="date"
                onChange={handleChange}
                error={hasError("date")}
                helperText={
                  hasError("date") ? "Debes ingresar una fecha de inicio" : null
                }
              />
            </Grid>
            <Grid item xs={12} className={classes.centrado}>
              <TextField
                id="date"
                label="Fecha de inicio"
                type="time"
                //defaultValue="2021-06-30"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                name="time"
                onChange={handleChange}
                error={hasError("time")}
                helperText={
                  hasError("time") ? "Debes ingresar una hora de inicio" : null
                }
              />
            </Grid>

            <Grid item xs={12} className={classes.centrado}>
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Checkbox
                    checked={isVirtual}
                    onChange={checkedChange}
                    name="isVirtual"
                    className={classes.checkbox}
                  />
                }
                label="Reunión virtual"
              />
            </Grid>
          </form>
        </Grid>
        <Grid item sm={6} className={classes.separate}>
          <form className={classes.root}>
            <Grid item xs={12} className={classes.centrado}>
              <TextField
                label="Descripción"
                placeholder="Ingresa enlaces y/o descripción"
                multiline
                rows={4}
                rowsMax={6}
                name="description"
                onChange={handleChange}
                error={hasError("description")}
                helperText={
                  hasError("description")
                    ? "Debes ingresar una descripción"
                    : null
                }
              />
            </Grid>
            <Grid item xs={12} className={classes.centrado}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">
                  Curso destinatario
                </InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={open2}
                  onClose={handleClose2}
                  onOpen={handleOpen2}
                  value={course}
                  onChange={handleSelectCourse}
                >
                  {myCourses.map((crs) => {
                    return (
                      <MenuItem key={crs.id} value={crs.id}>
                        {crs.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} className={classes.centrado}>
              {isVirtual && tokenGoogle === "" ? (
                <div className={classes.separateGoogle}>
                  <GoogleLogin
                    clientId={
                      "139389020461-ftrgtgqmhesju6urnj9dslcjo675p5m3.apps.googleusercontent.com"
                    }
                    accessType={"offline"}
                    //responseType={"code"}
                    buttonText={"Ingresa a Google"}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                    prompt={"consent"}
                    scope={"https://www.googleapis.com/auth/calendar"}
                  />
                </div>
              ) : (
                <></>
              )}
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12} className={classes.centrado}>
          {isVirtual ? (
            <Button
              variant="contained"
              color="primary"
              size="large"
              endIcon={<SendIcon></SendIcon>}
              className={classes.send}
              disabled={
                !meetingState.isValid && isVirtual && tokenGoogle !== ""
              }
              onClick={handleSubmit}
            >
              Crear reunión
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              size="large"
              endIcon={<SendIcon></SendIcon>}
              className={classes.send}
              disabled={!meetingState.isValid}
              onClick={handleSubmit}
            >
              Crear reunión
            </Button>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.login.id,
  token: state.login.accessToken,
});

CreateMessageCourse.propTypes = {
  // instid: PropTypes.any,
  user: PropTypes.number,
  token: PropTypes.string,
};
export default connect(mapStateToProps)(CreateMessageCourse);
