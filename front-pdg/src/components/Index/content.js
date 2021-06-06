
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { Grid ,Typography} from "@material-ui/core/";
import { useDispatch } from "react-redux";
// import axios from "../../utils/axios";
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button';
import filterContent from "../../actions/actionContent";



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
        marginLeft: "1%",
      }
      
      
}));

const Content = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {

    let filter= event.target.alt    
    dispatch(filterContent(filter));
      
   

  }

  return (
      <div >         
        
        <Grid container alignItems="center" justify="center" spacing={5} className={classes.item}>
        <Grid item xs={6} sm={3} container direction="column">
        <Button
        name="Lenguaje"
        onClick={handleSubmit}>
        <Avatar alt="Lenguaje"  className={classes.icon} src='https://pdg-educarte.s3.amazonaws.com/let.png'/>        
          </Button>
          <Typography
            className="title"
            color="inherit"
            style={{ color: "white" }}
            align='center'
            gutterBottom            
          >
            Lenguaje
          </Typography>
        </Grid>        
        <Grid item xs={6} sm={3} container direction="column" >
        <Button
        onClick={handleSubmit}>
        <Avatar alt="Ciencia"  className={classes.icon} src='https://pdg-educarte.s3.amazonaws.com/cie.png'/>
        </Button>       
          <Typography            
            color="inherit"
            style={{ color: "white" }}
            align='center'
            gutterBottom
          >
            Ciencia
          </Typography>
        </Grid>
        <Grid item xs={6} sm={3} container direction="column">
        <Button
        onClick={handleSubmit}>
        <Avatar alt="Matematicas"  className={classes.icon} src='https://pdg-educarte.s3.amazonaws.com/mat.png'/>
        </Button>
          <Typography
            className="title"
            color="inherit"
            style={{ color: "white" }}
            align='center'
            gutterBottom            
          >
            Matematicas
          </Typography>
        </Grid>

        <Grid item xs={6} sm={3} container direction="column">
        <Button 
        onClick={handleSubmit}>
        <Avatar alt="Cuerpo"  className={classes.icon} src='https://pdg-educarte.s3.amazonaws.com/body.png'/>
        </Button>
          <Typography
            className="title"
            color="inherit"
            style={{ color: "white" }}
            align='center'
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
