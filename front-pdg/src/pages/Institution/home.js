import React , { useState, useEffect } from "react";
import { Grid, Paper } from "@material-ui/core/";
import axios from '../../utils/axios';
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import bgd from "../../img/backgrounds/B7.png";
import BannerInstitution from "../../components/Institution/main";
import Teachers from "../../components/Institution/meetings";

// CSS OF THIS TEMPLATE
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  root2: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  divContainer: {
    backgroundImage: `url(${bgd})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  boxContainer: {
    backgroundColor: "#9c27b0",
    marginLeft: "5%",
    marginRight: "5%",
    marginBottom: "5%",
    borderRadius: "2em",
    padding: "2%",
  },

  title: {
    marginLeft: "3%",
  },
  createStudent: {
    marginBottom: "3%",
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    marginLeft: "4%",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  paperBanner: {
    backgroundColor: "#2196f3",
    marginLeft: "5%",
    marginRight: "5%",
    marginBottom: "3%",
    borderRadius: "2em",
    marginTop: "2%",
    padding: "2%",
    width: "100%",
  },
  paperStudents: {
    backgroundColor: "#d500f9",
    marginLeft: "5%",
    marginRight: "5%",
    marginBottom: "3%",
    borderRadius: "2em",
    marginTop: "2%",
    padding: "2%",
    width: "90%",
  },
  paperMeeting: {
    backgroundColor: "#00e676",
    marginLeft: "5%",
    marginRight: "5%",
    marginBottom: "3%",
    borderRadius: "2em",
    marginTop: "2%",
    padding: "2%",
    width: "90%",
  },
}));

const HomeInstitution = (props) => {
  const classes = useStyles();
  const [reload, setReload] = useState(false);
  const [error, setError]= useState()


  useEffect(() => {
    
        
    axios
        .get(`inst/`, {
          headers: {
            'x-access-token': props.token
          }
        })
        .then((res) => {
           if(res.status === 200){
              setError("No Error")
            }
            
        })
        .catch((err) => {
          if (err.message.includes("403")) {
            setError("Forbidden")          

          } 
          else if(err.message.includes("401")){
            setError("Unauthorized") 

          }

        });   
             

}, [reload]);




  return (
    <div className={classes.divContainer}>
          { (error === "No Error")? (
      <Grid container className={classes.root} justify="center">
        <Paper className={classes.paperBanner} elevation={10}>
          <BannerInstitution></BannerInstitution>
        </Paper>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paperStudents} elevation={10}>
            <Teachers></Teachers>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paperMeeting} elevation={10}>
            <Teachers></Teachers>
          </Paper>
        </Grid>
      </Grid>    
    ):(
      <div>      
        <Grid>
        <h1>{error}</h1>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        </Grid>
      
      </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
    id: state.login.id,
    name: state.login.name,
    email: state.login.email,
    token: state.login.accessToken
});

HomeInstitution.propTypes = {
    id: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
  token: PropTypes.string
  // instid: PropTypes.any,
};
export default connect(mapStateToProps)(HomeInstitution);
