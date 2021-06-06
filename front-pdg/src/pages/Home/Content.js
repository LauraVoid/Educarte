import React , { useState, useEffect } from "react";
import { Grid, Paper } from "@material-ui/core/";
import axios from '../../utils/axios';
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import bgd from "../../img/backgrounds/B7.png";
import ContentBanner from "../../components/Index/content";
import Resource from "../../components/Index/resource";
import { useDispatch } from "react-redux";
import Button from '@material-ui/core/Button';
import filterContent from "../../actions/actionContent";


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
    padding: 5,
    marginLeft: "8%"
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
  const dispatch = useDispatch();

  const [resources, setResources]= useState([])


  useEffect(() => {   
  
    if(props.filter === "no"){
      axios
        .get(`content/`)
        .then((res) => {
           if(res.status === 200){
              setError("No Error")
              setResources(res.data)
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
    }else{
      axios
        .get(`content/filter/`+props.filter)
        .then((res) => {
           if(res.status === 200){
              setError("No Error")
              setResources(res.data)
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
    } 
             

}, [props.filter]);

const handleSubmit = (event) => {
  //console.log(event.target.name)
  let result= "no";
  dispatch(filterContent(result));

}


  return (
    <div className={classes.divContainer}>
         
      <Grid container className={classes.root} justify="center">
        <Paper className={classes.paperBanner} elevation={10}>
          <ContentBanner></ContentBanner>
        </Paper>
        <Grid  item xs={12} sm={12}>
          <Button
              className={classes.iconButton}
              variant="contained"
              color="primary"
              size="small"
              name= "no"
              onClick={handleSubmit}             
            >
              Ver todos
          </Button>
        </Grid>
                   
          {resources.map((res) => {
            return (
              <Grid item xs={6} sm={3}>
              <Paper className={classes.paperStudents} elevation={10}>
                <Resource
                  title={res.title}
                  url={res.link}
                  description={res.description}
                  image={res.image}
                  category= {res.category}                      
                ></Resource>
                </Paper>
                </Grid>
            );
          })}        
      </Grid> 
     
       
    
    </div>
  );
};
const mapStateToProps = (state) => ({
    id: state.login.id,
    name: state.login.name,
    email: state.login.email,
    token: state.login.accessToken,
    filter: state.content.value
});

HomeInstitution.propTypes = {
    id: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
  token: PropTypes.string,
  filter: PropTypes.string,
  // instid: PropTypes.any,
};
export default connect(mapStateToProps)(HomeInstitution);
