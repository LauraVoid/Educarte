import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, IconButton, Typography } from "@material-ui/core";
import ForumIcon from "@material-ui/icons/Forum";
import EventNoteIcon from "@material-ui/icons/EventNote";
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import { connect } from "react-redux";

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

const MenuParent = () => {
  const classes = useStyles();

  return (
    <div>
      <Grid container alignItems="center" justify="center" spacing={5}>
        <Grid item xs={6} sm={3} container direction="column">
          <IconButton
            variant="contained"
            color="primary"
            href="/messagesteacher"
          >
            
              <ForumIcon className={classes.icon} color="action" />
           
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
            Desempeños
          </Typography>
        </Grid>
        <Grid item xs={6} sm={3} container direction="column">
          <IconButton variant="contained" color="primary" href="/teacher">
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
  // instid: state.auth.instId,
});

MenuParent.propTypes = {
  // instid: PropTypes.any,
};
export default connect(mapStateToProps)(MenuParent);
