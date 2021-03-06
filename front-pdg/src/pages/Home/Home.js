import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
} from "@material-ui/core";
import bannerHome from "../../img/banners/banner.png";
import kidsImg from "../../img/home/img-kids.png";
import teacher from "../../img/home/access-teacher.png";
import students from "../../img/home/students-mixto.png";
import info from "../../img/home/info.png";
import parent from "../../img/home/padres.png";
import content from "../../img/home/title1.png";
import kindcontent from "../../img/home/kindcontent.png";
import BeenhereIcon from "@material-ui/icons/Beenhere";
import communication from "../../img/home/communication.png";

import "./style/Home.css";

const useStyles = makeStyles((theme) => ({
  botonPersonalizado: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
  root: {
    flexGrow: 1,
  },
  banner: {
    width: "100%",
  },
  content: {
    width: "25%",
    marginLeft: "38%",
  },
  cardsEdu: {
    margin: "2em",
  },
  elementCard: {
    margin: "2em",
  },
  firstSection: {
    background: "#0872ba",
  },
  fifthSection: {
    background: "#6f42c1",
  },
  media: {
    height: 140,
  },
  lyricsEdu: {
    color: "#00af51",
  },
  lyricsEdu2: {
    color: "#FCB716",
    margin: "5%",
  },
  lyricsEdu3: {
    color: "white",
  },
  buttonInfo: {
    background: "#00af51",
    color: "white",
  },
  infoEdu: {
    width: "70%",
    marginLeft: "16%",
  },
}));
export default function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container className={classes.firstSection}>
        <Grid item xs={12}>
          <img
            src={bannerHome}
            className={classes.banner}
            alt="banner-home"
          ></img>
        </Grid>
        <Grid item xs={12}>
          <Box p={10}>
            <Typography variant="h5" align="center">
              Descubre todas las herramientas para mejorar la experiencia de
              aprendizaje b-learning en la educaci??n preescolar
            </Typography>
          </Box>
        </Grid>
      </Grid>
      {/* Here init the second section */}
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={6}>
          <img src={kidsImg} className={classes.banner} alt="banner-home"></img>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box p={9}>
            <Typography variant="h4" align="center">
              Plataforma para el aprendizaje continuo.
            </Typography>
            <br></br>
            <Typography variant="subtitle1" align="left">
              Aula + Aprendizaje a Distancia: es una plataforma que proporciona
              herramientas y experiencias con una alta calidad para el apoyo del
              aprendizaje dentro y fuera de las aulas educativas.
            </Typography>
            <List
              component="nav"
              className={classes.root}
              aria-label="contacts"
            >
              <ListItem text>
                <ListItemIcon>
                  <BeenhereIcon style={{ color: "#d500f9" }}></BeenhereIcon>
                </ListItemIcon>
                <ListItemText primary="Adaptable a los diferentes cambios del entorno de aprendizaje" />
              </ListItem>
              <ListItem text>
                <ListItemIcon>
                  <BeenhereIcon style={{ color: "#00b0ff" }}></BeenhereIcon>
                </ListItemIcon>
                <ListItemText
                  primary="Altamente disponible para una conexi??n continua entre maestros,
                estudiantes y familiares"
                />
              </ListItem>
              <ListItem text>
                <ListItemIcon>
                  <BeenhereIcon style={{ color: "#00e676" }}></BeenhereIcon>
                </ListItemIcon>
                <ListItemText
                  primary="Soporte continuo en los materiales ofrecidos para el aprendizaje
                en los infantes."
                />
              </ListItem>
            </List>
            <Button variant="outlined" color="primary" size="large">
              Conoce m??s
            </Button>
          </Box>
        </Grid>
      </Grid>
      {/* Here init the third section */}
      <Grid container className={classes.root}>
        <Grid container justify="center" className={classes.cardsEdu}>
          <Grid item xs={12} sm={3}>
            <Card Card className={classes.elementCard}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={teacher}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="subtitle1" component="h2">
                    Usuarios
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Las escuelas cuentan con una cuenta ??nica que les permite
                    tener acceso a sus profesores, estudiantes y familiares.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Card Card className={classes.elementCard}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={communication}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="subtitle1" component="h2">
                    Comunicaci??n
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Facilidad para mantener constante comunicaci??n con el
                    estudiante, asignar actividades con contenido personalizado
                    o recomendado por Educarte seg??n la competencia a
                    desarrollar.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Card Card className={classes.elementCard}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={students}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="subtitle1" component="h2">
                    Disponibilidad
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    El estudiante cuenta con toda la experiencia de aprendizaje
                    desde la casa y su escuela
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      {/* Here init the 4 section */}
      <Grid container className={classes.root}>
        <Grid container alignItems="center" justify="center" direction="column">
          <Grid item xs={12} className={classes.elementCard}>
            <Typography
              className={classes.lyricsEdu}
              variant="h4"
              align="center"
            >
              Aprendizaje en conexi??n
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.elementCard}>
            <img src={info} className={classes.infoEdu} alt="info"></img>
          </Grid>
          <Grid item xs={12} sm={12} className={classes.elementCard}>
            <Button
              variant="contained"
              className={classes.buttonInfo}
              size="large"
            >
              M??s informaci??n
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {/* Here init the 5 section */}
      <Grid container className={classes.fifthSection}>
        <Grid item xs={12} sm={6}>
          <Box p={9}>
            <Typography
              variant="h4"
              align="center"
              className={classes.lyricsEdu2}
            >
              Compromiso de los padres
            </Typography>
            <Divider></Divider>
            <Typography
              variant="subtitle1"
              align="left"
              className={classes.lyricsEdu3}
            >
              Los ni??os tienen m??s probabilidades de tener ??xito cuando los
              padres participan en su aprendizaje. Si un ni??o usa Educarte en la
              escuela o desde casa, los padres pueden acceder a las actividades
              que ofrece la plataforma, todo dentro del panel de control para
              padres. Adem??s pueden comunicarse con los profesores encargados e
              incluso la instituci??n educativa.
            </Typography>
            <br></br>

            <Typography
              variant="subtitle1"
              align="left"
              className={classes.lyricsEdu3}
            >
              Lo increible es que el padre va tener m??s oportunidad de que su
              ni??o se eduque, aprenda, desarrolle sus habilidades y capacidades
              incluso cuando las condiciones clim??ticas impidan que los ni??os
              asistan a la escuela.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <img
            src={parent}
            className={classes.banner}
            alt="parent-educarte"
          ></img>
        </Grid>
      </Grid>
      {/* Here init the 6 section. */}
      <Grid container className={classes.root} justify="center">
        <Grid item xs={12}>
          <img
            src={content}
            className={classes.content}
            alt="parent-educarte"
          ></img>
        </Grid>
        <Grid item xs={12}>
          <img
            src={kindcontent}
            className={classes.banner}
            alt="parent-educarte"
          ></img>
        </Grid>
      </Grid>
    </div>
  );
}
