import React , { useState, useEffect } from "react";
import { Grid, Paper } from "@material-ui/core/";
import axios from '../../utils/axios';
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import bgd from "../../img/backgrounds/B7.png";
import ContentBanner from "../../components/Index/content";
import Resource from "../../components/Index/resource";


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
    marginLeft: "10%",
    marginRight: "10%",
    marginBottom: "10%",
    borderRadius: "2em",
    marginTop: "5%",
    padding: "5%",
    width: "80%",
  },
 
}));

const HomeInstitution = (props) => {

  const classes = useStyles();
  const [reload, setReload] = useState(false);
  const [error, setError]= useState()


//   useEffect(() => {
    
        
//     axios
//         .get(`inst/`, {
//           headers: {
//             'x-access-token': props.token
//           }
//         })
//         .then((res) => {
//            if(res.status === 200){
//               setError("No Error")
//             }
            
//         })
//         .catch((err) => {
//           if (err.message.includes("403")) {
//             setError("Forbidden")          

//           } 
//           else if(err.message.includes("401")){
//             setError("Unauthorized") 

//           }

//         });   
             

// }, [reload]);




  return (
    <div className={classes.divContainer}>
         
      <Grid container className={classes.root} justify="center">
        <Paper className={classes.paperBanner} elevation={10}>
          <ContentBanner></ContentBanner>
        </Paper>

        <Grid item xs={6} sm={3}>
          <Paper className={classes.paperStudents} elevation={10}>
            <Resource
             title="Cuerpo"
              url="www.google.com"
              image="mi imagen" 
            ></Resource>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paperStudents} elevation={10}>
            <Resource
            title="Cuerpo"
            url="www.google.com"
            image="mi imagen"
            ></Resource>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paperStudents} elevation={10}>
            <Resource
            title="Cuerpo"
            url="www.google.com"
            image="mi imagen"
            ></Resource>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paperStudents} elevation={10}>
            <Resource
            title="Cuerpo"
            url="www.google.com"
            image="mi imagen"
            ></Resource>
          </Paper>
        </Grid>
        
      </Grid> 
     
       
    
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
