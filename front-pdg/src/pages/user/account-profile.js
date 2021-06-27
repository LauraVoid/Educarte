import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Box, Container, Grid } from "@material-ui/core";
import AccountProfile from "../../components/account/AccountProfile";
import { makeStyles } from "@material-ui/styles";
import AccountProfileDetails from "../../components/account/AccountProfileDetails";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  box: {
    backgroundColor: "background.default",
    minHeight: "100%",
    py: 3,
  },
  divContainer: {
    backgroundColor: grey[100],
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
}));

const Account = () => {
  const classes = useStyles();
  return (
    <div className={classes.divContainer}>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Helmet>
        <title>Educarte</title>
      </Helmet>
      <Box className={classes.box}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

const mapStateToProps = (state) => ({});

Account.propTypes = {};
export default connect(mapStateToProps)(Account);
