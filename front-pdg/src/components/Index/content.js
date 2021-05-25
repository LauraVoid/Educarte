
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { Grid ,Typography} from "@material-ui/core/";
// import axios from "../../utils/axios";
import Avatar from '@material-ui/core/Avatar'
import imgCience from '../../img/logos/Ciencia.png'
import imgSpanish from '../../img/logos/letras.png'
import imgMath from '../../img/logos/calculador.png'
import imgBody from '../../img/logos/cuerpo.png'


const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
          margin: theme.spacing(1),
        },
      },
      icon: {
        width: 80,
        height: 80,
        
      },
      item: {
        marginLeft: "5%",
      }
      
      
}));

const Content = (props) => {
  const classes = useStyles();

  return (
      <div >         
        
        <Grid container alignItems="center" justify="center" spacing={5} className={classes.item}>
        <Grid item xs={6} sm={3} container direction="column">
        <Avatar alt="Remy Sharp"  className={classes.icon} src={imgSpanish}/>
          <Typography
            className="title"
            color="inherit"
            style={{ color: "white" }}
            gutterBottom            
          >
            Lenguaje
          </Typography>
        </Grid>        
        <Grid item xs={6} sm={3} container direction="column" >
        <Avatar alt="Remy Sharp"  className={classes.icon} src={imgCience}/>        
          <Typography            
            color="inherit"
            style={{ color: "white" }}
            gutterBottom
          >
            Ciencia
          </Typography>
        </Grid>
        <Grid item xs={6} sm={3} container direction="column">
        <Avatar alt="Remy Sharp"  className={classes.icon} src={imgMath}/>
          <Typography
            className="title"
            color="inherit"
            style={{ color: "white" }}
            gutterBottom            
          >
            Matematicas
          </Typography>
        </Grid>

        <Grid item xs={6} sm={3} container direction="column">
        <Avatar alt="Remy Sharp"  className={classes.icon} src={imgBody}/>
          <Typography
            className="title"
            color="inherit"
            style={{ color: "white" }}
            gutterBottom            
          >
            Cuerpo
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
    
  });

  Content.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
  toke: PropTypes.string
  
};

export default connect(mapStateToProps, {})(Content);
