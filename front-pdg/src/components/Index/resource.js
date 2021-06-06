import React from "react";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Paper,
  Button,
  Card,
  CardContent,
} from "@material-ui/core/";
import CardMedia from '@material-ui/core/CardMedia';
import AddIcon from "@material-ui/icons/Add";


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    marginTop: "3%",
  },
  centrado: {
    textAlign: "center",
    justifyItems: "center",
    marginBottom: "2%",
  },
  card: {
    width: "90%",
    justifyItems: "center",
    justifyContent: "center",
    marginLeft: "3%",
    marginBottom: "3%",
    marginTop: "2%",
  },
  media: {
    height: 180,
     // 16:9
  },
}));

const MeetingTeacher = (props) => {
  const { title, url, image, description,category } = props;
  
  const classes = useStyles();
  return (
    <div>
      <Paper>
        <Grid container>
          <Grid item xs={12} alignContent="center" container alignItems="center">
            <Typography
              variant="h5"
              style={{ color: "black" }}
              className={classes.title}
              align="center"
            >
              {title}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Card className={classes.card}>
              <Grid container>
                <CardMedia
                  component="img"
                  className={classes.media}
                  image={'https://pdg-educarte.s3.amazonaws.com/'+image}
                  title={category}
                />

                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    {description}
                  </Typography>
                </CardContent>

              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} className={classes.centrado}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              href={url}
              target="_blank"
              endIcon={<AddIcon />}
            >
              Ver
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => ({
  // instid: state.auth.instId,
});

MeetingTeacher.propTypes = {
  // instid: PropTypes.any,
};
export default connect(mapStateToProps)(MeetingTeacher);
