import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import moment from "moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  typoH3: {
    fontWeight: 500,
    fontSize: 24,
    letterSpacing: "-0.06px",
  },
  box: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  avatar: {
    height: 100,
    width: 100,
  },
}));

const user2 = {
  city: "Cali",
  country: "COLOMBIA",
  jobTitle: "Profesor",
  name: "Katarina Smith",
  timezone: "Cali",
};

const AccountProfile = (props) => {
  const { user, name, lastname, email, rol } = props;
  const classes = useStyles();
  return (
    <Card {...props}>
      <CardContent>
        <Box className={classes.box}>
          <Avatar className={classes.avatar} />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
            className={classes.typoH3}
          >
            {name + " " + lastname}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {`${user2.city} ${user2.country}`}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {`${moment().format("hh:mm A")} ${user2.timezone}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" fullWidth variant="text">
          SUBIR FOTO
        </Button>
      </CardActions>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  user: state.login.id,
  name: state.login.name,
  lastname: state.login.lastname,
  email: state.login.email,
  rol: state.login.roles,
  token: state.login.accessToken,
});

AccountProfile.propTypes = {
  user: PropTypes.number,
  name: PropTypes.string,
  lastname: PropTypes.string,
  email: PropTypes.string,
  rol: PropTypes.number,
  token: PropTypes.string,
};

export default connect(mapStateToProps)(AccountProfile);
