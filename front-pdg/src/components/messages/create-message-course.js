import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { Grid, TextField, Button, InputAdornment } from "@material-ui/core/";
import { Autocomplete } from "@material-ui/lab";
import FormControl from "@material-ui/core/FormControl";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import SendIcon from "@material-ui/icons/Send";
import { useDispatch } from "react-redux";
import validate from "validate.js";
import axios from "../../utils/axios";
import GroupIcon from "@material-ui/icons/Group";
import { showMessage } from "../../actions/actionMessage";

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
}));

const message = {
  title: {
    presence: { allowEmpty: false, message: "El asunto es requerido" },
  },
  message: {
    presence: { allowEmpty: false, message: "El mensaje es requerido" },
    length: {
      maximum: 64,
      minimum: 1,
    },
  },
};

const CreateMessageCourse = (props) => {
  const { user } = props;
  const classes = useStyles();
  /* Serve for setting select */
  const [receiver, setReceiver] = React.useState("");
  const [receivers, setReceivers] = React.useState([]);
  const dispatch = useDispatch();
  const [messageState, setMessageState] = React.useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  const handleChange = (event) => {
    event.persist();

    setMessageState((messageState) => ({
      ...messageState,
      values: {
        ...messageState.values,
        [event.target.name]: event.target.value,
      },
      touched: {
        ...messageState.touched,
        [event.target.name]: true,
      },
    }));
  };

  useEffect(() => {
    const errors = validate(messageState.values, message);
    setMessageState((messageState) => ({
      ...messageState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [messageState.values]);

  const hasError = (field) => {
    return messageState.touched[field] && messageState.errors[field]
      ? true
      : false;
  };

  /* All receivers that logged teacher know. 
  That's mean that he only can see the parent 
  who have children in some course with this teacher */
  useEffect(() => {
    if (receivers.length === 0) {
      axios.get(`/teacher/courses/${user}`).then((res) => {
        console.log(res.data);
        setReceivers(res.data);
      });
    }
  }, [receivers]);

  const getReceivers = () => {
    if (receivers.length !== 0) {
      return receivers;
    } else return [];
  };

  const handleSubmit = (event) => {
    var fdate = new Date();
    var data = {
      title: messageState.values.title,
      date:
        fdate.getDate() + "/" + fdate.getMonth() + "/" + fdate.getFullYear(),
      message: messageState.values.message,
      roleReceiver: "course",
      receiver: receiver.id,
      teacher: user.id, //como obtener el Id del teacher
    };

    axios
      .post("/message/", data)
      .then((res) => {
        if (res.status === 200) {
          let message = {
            errorMsg: "Mensaje enviado con éxito",
            errorType: "success",
          };
          dispatch(showMessage(message));
        }
      })
      .catch((error) => {
        let message2 = {
          errorMsg: "Ha ocurrido un error",
          errorType: "error",
        };
        dispatch(showMessage(message2));
      });
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
                label="Asunto"
                name="title"
                onChange={handleChange}
                error={hasError("title")}
                helperText={
                  hasError("title") ? "Debes ingresar un asunto" : null
                }
              />
            </Grid>
            <Grid item xs={12} className={classes.centrado}>
              <FormControl className={classes.formControl}>
                {/* <InputLabel id="demo-controlled-open-select-label">
                  Destinatario
                </InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={open}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={receiver}
                  onChange={handleSelect}
                  
                >
                  {receivers.map((crs) => {
                    return (
                      <MenuItem key={crs.id} value={crs.id}>
                        {crs.name} {crs.lastname}
                      </MenuItem>
                    );
                  })}
                </Select> */}
                <Autocomplete
                  id="clear-on-escape"
                  options={getReceivers()}
                  getOptionLabel={(option) =>
                    option !== "" ? option.name : option
                  }
                  clearOnEscape
                  style={{ width: "100%" }}
                  value={receiver}
                  onChange={(event, newValue) => {
                    event.persist();
                    setReceiver(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      label="Mis cursos"
                      {...params}
                      margin="normal"
                      id="standard-basic"
                      error={receiver === null}
                      helperText={
                        receivers.lengt === 0
                          ? "Aún no existen acudientes asignados para ti"
                          : receiver === null
                          ? "Debes escoger un curso"
                          : null
                      }
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <GroupIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} className={classes.centrado}>
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button
                  startIcon={<AddToPhotosIcon />}
                  variant="contained"
                  color="primary"
                  component="span"
                  className={classes.upload}
                  size="small"
                >
                  Adjuntar imagen
                </Button>
              </label>
            </Grid>
          </form>
        </Grid>
        <Grid item sm={6} className={classes.separate}>
          <form className={classes.root}>
            <Grid item xs={12} className={classes.centrado}>
              <TextField
                label="Mensaje"
                placeholder="Ingresa enlaces y/o descripción"
                multiline
                rows={4}
                rowsMax={6}
                name="message"
                onChange={handleChange}
                error={hasError("message")}
                helperText={
                  hasError("message") ? "Debes ingresar una descripción" : null
                }
              />
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12} className={classes.centrado}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            endIcon={<SendIcon></SendIcon>}
            className={classes.send}
            disabled={
              !messageState.isValid || receiver === "" || receiver === null
            }
            onClick={handleSubmit}
          >
            Enviar
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.login.id,
});

CreateMessageCourse.propTypes = {
  // instid: PropTypes.any,
};
export default connect(mapStateToProps)(CreateMessageCourse);
