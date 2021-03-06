import React, { useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { Grid, Button } from "@material-ui/core/";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import EmailIcon from "@material-ui/icons/Email";
import VisibilityIcon from "@material-ui/icons/Visibility";
import axios from "../../utils/axios";
import { useDispatch } from "react-redux";
import { showMessage } from "../../actions/actionMessage";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogEdit from "./dialog-edit";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  container: {
    overflow: "auto",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: "50px",
    padding: "10px",
    margin: "10px",
  },
  progress: {
    position: "fixed",
    zIndex: 50,
    top: "50%",
    left: "50%",
  },
}));

const headCells = [
  {
    id: "numberregister",
    numeric: true,
    disablePadding: false,
    label: "N?? de registro",
  },
  { id: "name", numeric: false, disablePadding: false, label: "Nombres" },
  { id: "lastname", numeric: false, disablePadding: false, label: "Apellidos" },
  {
    id: "datebirthday",
    numeric: false,
    disablePadding: false,
    label: "Fecha de nacimiento",
  },
  {
    id: "username",
    numeric: false,
    disablePadding: false,
    label: "Usuario",
  },
  {
    id: "parent",
    numeric: false,
    disablePadding: false,
    label: "Acudiente",
  },
  {
    id: "sendMessage",
    numeric: false,
    disablePadding: false,
    label: "Enviar mensaje",
  },
  {
    id: "editStudent",
    numeric: false,
    disablePadding: false,
    label: "Editar",
  },
  {
    id: "deleteStudent",
    numeric: false,
    disablePadding: false,
    label: "Eliminar",
  },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "left" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

function EnhancedTable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [totalResults, setTotalResults] = React.useState(0);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories"); ///change by other thing
  const [selected, setSelected] = React.useState([]);
  const [reload, setReload] = React.useState(false);
  const [viewProgress, setViewProgress] = React.useState(false);
  const [dense, setDense] = React.useState(true);
  const [openEdit, setOpenEdit] = React.useState(false);
  //Store all student
  const [students, setStudents] = React.useState([]);

  const [studentSelected, setStudentSelected] = React.useState([]);

  const [open, setOpen] = React.useState(false);

  const handleReload = () => {
    setReload(!reload);
  };

  const handleClickOpen = (row) => {
    setStudentSelected(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleClickOpenEdit = (row) => {
    setStudentSelected(row);
    setOpenEdit(true);
  };

  const getStudents = () => {
    setViewProgress(true);
    axios
      .get(`/student?page=${page}&&limit=${rowsPerPage}`)
      .then((res) => {
        if (res.status === 200) {
          setStudents(res.data);
          setViewProgress(false);
        }
      })
      .catch(() => {
        setViewProgress(false);
        let message = {
          errorMsg:
            "Hubo un error al cargar los estudiantes, por favor intente m??s tarde.",
          errorType: "error",
        };
        dispatch(showMessage(message));
      });
  };

  const getNumOfStudents = () => {
    let route = `/student/count`;
    axios
      .get(route)
      .then((response) => {
        setTotalResults(response.data.total);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getNumOfStudents();
    getStudents();
  }, [page, rowsPerPage]);

  useEffect(() => {
    getNumOfStudents();
    getStudents();
  }, [reload]);

  const numOfPages = () => {
    return Math.ceil(totalResults / rowsPerPage);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = students.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  function deleteStudent() {
    setViewProgress(true);

    axios
      .delete(`/student/${studentSelected.id}`)
      .then((res) => {
        if (res.status === 200) {
          let sendmessage = {
            errorMsg: "Estudiante borrado con ??xito",
            errorType: "success",
          };
          setReload(!reload);
          setViewProgress(false);
          setOpen(false);
          dispatch(showMessage(sendmessage));
        } else {
          setOpen(false);
          setViewProgress(false);
          console.log("hubo un error");
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
            message1 = "Fue imposible borrar al estudiante. Int??ntalo de nuevo";
            break;
          }
          default: {
            message1 = "Algo sali?? mal. No fue posible borrar el estudiante";
          }
        }
        let message = {
          errorMsg: message1,
          errorType: "error",
        };
        dispatch(showMessage(message));
      });
  }

  return (
    <Grid container>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={students.length}
              />
              <TableBody>
                {stableSort(students, getComparator(order, orderBy)).map(
                  (row, index) => {
                    const isItemSelected = isSelected(students.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        onClick={(event) => handleClick(event, row.id)}
                        tabIndex={-1}
                        key={row.id}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox"></TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          align="left"
                        >
                          {row.idDocument}
                        </TableCell>
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="left">{row.lastname}</TableCell>
                        <TableCell align="left">{row.dateBirthday}</TableCell>
                        <TableCell align="left">{row.username}</TableCell>
                        <TableCell align="left">
                          <IconButton>
                            <VisibilityIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell align="left">
                          <IconButton>
                            <EmailIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <IconButton>
                            <EditIcon
                              onClick={() => {
                                handleClickOpenEdit(row);
                              }}
                            />
                          </IconButton>
                        </TableCell>
                        <TableCell align="left">
                          <IconButton>
                            <DeleteForeverIcon
                              onClick={() => {
                                handleClickOpen(row);
                              }}
                            ></DeleteForeverIcon>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            style={{ fontSize: "14px" }}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalResults}
            labelRowsPerPage="Filas por p??gina:"
            labelDisplayedRows={() =>
              (totalResults === 0 ? 0 : page + 1) +
              " de " +
              numOfPages() +
              " p??ginas"
            }
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          style={{ color: "white" }}
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Ajustar tabla"
        />
        {/* Dialog for delete a student */}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Advertencia"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              ??Est?? seguro que desea borrar el estudiante?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              NO
            </Button>
            <Button onClick={deleteStudent} color="primary" autoFocus>
              S??
            </Button>
          </DialogActions>
        </Dialog>
        {/* Dialog to edit a student */}
        <Dialog
          open={openEdit}
          onClose={handleCloseEdit}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Editar estudiante"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <DialogEdit
                closeEdit={handleCloseEdit}
                reload={reload}
                handleReload={handleReload}
                studentSelected={studentSelected}
              ></DialogEdit>
            </DialogContentText>
          </DialogContent>
        </Dialog>
        {viewProgress ? (
          <CircularProgress className={classes.progress}></CircularProgress>
        ) : (
          <></>
        )}
      </div>
    </Grid>
  );
}
const mapStateToProps = (state) => ({
  // instid: state.auth.instId,
});

EnhancedTable.propTypes = {
  // instid: PropTypes.any,
};
export default connect(mapStateToProps)(EnhancedTable);
