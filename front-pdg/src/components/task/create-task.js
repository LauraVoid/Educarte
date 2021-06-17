import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import validate from "validate.js";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { showMessage } from "../../actions/actionMessage";
import axios from "../../utils/axios";
import { useHistory } from "react-router-dom";
import {
  Grid,
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core/";
import FormControl from "@material-ui/core/FormControl";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import SendIcon from "@material-ui/icons/Send";
import { DropzoneDialog } from "material-ui-dropzone";

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

const taskValidate = {
  title: {
    presence: { allowEmpty: false, message: "El título es requerido" },
  },
  endDate: {
    presence: { allowEmpty: false, message: "La fecha límite es requerida" },
  },
  message: {
    presence: {
      allowEmpty: false,
      message: "No puedes dejar este campo vacío",
    },
    length: {
      maximum: 64,
      minimum: 1,
    },
  },
};

const CreateTask = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user, token } = props;
  let history = useHistory();
  const [task, setTask] = React.useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });
  const [resource, setResource] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [myCourses, setMyCourses] = React.useState([]);
  const [course, setCourse] = React.useState(0);

  const handleChange = (event) => {
    event.persist();

    setTask((task) => ({
      ...task,
      values: {
        ...task.values,
        [event.target.name]: event.target.value,
      },
      touched: {
        ...task.touched,
        [event.target.name]: true,
      },
    }));
  };

  useEffect(() => {
    const errors = validate(task.values, taskValidate);
    setTask((task) => ({
      ...task,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [task.values]);

  const hasError = (field) => {
    return task.touched[field] && task.errors[field] ? true : false;
  };

  const handleSelect = (event) => {
    setResource(event.target.value);
  };
  const handleSelectCourse = (event) => {
    setCourse(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
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
          "x-access-token": token,
        },
      })
      .then((result) => {
        setMyCourses(result.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  /*  Method to add a task */
  const handleSubmit = async (event) => {
    let data = {
      title: task.values.title,
      endDate: task.values.endDate,
      message: task.values.message,
      skill: resource,
      attached: "URL",
      courseId: course,
      teacherId: user,
    };
    await axios
      .post("/homework/", data, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        if (res.status >= 200 && res.status <= 304) {
          let message = {
            errorMsg: "Tarea asignada con éxito",
            errorType: "success",
          };
          dispatch(showMessage(message));
          history.push(`/tasks/`);
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

  const handleSave = (file) => {
    setOpen3(false);
  };

  const handleCloseSave = () => {
    setOpen3(false);
  };

  const handleOpen3 = () => {
    setOpen3(true);
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
                name="title"
                onChange={handleChange}
                error={hasError("title")}
                helperText={hasError("title") ? "El título es requerido" : null}
              />
            </Grid>
            <Grid item xs={12} className={classes.centrado}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">
                  Tipo de recurso
                </InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={open}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={resource}
                  onChange={handleSelect}
                >
                  <MenuItem value="Video">Video</MenuItem>
                  <MenuItem value="Game">Juego</MenuItem>
                  <MenuItem value="File">Ficha</MenuItem>
                </Select>
              </FormControl>
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
              <label htmlFor="contained-button-file">
                <Button
                  startIcon={<AddToPhotosIcon />}
                  variant="contained"
                  color="primary"
                  component="span"
                  className={classes.upload}
                  size="small"
                  onClick={handleOpen3.bind(this)}
                >
                  Cargar imagen
                </Button>
                <DropzoneDialog
                  filesLimit={1}
                  dialogTitle="Cargar imagen"
                  cancelButtonText="Cancelar"
                  submitButtonText="Cargar"
                  dropzoneText="Arrastre y suelte un archivo aquí o haga clic"
                  previewText="Previsualización:"
                  open={open3}
                  onSave={handleSave.bind(this)}
                  acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
                  showPreviews={true}
                  maxFileSize={5000000}
                  onClose={handleCloseSave.bind(this)}
                />
              </label>
            </Grid>
          </form>
        </Grid>
        <Grid item sm={6} className={classes.separate}>
          <form className={classes.root}>
            <Grid item xs={12} className={classes.centrado}>
              <TextField
                id="date"
                label="Fecha límite"
                type="date"
                defaultValue="2017-05-24"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                name="endDate"
                onChange={handleChange}
                error={hasError("endDate")}
                helperText={
                  hasError("endDate") ? "Debes ingresar una fecha límite" : null
                }
              />
            </Grid>
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
                  hasError("message") ? "El mensaje es requerido" : null
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
            disabled={!task.isValid}
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
  token: state.login.accessToken,
});

CreateTask.propTypes = {
  user: PropTypes.number,
  token: PropTypes.string,
};
export default connect(mapStateToProps)(CreateTask);
