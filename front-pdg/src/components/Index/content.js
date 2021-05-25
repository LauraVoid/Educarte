
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import PeopleIcon from "@material-ui/icons/People";
import SchoolIcon from "@material-ui/icons/School";
import { Grid ,Typography} from "@material-ui/core/";
// import axios from "../../utils/axios";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import IconButton from "@material-ui/core/IconButton";




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
      }
      
      
}));

const Content = (props) => {
  const classes = useStyles();

  return (
      <div >         
        
        <Grid container alignItems="center" justify="center" spacing={5}>
        <Grid item xs={6} sm={3} container direction="column">
          <IconButton
            variant="contained"
            color="primary"
            href="/messagesteacher"
          >
               <HomeWorkIcon color="action" className={classes.icon} />
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
          <IconButton variant="contained" color="primary" href="/teacher">
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

const mapStateToProps = (state) => (
  {

    id: state.login.id,
    name: state.login.name,
    email: state.login.email,
    token: state.login.accessToken
    // instid: state.auth.instId,
  });

  Content.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
  toke: PropTypes.string
  //instid: PropTypes.any,
};

export default connect(mapStateToProps, {})(Content);
