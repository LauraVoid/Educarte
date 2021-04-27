import { Grid } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import axios from '../../utils/axios';
import EyeButton from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from "react-router-dom";
import './style/create-course.css';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        height: "100%",
    },
    grid: {
        height: "100%",
    },
    content: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    contentHeader: {
        display: "flex",
        alignItems: "center",
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    contentBody: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        [theme.breakpoints.down("md")]: {
            justifyContent: "center",
        },
    },
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(8),
        marginRight: theme.spacing(8),
    },
    form: {
        paddingLeft: 100,
        paddingRight: 100,
        paddingBottom: 125,
        flexBasis: 700,
        [theme.breakpoints.down("sm")]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
        },
    },
    title: {
        marginTop: theme.spacing(3),
    },
    createButton: {
        marginTop: theme.spacing(20),
        width: 200,
        // marginLeft: theme.spacing(25),
    },
    gridForm: {
        marginTop: theme.spacing(20),
    },
    gridButton: {
        marginTop: theme.spacing(10),
        [theme.breakpoints.down("md")]: {
            justifyContent: "center",
        },
        [theme.breakpoints.down("xs")]: {
            justifyContent: "center",
        },
    },
    textField: {
        width: 142,
    },
    table: {
        minWidth: 750,
    },
}));

const course = {
    id: {
        length: {
            maximum: 64,
        },
    },
    name: {
        presence: { allowEmpty: false, message: "es requerido" },
        length: {
            maximum: 64,
        },
    }

};

const cellsHead = [
    {
        id: "id",
        numeric: true,
        disablePadding: false,
        label: "Id",
    },
    {
        id: "name",
        numeric: false,
        disablePadding: false,
        label: "Nombre",
    },
    {
        id: "students",
        numeric: false,
        disablePadding: false,
        label: "Estudiantes",
    },
    {
        id: "teacher",
        numeric: false,
        disablePadding: false,
        label: "Profesor",
    },
    {
        id: "functions",
        numeric: false,
        disablePadding: false,
        label: "+",
    },

];



function HeadTable(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox"></TableCell>
                {cellsHead.map((headCell) => (
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
HeadTable.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}
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


const ListCourse = (props) => {
    const dispatch = useDispatch();
    let history = useHistory();
    const classes = useStyles();


    const [courses, setCourses] = useState([]);
    const [teacher, setTeachers] = useState([]);
    const [courSelected, setCourSelected] = React.useState({});
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [totalResults, setTotalResults] = React.useState(0);
    const [dense, setDense] = React.useState(true);
    const [order, setOrder] = React.useState("asc");
    const [reload, setReload] = React.useState(false);
    const [orderBy, setOrderBy] = React.useState("id");
    const [selected, setSelected] = React.useState([]);
    const [activeOpen, setActiveOpen] = React.useState(false);





    const [courseState, setCourseState] = useState({
        isValid: false,
        values: {},
        touched: {},
        errors: {},
    });

    useEffect(() => {
        if (teacher.length === 0) {
            axios
                .get(`course/find/` + props.id)
                .then((res) => {
                    if (res.status === 200) {
                        console.log(res.data)
                        setTeachers(res.data)

                    } else console.log(res.status);
                })
                .catch((err) => console.log(err));

        }

    }, [teacher]);

    const getCourses = () => {
        // setViewProgress(true);
        axios
            .get('course/all/' + props.id)
            .then((res) => {
                if (res.status === 200) {
                    let result = res.data;
                    result.map((course) => {

                        teacher.find((teac) => {
                            if (teac.courseId === course.id) {
                                course.techerName = teac.teacherName;

                            }
                        })
                    })
                    setCourses(result)


                } else console.log(res.status);

            })
            .catch(() => {

                // dispatch(showMessage(message));
            });
    };



    // useEffect(() => {
    //     getCourses();

    // }, [page]);
    useEffect(() => {
        getCourses();

    }, [reload]);


    const handleClickActiveOpen = (row) => {
        setCourSelected(row);
        setActiveOpen(true);
    };
    const handleCloseActive = () => {
        setActiveOpen(false);
    };



    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = course.map((n) => n.name);
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
    function deleteCourse() {
        axios
            .delete(`course/` + courSelected.id)
            .then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    console.log("borrado con éxito");
                    setActiveOpen(false);
                    handleReload();

                } else {
                    console.log("Hubo un error");
                }
            })
            .catch((error) => {
                let message1 = "Error";
                switch (error.response.data.message) {
                    case "The followuptype doesn't exist": {
                        message1 = "El curso que intentas borrar no existe";
                        break;
                    }
                    default: {
                        message1 = "Algo salió mal. No fue posible borrar el curso";
                    }
                }
                //   let message = {
                //     errorMsg: message1,
                //     errorType: "error",
                //   };
                console.log(message1)
                //   dispatch(showMessage(message));
            });

    }
    const handleReload = () => {
        setReload(!reload);
    }


    const isSelected = (name) => selected.indexOf(name) !== -1;




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
                                rowCount={teachers.length}
                            />
                            <TableBody>
                                {stableSort(teachers, getComparator(order, orderBy)).map(
                                    (row, index) => {
                                        const isItemSelected = isSelected(teachers.name);
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        return (
                                            <TableRow
                                                onClick={(event) => handleClick(event, row.id)}
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={row.id}
                                                aria-checked={isItemSelected}
                                            >
                                                <TableCell padding="checkbox"></TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    align="left"
                                                >
                                                    {row.id}
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    align="left"
                                                >
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="left">
                                                    <IconButton
                                                        aria-label="view"
                                                    // onClick={() => {
                                                    //     handleClickOpen(row);
                                                    // }}
                                                    >
                                                        <EyeButton color="disabled" />
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell align="left">{row.phone}</TableCell>
                                                <TableCell align="left">{row.email}</TableCell>
                                                <TableCell align="left">
                                                    <IconButton>
                                                        <EditIcon
                                                            onClick={() => {
                                                                handleClickOpenEdit(row);
                                                            }}
                                                        />
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <IconButton
                                                        onClick={() => {
                                                            handleClickOpen(row);
                                                        }}
                                                    >
                                                        <DeleteForeverIcon></DeleteForeverIcon>
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
                        labelRowsPerPage="Filas por página:"
                        labelDisplayedRows={() =>
                            (totalResults === 0 ? 0 : page + 1) +
                            " de " +
                            numOfPages() +
                            " páginas"
                        }
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
                <Dialog
                    onClose={handleCloseActive}
                    aria-labelledby="customized-dialog-title"
                    open={activeOpen}
                >
                    <DialogTitle id="customized-dialog-title" onClose={handleCloseActive}>
                        Confirmación
                                </DialogTitle>
                    <DialogContent dividers>
                        <Typography gutterBottom>

                            {"¿Está seguro que desea borrar el curso?"}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleCloseActive} color="primary">
                            No
                                    </Button>
                        <Button autoFocus onClick={deleteCourse} color="primary">
                            Sí
                                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Grid>
    );
};

const mapStateToProps = (state) => (
    console.log(state), {

        id: state.login.id,
        name: state.login.name,
        email: state.login.email,
        // instid: state.auth.instId,
    });

ListCourse.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    //instid: PropTypes.any,
};

export default connect(mapStateToProps)(ListCourse);

