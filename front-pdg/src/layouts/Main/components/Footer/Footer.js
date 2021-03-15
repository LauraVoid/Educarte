import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Grid, Button } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import GitHubIcon from "@material-ui/icons/GitHub";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > svg": {
      margin: theme.spacing(2),
    },
  },
  options: {
    fontFamily: "arial",
    color: "white",
  },
  bottom: {
    marginTop: "2%",
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <AppBar position="static" color="primary">
      <Grid
        container
        alignItems="center"
        justify="center"
        direction="column"
        className={classes.bottom}
      >
        <Grid item xs={12}>
          <div className={classes.root}>
            <Button className={classes.options} size="small">
              Inicio
            </Button>
            <Button className={classes.options} size="small">
              Sobre nosotros
            </Button>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.root}>
            <HomeIcon></HomeIcon>
            <FacebookIcon></FacebookIcon>
            <InstagramIcon></InstagramIcon>
            <GitHubIcon></GitHubIcon>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Toolbar>
            <Typography variant="body1" color="inherit" align="center">
              © 2021 Educarte
            </Typography>
          </Toolbar>
        </Grid>
      </Grid>
    </AppBar>
  );
}
