import React, { useState, useEffect } from "react";
import {
  Grid,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions,
  Typography,
  Divider,
  Button,
  TablePagination,
  Paper,
  IconButton,
  Tooltip,
  DialogContentText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core/";
import clsx from "clsx";
//import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { connect } from "react-redux";
import bgd from "../../img/backgrounds/B7.png";
import PropTypes from "prop-types";
import axios from "../../utils/axios";
import { useDispatch } from "react-redux";
import { showMessage } from "../../actions/actionMessage";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteIcon from "@material-ui/icons/Delete";
import ComputerIcon from "@material-ui/icons/Computer";
import GroupIcon from "@material-ui/icons/Group";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { CopyToClipboard } from "react-copy-to-clipboard";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";

// CSS OF THIS TEMPLATE
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  root2: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  divContainer: {
    backgroundImage: `url(${bgd})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  boxContainer: {
    backgroundColor: "#9c27b0",
    marginLeft: "5%",
    marginRight: "5%",
    marginBottom: "5%",
    borderRadius: "2em",
    padding: "2%",
  },
  boxSearch: {
    backgroundColor: "#ff784e",
    marginLeft: "5%",
    marginRight: "5%",
    marginBottom: "5%",
    borderRadius: "2em",
    padding: "2%",
  },
  title: {
    marginLeft: "3%",
  },
  createStudent: {
    marginBottom: "3%",
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    marginLeft: "4%",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  progress: {
    position: "fixed",
    zIndex: 50,
    top: "50%",
    left: "50%",
  },
  deleteButton: {
    color: "#d50000",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "center",
  },
  column: {
    flexBasis: "33.33%",
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  startButton: {
    color: "#007bb2",
  },
}));

const MeetingAccordionTeacher = (props) => {
  const classes = useStyles();
  const [meetings, setMeetings] = useState([]);
  const [viewProgress, setViewProgress] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [reload, setReload] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [courses, setCourses] = useState([]);
  const [copy, setCopy] = useState(false);
  const [open, setOpen] = useState(false);
  const [meetDelete, setMeetDelete] = useState({});

  const { user, token } = props;

  let dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = (row) => {
    setMeetDelete(row);
    setOpen(true);
  };

  function deleteMeet() {
    setViewProgress(true);
    axios
      .delete(`/meeting/${meetDelete.id}`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          let sendmessage = {
            errorMsg: "Reunión borrada con éxito",
            errorType: "success",
          };
          setReload(!reload);
          setViewProgress(false);
          setOpen(false);
          dispatch(showMessage(sendmessage));
        } else {
          setOpen(false);
          setViewProgress(false);
        }
      })
      .catch((error) => {
        setOpen(false);
        setViewProgress(false);
        let message1 = "mensaje";
        switch (error.response.data.message) {
          case "The id needs to be specified": {
            message1 = "Selecciona un estudiante";
            break;
          }
          case "Student probably to have any course": {
            message1 = "Fue imposible borrar al estudiante. Inténtalo de nuevo";
            break;
          }
          default: {
            message1 = "Algo salió mal. No fue posible borrar el estudiante";
          }
        }
        let message = {
          errorMsg: message1,
          errorType: "error",
        };
        dispatch(showMessage(message));
      });
  }

  useEffect(() => {
    if (copy) {
      let message = {
        errorMsg: "Enlace copiado",
        errorType: "success",
      };
      dispatch(showMessage(message));
      setCopy(false);
    }
  }, [copy]);

  const getNumOfStudents = () => {
    let route = `/meeting/count/${user}`;
    axios
      .get(route, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((response) => {
        setTotalResults(response.data.total);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const getMeetings = () => {
    setViewProgress(true);
    axios
      .get(`/meeting/all/${user}?page=${page}&&limit=${rowsPerPage}`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setMeetings(res.data);
          setViewProgress(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setViewProgress(false);
        let message = {
          errorMsg:
            "Hubo un error al cargar las reuniones, por favor intente más tarde.",
          errorType: "error",
        };
        dispatch(showMessage(message));
      });
  };

  useEffect(() => {
    getNumOfStudents();
    getMeetings();
  }, [page, rowsPerPage]);

  useEffect(() => {
    getNumOfStudents();
    getMeetings();
  }, [reload]);

  const getCourses = async () => {
    await axios
      .get(`/course/teacher/${user}`, {
        headers: {
          "x-access-token": props.token,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setCourses(res.data);
        }
      });
  };

  useEffect(() => {
    if (courses.length === 0) {
      getCourses();
    }
  }, []);

  const numOfPages = () => {
    return Math.ceil(totalResults / rowsPerPage);
  };

  const handleChangePage = (event, newPage) => {
    console.log(event);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeAccordion = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={classes.divContainer}>
      <Paper>
        <Grid container>
          {meetings.length !== 0 ? (
            meetings.map((row, index) => {
              return (
                <Grid xs={12}>
                  <Accordion
                    expanded={expanded}
                    onChange={handleChangeAccordion}
                    id="Accordion"
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1c-content"
                      id="panel1c-header"
                      on
                    >
                      <Grid container>
                        {row.isVirtual === "V" ? (
                          <Grid xs={1}>
                            <ComputerIcon></ComputerIcon>
                          </Grid>
                        ) : (
                          <Grid xs={1}>
                            <GroupIcon></GroupIcon>
                          </Grid>
                        )}

                        <Grid xs={3}>
                          <Typography>Asunto: {row.name}</Typography>
                        </Grid>
                        <Grid xs={3}>
                          <Typography>
                            Curso:{" "}
                            {courses.length !== 0
                              ? courses.find((e) => e.id === row.courseId).name
                              : ""}
                          </Typography>
                        </Grid>
                        <Grid xs={3}>
                          <Typography>
                            Modalidad:{" "}
                            {row.isVirtual === "V"
                              ? "Google Meet"
                              : "Presencial"}
                          </Typography>
                        </Grid>
                      </Grid>
                    </AccordionSummary>
                    <AccordionDetails className={classes.details}>
                      <div className={classes.column} />
                      <div className={classes.column}>
                        <Typography>Descripción: {row.description}</Typography>
                      </div>
                      <div className={clsx(classes.column, classes.helper)}>
                        <Typography variant="caption">
                          Hora de inicio:
                          <br />
                          <a
                            href="#secondary-heading-and-columns"
                            className={classes.link}
                          >
                            {row.date + " " + row.time}
                          </a>
                        </Typography>
                      </div>
                    </AccordionDetails>
                    <Divider />
                    <AccordionActions>
                      {row.isVirtual === "V" ? (
                        <div>
                          <Tooltip title="Iniciar reunión" aria-label="add">
                            <Button
                              className={classes.startButton}
                              size="small"
                              href={row.link}
                              target="_blank"
                            >
                              <PlayCircleFilledWhiteIcon />
                            </Button>
                          </Tooltip>
                          <Tooltip title="Copiar enlace" aria-label="add">
                            <CopyToClipboard
                              text={row.link}
                              onCopy={() => setCopy(true)}
                            >
                              <IconButton edge="end" aria-label="comments">
                                <FileCopyIcon />
                              </IconButton>
                            </CopyToClipboard>
                          </Tooltip>
                          <Tooltip title="Borrar reunión" aria-label="add">
                            <Button
                              className={classes.deleteButton}
                              size="small"
                              onClick={() => {
                                handleClickOpen(row);
                              }}
                            >
                              <DeleteIcon />
                            </Button>
                          </Tooltip>
                        </div>
                      ) : (
                        <Button
                          className={classes.deleteButton}
                          onClick={() => {
                            handleClickOpen(row);
                          }}
                          size="small"
                        >
                          <DeleteIcon />
                        </Button>
                      )}
                    </AccordionActions>
                  </Accordion>
                </Grid>
              );
            })
          ) : (
            <Typography variant="h1" color="initial"></Typography>
          )}
        </Grid>
        <TablePagination
          style={{ fontSize: "14px" }}
          rowsPerPageOptions={[5, 10, 25, 50]}
          labelDisplayedRows={() =>
            (totalResults === 0 ? 0 : page + 1) +
            " de " +
            numOfPages() +
            " páginas"
          }
          component="div"
          labelRowsPerPage="Filas por página:"
          count={totalResults}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        {viewProgress ? (
          <CircularProgress className={classes.progress}></CircularProgress>
        ) : (
          <></>
        )}
      </Paper>
      {/* Dialog for delete a student */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Advertencia"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Está seguro que desea borrar la reunión?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            NO
          </Button>
          <Button onClick={deleteMeet} color="primary" autoFocus>
            SÍ
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog to edit a student */}
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.login.id,
  token: state.login.accessToken,
});

MeetingAccordionTeacher.propTypes = {
  user: PropTypes.number,
  token: PropTypes.string,
};
export default connect(mapStateToProps)(MeetingAccordionTeacher);
