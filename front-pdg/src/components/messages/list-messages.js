import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  ListItemAvatar,
  Avatar,
  IconButton,
  TextField,
  Divider,
  Button,
} from "@material-ui/core/";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EmailIcon from "@material-ui/icons/Email";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import axios from "../../utils/axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
import Tooltip from "@material-ui/core/Tooltip";
import { useDispatch } from "react-redux";
import { showMessage } from "../../actions/actionMessage";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { blue } from "@material-ui/core/colors";
import PersonIcon from "@material-ui/icons/Person";
import ReplyIcon from "@material-ui/icons/Reply";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Slide from "@material-ui/core/Slide";
import SendIcon from "@material-ui/icons/Send";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  root2: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    marginTop: "3%",
  },
  centrado: {
    textAlign: "center",
    justifyItems: "center",
    marginBottom: "2%",
  },
  progress: {
    position: "fixed",
    zIndex: 50,
    top: "50%",
    left: "50%",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  titleAns: {
    marginLeft: "13%",
  },
  descriptionAns: {
    marginLeft: "13%",
  },
  buttonReply: {
    marginRight: "4%",
  },
  appBar: {
    position: "relative",
  },
  title2: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  dialogFeatures: {
    width: "50%",
    marginTop: "20%",
    marginLeft: "50%",
  },
  textAsunto: {
    width: "100%",
  },
}));

