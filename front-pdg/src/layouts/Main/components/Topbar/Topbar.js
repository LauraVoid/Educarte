import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import logo192 from "../../../../img/logos/logo192.png";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
//import MoreIcon from "@material-ui/icons/MoreVert";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useDispatch } from "react-redux";
import logOut from "../../../../actions/singOut";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  root: {
    boxShadow: "none",
  },
  text: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontSize: 20,
    color: "white",
    paddingLeft: 10,
  },
  menuOption: {
    fontFamily: "Segoe UI",
    fontStyle: "normal",
    fontSize: 11,
    color: "black",
    paddingLeft: 5,
  },
  title: {
    flexGrow: 1,
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
}));

const Topbar = (props) => {
  const { user } = props;
  const dispatch = useDispatch();
  const { className, ...rest } = props;
  const classes = useStyles();
  const { redirect, setRedirect } = useState("/");

  const [anchorEl, setAnchorEl] = useState(null);
  //const [anchorDesktop, serAnchorDesktop] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const singOut = (event) => {
    dispatch(logOut());
  };

  //Queda pendiente roleId de parent y admin
  const redirectHome = () => {
    if (user === 1) {
      return "/teacher";
    } else if (user === 3) {
      return "/student";
    }
  };

  const renderMenu = (
    <Menu
      id="primary-search-account-menu"
      anchorEl={anchorEl}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose} component={RouterLink}>
        <ListItemIcon>
          <AccountCircleIcon fontSize="small" />
        </ListItemIcon>
        Mi perfil
      </MenuItem>
      <MenuItem onClick={handleClose} component={RouterLink} to="/">
        <ListItemIcon>
          <ExitToAppIcon fontSize="small" />
        </ListItemIcon>
        Cerrar sesión
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar
        {...rest}
        className={clsx(classes.root, className)}
        position="fixed"
        color="inherit"
      >
        <Toolbar variant="dense">
          <RouterLink to={redirectHome}>
            <img height="55px" alt="logo" src={logo192} />
          </RouterLink>
          <div className={classes.grow}>
            <div className={classes.sectionDesktop}>
              <Typography
                className={classes.title}
                variant="h6"
                color="initial"
              ></Typography>
              <Button
                startIcon={<AccountCircleIcon />}
                className={classes.menuOption}
                variant="text"
                color="inherit"
                component={RouterLink}
              >
                Mi perfil
              </Button>
              <Button
                startIcon={<ExitToAppIcon />}
                className={classes.menuOption}
                variant="text"
                color="inherit"
                component={RouterLink}
                onClick={singOut}
                to="/"
              >
                Cerrar sesión
              </Button>
            </div>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls="primary-search-account-menu-mobile"
              aria-haspopup="true"
              onClick={handleClick}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.login.roles,
});

Topbar.propTypes = {
  className: PropTypes.string,
  user: PropTypes.number,
};
export default connect(mapStateToProps)(Topbar);
