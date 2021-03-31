import React from "react";
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
import FormControl from "@material-ui/core/FormControl";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import SendIcon from "@material-ui/icons/Send";

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

const CreateTeacher = () => {
  const classes = useStyles();
  /* Serve for setting select */
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
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
                  value={age}
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Video</MenuItem>
                  <MenuItem value={20}>Juego</MenuItem>
                  <MenuItem value={30}>Ficha</MenuItem>
                </Select>
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
                  Cargar imagen
                </Button>
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
              />
            </Grid>
            <Grid item xs={12} className={classes.centrado}>
              <TextField
                label="Mensaje"
                placeholder="Ingresa enlaces y/o descripción"
                multiline
                rows={4}
                rowsMax={6}
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
          >
            Enviar
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  // instid: state.auth.instId,
});

CreateTeacher.propTypes = {
  // instid: PropTypes.any,
};
export default connect(mapStateToProps)(CreateTeacher);
