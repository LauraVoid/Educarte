import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, IconButton, Typography, Badge } from "@material-ui/core";
import ForumIcon from "@material-ui/icons/Forum";
import EventNoteIcon from "@material-ui/icons/EventNote";
import PeopleIcon from "@material-ui/icons/People";
import SchoolIcon from "@material-ui/icons/School";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "../../../utils/axios";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  icon: {
    width: 60,
    height: 60,
  },
  item: {
    marginLeft: "5%",
  },
}));

const MenuTeacher = (props) => {
  const classes = useStyles();
  const [numberMessages, setNumberMessages] = useState(0);
  const { user, token } = props;

  useEffect(() => {
    axios
      .get(`/message/teacher/${user}`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setNumberMessages(res.data.total);
        }
      });
  }, []);

  return (
    <div>
      <Grid container alignItems="center" justify="center" spacing={5}>
        <Grid item xs={6} sm={3} container direction="column">
          <IconButton
            variant="contained"
            color="primary"
            href="/messagesteacher"
          >
            <Badge color="error" badgeContent={numberMessages}>
              <ForumIcon className={classes.icon} color="action" />
            </Badge>
          </IconButton>
          <Typography
            className="title"
            color="inherit"
            style={{ color: "white" }}
            gutterBottom
            align="center"
          >
            Mis mensajes
          </Typography>
        </Grid>
        <Grid item xs={6} sm={3} container direction="column">
          <IconButton variant="contained" color="primary" href="/tasks">
            <EventNoteIcon className={classes.icon} color="action" />
          </IconButton>
          <Typography
            className="title"
            color="inherit"
            style={{ color: "white" }}
            gutterBottom
            align="center"
          >
            Ver tareas
          </Typography>
        </Grid>
        <Grid item xs={6} sm={3} container direction="column">
          <IconButton variant="contained" color="primary" href="/createmeeting">
            <PeopleIcon color="action" className={classes.icon} />
          </IconButton>
          <Typography
            className="title"
            color="inherit"
            style={{ color: "white" }}
            gutterBottom
            align="center"
          >
            Crear reunión
          </Typography>
        </Grid>
        <Grid item xs={6} sm={3} container direction="column">
          <IconButton variant="contained" color="primary" href="/teacher">
            <SchoolIcon className={classes.icon} color="action" />
          </IconButton>
          <Typography
            className="title"
            color="inherit"
            style={{ color: "white" }}
            gutterBottom
            align="center"
          >
            Explorar material
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.login.id,
  token: state.login.accessToken,
});

MenuTeacher.propTypes = {
  user: PropTypes.number,
  token: PropTypes.string,
};
export default connect(mapStateToProps)(MenuTeacher);
