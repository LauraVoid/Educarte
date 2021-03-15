import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const RouteWithLayout = (props) => {
  const {
    layout: Layout,
    persPoliticsaccepted,
    component: Component,
    ...rest
  } = props;

  return (
    <Route
      {...rest}
      render={(matchProps) =>
        !props.public && false ? (
          <Layout>
            {" "}
            <Component {...matchProps} /> <Redirect to="/login" />
          </Layout>
        ) : persPoliticsaccepted === "N" ? (
          <Layout>
            {" "}
            <Component {...matchProps} /> <Redirect to="/home" />
          </Layout>
        ) : (
          <Layout>
            <Component {...matchProps} />
          </Layout>
        )
      }
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  public: PropTypes.bool,
  persPoliticsaccepted: PropTypes.string,
  path: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    //
  };
}

export default connect(mapStateToProps, {})(RouteWithLayout);
