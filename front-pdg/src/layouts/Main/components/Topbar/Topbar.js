import React, { useState } from "react";
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
import NotificationsIcon from "@material-ui/icons/Notifications";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import { withStyles } from "@material-ui/core/styles";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import { showMessage } from "../../../../actions/actionMessage";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

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
  const [anchorEl2, setAnchorEl2] = React.useState(null);

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

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
    dispatch(
      showMessage({
        errorMsg: "Has salido con éxito",
        errorType: "success",
      })
    );
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
      <MenuItem onClick={handleClose} component={RouterLink} to="/profile">
        <ListItemIcon>
          <AccountCircleIcon fontSize="small" />
        </ListItemIcon>
        Mi perfil
      </MenuItem>
      <MenuItem onClick={handleClose} component={RouterLink}>
        <ListItemIcon>
          <NotificationsIcon fontSize="small" />
        </ListItemIcon>
        Notificaciones
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
                to="/profile"
              >
                Mi perfil
              </Button>
              <Button
                startIcon={<NotificationsIcon />}
                className={classes.menuOption}
                variant="text"
                color="inherit"
                onClick={handleClick2}
              >
                Notificaciones
              </Button>
              <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl2}
                keepMounted
                open={Boolean(anchorEl2)}
                onClose={handleClose2}
              >
                <StyledMenuItem>
                  <ListItemIcon>
                    <PeopleAltIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="La reunión está por empezar" />
                </StyledMenuItem>
                <StyledMenuItem>
                  <ListItemIcon>
                    <AccountCircleIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Maria Elena te envió un mensaje." />
                </StyledMenuItem>
                <StyledMenuItem>
                  <ListItemIcon>
                    <AccountCircleIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Carlos Hoyos te envió un mensaje" />
                </StyledMenuItem>
              </StyledMenu>
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
