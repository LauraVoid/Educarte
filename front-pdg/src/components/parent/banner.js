import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, IconButton, Typography, Badge } from "@material-ui/core";
import ForumIcon from "@material-ui/icons/Forum";
import EventNoteIcon from "@material-ui/icons/EventNote";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "../../utils/axios";

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

const MenuParent = (props) => {
  const { user, token } = props;
  const classes = useStyles();
  const [numberMessages, setNumberMessages] = useState(0);

  useEffect(() => {
    axios
      .get(`/message/parent/${user}`, {
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
            href="/messagesparent"
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
            Mensajes
          </Typography>
        </Grid>
        <Grid item xs={6} sm={3} container direction="column">
          <IconButton variant="contained" color="primary" href="/feed">
            <EventNoteIcon className={classes.icon} color="action" />
          </IconButton>
          <Typography
            className="title"
            color="inherit"
            style={{ color: "white" }}
            gutterBottom
            align="center"
          >
            Desempe??os
          </Typography>
        </Grid>
        <Grid item xs={6} sm={3} container direction="column">
          <IconButton variant="contained" color="primary" href="/tasksparent">
            <FormatListBulletedIcon color="action" className={classes.icon} />
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
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.login.id,
  token: state.login.accessToken,
});

MenuParent.propTypes = {
  user: PropTypes.number,
  token: PropTypes.string,
};
export default connect(mapStateToProps)(MenuParent);
