import React from "react";
import { Grid, Box, Button } from "@material-ui/core/";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import bgd from "../../img/backgrounds/B7.png";
import ListFeedback from "../../components/parent/list-feedback";

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
  boxSearch: {
    backgroundColor: "#ff784e",
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
}));

const CourseExplorer = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.divContainer}>
      
        <div>
         <Grid container>
         <Grid item xs={12} sm={12}>
           <h1 className={classes.title}>Desempeños</h1>
         </Grid>
       </Grid>
       <Grid container className={classes.root} justify="center">
         <Grid item xs={12} sm={12}>
           <Box
             className={classes.boxContainer}
             color="text.primary"
             justifyContent="center"
           >
             <div className={classes.sectionDesktop}>
               
             </div>
             <div className={classes.sectionMobile}>
               <Grid item xs={12} className={classes.createStudent}>
                 <Button
                   size="small"
                   variant="contained"
                   color="primary"
                   href="/parent"
                 >
                   Volver
                 </Button>
               </Grid>
             </div>
             <Grid item xs={12} sm={12}>
               <ListFeedback></ListFeedback>
             </Grid>
           </Box>
         </Grid>
       </Grid>
       </div>       
  </div>
      
     
  );
};
const mapStateToProps = (state) => ({
  id: state.login.id,
    name: state.login.name,
    email: state.login.email,
    token: state.login.accessToken
  
});

CourseExplorer.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
  toke: PropTypes.string
  // instid: PropTypes.any,
};
export default connect(mapStateToProps)(CourseExplorer);
