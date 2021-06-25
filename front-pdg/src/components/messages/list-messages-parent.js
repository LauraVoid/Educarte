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
  IconButton,
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

const useStyles = makeStyles((theme) => ({
  root: {
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
}));

const MessagesExplorer = (props) => {
  const classes = useStyles();
  const { user, token } = props;
  const [messages, setMessages] = useState([]);
  const [viewProgress, setViewProgress] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setViewProgress(true);
    axios
      .get(`/message/parent/messages/${user}`, {
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
            <List className={classes.root}>
              {messages.map((msg) => {
                return (
                  <ListItem
                    key={`${msg.message.id}`}
                    button
                    alignItems="center"
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
                            <IconButton edge="end" aria-label="comments">
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
          {/*          <Grid item xs={12} className={classes.centrado}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              endIcon={<AddIcon />}
            >
              Ver más
            </Button>
          </Grid> */}
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
