import React from "react";
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
}));

const messagesTest = [
  { id: "1", sender: "Pepito", description: "Asistencia" },
  { id: "2", sender: "Laura Eustaquia", description: "Nuevo Correo" },
  { id: "3", sender: "David Pancrasio", description: "Calse presencial" },
  { id: "4", sender: "Douglas", description: "Tarea pendiente" },
];

const MessagesExplorer = () => {
  const classes = useStyles();
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
              {messagesTest.map((msg) => {
                return (
                  <ListItem key={`${msg.id}`} button alignItems="center">
                    <ListItemIcon>
                      <AccountCircleIcon></AccountCircleIcon>
                    </ListItemIcon>
                    <Grid container>
                      <Grid item xs={6}>
                        <ListItemText
                          id={`${msg.id}`}
                          primary={`${msg.sender}`}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <ListItemText
                          id={`${msg.id}`}
                          primary={`${msg.description}`}
                        />
                      </Grid>
                    </Grid>
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="comments">
                        <EmailIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="comments">
                        <DoneOutlineIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="comments">
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                    <Divider></Divider>
                  </ListItem>
                );
              })}
            </List>
          </Grid>
          <Grid item xs={12} className={classes.centrado}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              endIcon={<AddIcon />}
            >
              Ver más
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => ({
  // instid: state.auth.instId,
});

MessagesExplorer.propTypes = {
  // instid: PropTypes.any,
};
export default connect(mapStateToProps)(MessagesExplorer);
