import React from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CreateCourse from "../../components/course/create-course";

const Create = (props) => {
    
    return (
      <div >
        { (props.token !== undefined && props.token !== null)? (
          <div>
          <CreateCourse></CreateCourse>
         </div>  
        ):(
          <h1>Ha ocurrido un error intenta más tarde</h1>
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
  Create.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    toke: PropTypes.string

  };
  export default connect(mapStateToProps)(Create);