const MessagesExplorer = (props) => {
  const classes = useStyles();
  const { user, token } = props;
  const [messages, setMessages] = useState([]);
  const [viewProgress, setViewProgress] = useState(false);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [emisor, setEmisor] = useState("");
  const [emailEmisor, setEmailEmisor] = useState("");

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen = (arg) => {
    const mssg = Object.assign({}, arg);
    setTitle(mssg.message.title);
    setDescription(mssg.message.message);
    setEmisor(mssg.dataValues.name + " " + mssg.dataValues.lastname);
    setEmailEmisor(mssg.dataValues.email);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  useEffect(() => {
    setOpen(false);
  }, [open2]);

  const handleClickOpen2 = (arg) => {
    const mssg = Object.assign({}, arg);
    setTitle(mssg.message.title);
    setDescription(mssg.message.message);
    setEmisor(mssg.dataValues.name + " " + mssg.dataValues.lastname);
    setEmailEmisor(mssg.dataValues.email);
    setOpen2(true);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);

  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);

  useEffect(() => {
    setViewProgress(true);
    axios
      .get(`/message/teacher/messages/${user}`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((result) => {
        setViewProgress(false);
        setMessages(result.data.messagesTotal);
      })
      .catch(() => {
        let message2 = {
          errorMsg: "Ha ocurrido un error. Inténtalo de nuevo",
          errorType: "error",
        };
        dispatch(showMessage(message2));
        setViewProgress(false);
      });
  }, []);

  const replyMessage = () => {
    setOpen2(false);
    let message2 = {
      errorMsg: "Mensaje enviado con éxito",
      errorType: "success",
    };
    dispatch(showMessage(message2));
  };

  return (
    <div>
      <Paper>
        <Grid container>
          <Grid item xs={12} alignContent="center" alignItems="center">
            <Typography
              variant="h5"
              style={{ color: "black" }}
              className={classes.title}
              align="center"
            >
              Mis mensajes
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <List className={classes.root2}>
              {messages.map((msg) => {
                return (
                  <ListItem
                    key={`${msg.message.id}`}
                    button
                    alignItems="center"
                    onClick={() => handleClickOpen(msg)}
                  >
                    <Grid container>
                      <Grid container sm={4} xs={4}>
                        <Grid item sm={3} xs={12}>
                          <ListItemIcon>
                            <AccountCircleIcon></AccountCircleIcon>
                          </ListItemIcon>
                        </Grid>
                        <Grid item sm={8} xs={12}>
                          <ListItemText
                            id={`${msg.message.id}`}
                            primary={
                              `${msg.dataValues.name}` +
                              ` ` +
                              `${msg.dataValues.lastname}`
                            }
                          />
                        </Grid>
                      </Grid>
                      <Grid item sm={4} xs={4} className={classes.centrado}>
                        <ListItemText
                          id={`${msg.message.id}`}
                          primary={`${msg.message.title}`}
                        />
                      </Grid>
                      <Grid item sm={4} xs={4}>
                        <ListItemSecondaryAction>
                          <Tooltip title="Responder" aria-label="add">
                            <IconButton
                              onClick={() => handleClickOpen2(msg)}
                              edge="end"
                              aria-label="comments"
                            >
                              <EmailIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Marcar como leído" aria-label="add">
                            <IconButton edge="end" aria-label="comments">
                              <DoneOutlineIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Borrar" aria-label="add">
                            <IconButton edge="end" aria-label="comments">
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </ListItemSecondaryAction>
                      </Grid>
                    </Grid>
                    <Divider></Divider>
                  </ListItem>
                );
              })}
            </List>
          </Grid>
          <Dialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              <Grid container>
                <Grid item xs={12}>
                  <ListItem button>
                    <ListItemAvatar>
                      <Avatar className={classes.avatar}>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <Grid container>
                      <Grid item xs={12}>
                        <ListItemText primary={emisor} />
                      </Grid>
                      <Grid item xs={12}>
                        <ListItemText secondary={emailEmisor} />
                      </Grid>
                    </Grid>
                  </ListItem>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    className={classes.titleAns}
                    variant="h6"
                    gutterBottom
                  >
                    {title}
                  </Typography>
                </Grid>
              </Grid>
            </DialogTitle>
            <DialogContent dividers>
              <Typography className={classes.descriptionAns} gutterBottom>
                {description}
              </Typography>
              {/*               <Typography gutterBottom>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur
                et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus
                dolor auctor.
              </Typography> */}
            </DialogContent>
            <DialogActions>
              <Tooltip title="Responder" aria-label="add">
                <IconButton
                  className={classes.buttonReply}
                  edge="end"
                  aria-label="comments"
                  onClick={handleClose}
                >
                  <ReplyIcon />
                </IconButton>
              </Tooltip>
            </DialogActions>
          </Dialog>
          {/* Dialog for repling any messages */}
          <Dialog
            fullScreen
            className={classes.dialogFeatures}
            open={open2}
            onClose={handleClose2}
            TransitionComponent={Transition}
          >
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose2}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title2}>
                  {emisor}
                </Typography>
                <Tooltip title="Enviar" aria-label="add">
                  <IconButton
                    className={classes.buttonReply}
                    edge="end"
                    aria-label="comments"
                    onClick={replyMessage}
                    color="inherit"
                  >
                    <SendIcon color="inherit" />
                  </IconButton>
                </Tooltip>
              </Toolbar>
            </AppBar>
            <List>
              <ListItem>
                <TextField
                  className={classes.textAsunto}
                  id="filled-basic"
                  label="Asunto"
                  variant="filled"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <TextField
                  id="outlined-multiline-static"
                  className={classes.textAsunto}
                  label="Descripción"
                  multiline
                  rows={8}
                  variant="outlined"
                />
              </ListItem>
            </List>
            <DialogActions>
              <Tooltip title="Más opciones" aria-label="add">
                <IconButton
                  className={classes.buttonReply}
                  edge="end"
                  aria-label="comments"
                >
                  <MoreVertIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Adjuntar archivo" aria-label="add">
                <IconButton
                  className={classes.buttonReply}
                  edge="end"
                  aria-label="comments"
                >
                  <AttachFileIcon />
                </IconButton>
              </Tooltip>
            </DialogActions>
          </Dialog>
        </Grid>
        {viewProgress ? (
          <CircularProgress className={classes.progress}></CircularProgress>
        ) : (
          <></>
        )}
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.login.id,
  token: state.login.accessToken,
});

MessagesExplorer.propTypes = {
  user: PropTypes.number,
  token: PropTypes.string,
};
export default connect(mapStateToProps)(MessagesExplorer);
