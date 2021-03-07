import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import "./style/Home.css";

const useStyles = (theme) => ({
  botonPersonalizado: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
});
class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <span>Hola, soy el home</span>
        <Button className={classes.botonPersonalizado}>
          OPRIMEME MALDITO OPRESOR
        </Button>
      </div>
    );
  }
}
export default withStyles(useStyles)(Home);
