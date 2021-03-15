import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import logo192 from "../../../img/logos/logo192.png";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
//import MoreIcon from "@material-ui/icons/MoreVert";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import EmailIcon from "@material-ui/icons/Email";

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
  const { className, ...rest } = props;
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  //const [anchorDesktop, serAnchorDesktop] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <AccountCircleIcon fontSize="small" />
        </ListItemIcon>
        Ingresar
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <ContactSupportIcon fontSize="small" />
        </ListItemIcon>
        Acerca de nosotros
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <EmailIcon fontSize="small" />
        </ListItemIcon>
        Contáctanos
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
          <RouterLink to="/home">
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
                className={classes.menuOption}
                variant="text"
                color="inherit"
                startIcon={<ContactSupportIcon />}
              >
                Acerca de nosotros
              </Button>
              <Button
                className={classes.menuOption}
                variant="text"
                color="inherit"
                startIcon={<EmailIcon />}
              >
                Contáctanos
              </Button>
              <Button
                startIcon={<AccountCircleIcon />}
                className={classes.menuOption}
                variant="text"
                color="inherit"
              >
                Ingresar
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

Topbar.propTypes = {
  className: PropTypes.string,
};

export default Topbar;
