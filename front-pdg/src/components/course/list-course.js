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
import TablePagination from "@material-ui/core/TablePagination";
import TableSortLabel from "@material-ui/core/TableSortLabel";

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


const ListCourse = () => {
    const dispatch = useDispatch();
    let history = useHistory();
    const classes = useStyles();


    const [courses, setCourses] = useState([]);
    const [courSelected, setCourSelected] = React.useState({});
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [totalResults, setTotalResults] = React.useState(0);
    const [dense, setDense] = React.useState(true);
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("id");
    const [selected, setSelected] = React.useState([]);





    const [courseState, setCourseState] = useState({
        isValid: false,
        values: {},
        touched: {},
        errors: {},
    });


    const getCourses = () => {
        // setViewProgress(true);
        axios
            .get('course/')
            .then((res) => {
                if (res.status === 200) {
                    setCourses(res.data)
                } else console.log(res.status);

            })
            .catch(() => {

                // dispatch(showMessage(message));
            });
    };



    useEffect(() => {
        getCourses();

    }, [page]);


    const handleClickActiveOpen = (row) => {
        setCourSelected(row);
        //setActiveOpen(true);
    };


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
            const newSelecteds = course.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
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

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;




    return (
        <div className={classes.root}>
            <div style={{ padding: 20 }}>
                <h1>Gestionar cursos</h1>

                <div style={{ padding: 40, margin: 50 }}>
                    <Grid container spacing={5} className="Grid-main-purple">
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" href="/createcourse">
                                Agregar +
                            </Button>

                        </Grid>
                        <Grid item xs={12}>
                            <TableContainer>
                                <Table className="table"

                                    aria-labelledby="tableTitle"
                                    aria-label="enhanced table"
                                    size={dense ? "small" : "medium"}
                                >
                                    <HeadTable
                                        classes={classes}
                                        numSelected={selected.length}
                                        order={order}
                                        orderBy={orderBy}
                                        onSelectAllClick={handleSelectAllClick}
                                        onRequestSort={handleRequestSort}
                                        rowCount={courses.length}
                                    >
                                    </HeadTable >
                                    {/* onChangePage={handleChangePage} */}
                                    <TableBody >
                                        {stableSort(courses, getComparator(order, orderBy)).map(
                                            (row, index) => {
                                                const isItemSelected = isSelected(row.id);
                                                const labelId = `enhanced-table-checkbox-${index}`;
                                                return (
                                                    <TableRow
                                                        hover
                                                        onClick={(event) => handleClick(event, row.id)}
                                                        role="checkbox"
                                                        aria-checked={isItemSelected}
                                                        tabIndex={-1}
                                                        key={row.id}
                                                    //selected={isItemSelected}
                                                    >

                                                        <TableCell
                                                            align="right"
                                                        //component="th"
                                                        // id={labelId}
                                                        // scope="row"
                                                        >
                                                            {" "}
                                                            {row.id}
                                                        </TableCell>
                                                        <TableCell></TableCell>
                                                        <TableCell align="left"> {row.name}</TableCell>
                                                        <TableCell align="left"> Profesor</TableCell>
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




                                                        <TableCell align="left">
                                                            <IconButton
                                                                aria-label="view"
                                                                onClick={() => {
                                                                    handleClickActiveOpen(row);
                                                                }}
                                                            >
                                                                <DeleteIcon></DeleteIcon>
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            }
                                        )}

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>



                    </Grid>

                </div >




            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({

    // instid: state.auth.instId,
});

ListCourse.propTypes = {

    //instid: PropTypes.any,
};

export default connect(mapStateToProps)(ListCourse);

