import { Grid } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles, lighten } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import axios from '../../utils/axios';
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import Rating from '@material-ui/lab/Rating';

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
    createStudent: {
        marginBottom: "3%",
      },
}));


const headCells = [
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
        label: "Title",
    },
    {
        id: "date",
        numeric: false,
        disablePadding: false,
        label: "Fecha",
    },
    {
        id: "qualification",
        numeric: false,
        disablePadding: false,
        label: "Desempe??o",
    },
    {
        id: "message",
        numeric: false,
        disablePadding: false,
        label: "Mensaje",
    }
    

];

function HeadTable(props) {
    const { order, orderBy, onRequestSort } = props;
    

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

            
        </Toolbar>
    );
};
function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
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
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};


EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};



const ListFeedback = (props) => {

    const classes = useStyles();


    const [feedbacks, setFeed] = useState([]);
    const [feedSelected, setFeedSelected] = React.useState({});
    const [dense, setDense] = React.useState(true);
    const [order, setOrder] = React.useState("asc");
    const [reload, setReload] = React.useState(false);
    const [orderBy, setOrderBy] = React.useState("id");
    const [selected, setSelected] = React.useState([]);
    const [activeOpen, setActiveOpen] = React.useState(false);
    const [error, setError] = useState();

    
    useEffect(() => {

        axios
            .get(`feed/` + props.studentId)
            .then((res) => {
                if (res.status === 200) {
                    setFeed(res.data)
                    setError("No error")

                } else console.log(res.status);
            })
            .catch((err) => {
                //console.log(err.message)
                if (err.message.includes("403")) {
                    setError("Forbidden")

                }
                else if (err.message.includes("401")) {
                    setError("Unauthorized")

                } else {
                    setError("Error")
                }
            });

    }, [reload]);

    const handleClickActiveOpen = (row) => {
        setFeedSelected(row);
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



    const isSelected = (name) => selected.indexOf(name) !== -1;

    return (

        <Grid container>
            { (error === "No error") ? (               

                <div className={classes.root}>
                    <Grid item xs={12} className={classes.createStudent}>
                 <Button
                   variant="contained"
                   color="primary"
                   href="/parent"
                 >
                   Volver
                 </Button>
               </Grid>

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
                                    onRequestSort={handleRequestSort}
                                    rowCount={feedbacks.length}
                                />
                                <TableBody>
                                    {stableSort(feedbacks, getComparator(order, orderBy)).map(
                                        (row, index) => {
                                            const isItemSelected = isSelected(feedbacks.title);
                                            const labelId = `enhanced-table-checkbox-${index}`;
                                            return (
                                                <TableRow
                                                    hover
                                                    role="checkbox"
                                                    tabIndex={-1}
                                                    key={row.feedbackId}
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
                                                        {row.title}
                                                    </TableCell>                                                  

                                                    <TableCell align="left">{row.date}</TableCell>
                                                    <Rating
                                                    name="simple-controlled"
                                                    value={row.qualification}                                                    
                                                />
                                                    
                                                    <TableCell align="left">
                                                        <IconButton
                                                            onClick={() => {
                                                                handleClickActiveOpen(row);
                                                            }}
                                                        >
                                                            <VisibilityIcon></VisibilityIcon>
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        }
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                    <Dialog
                        onClose={handleCloseActive}
                        aria-labelledby="customized-dialog-title"
                        open={activeOpen}
                    >
                        <DialogTitle id="customized-dialog-title" onClose={handleCloseActive}>
                            Mensaje
                </DialogTitle>
                        <DialogContent dividers>
                            <Typography gutterBottom>
                                {feedSelected.message}
                            </Typography>
                        </DialogContent>
                        
                    </Dialog>
                </div>

            ) : (
                <div>
                    <h1>{error}</h1>

                </div>
            )}

        </Grid>
    );
};

const mapStateToProps = (state) => ({
    id: state.login.id,
    name: state.login.name,
    email: state.login.email,
    token: state.login.accessToken,
    studentId: state.login.studentId,

});

ListFeedback.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    token: PropTypes.string,
    studentId: PropTypes.number,

};

export default connect(mapStateToProps)(ListFeedback);

