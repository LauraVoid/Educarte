import React, { Component } from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import EyeButton from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';


export default class course extends Component {
    render() {
        return (
            <div>
                <TableRow key={this.props.course.id}>
                    <TableCell >{this.props.course.id}</TableCell>
                    <TableCell component="th" scope="row">
                        {this.props.course.name}
                    </TableCell>
                    <TableCell align="right">
                        <IconButton>
                            <EyeButton />
                        </IconButton>
                    </TableCell>
                    <TableCell align="right">
                        <IconButton>
                            <EyeButton />
                        </IconButton>
                    </TableCell>
                    <TableCell align="right">

                        <IconButton>
                            <EditIcon />
                        </IconButton>
                        <IconButton>
                            <DeleteIcon />
                        </IconButton>

                    </TableCell>


                </TableRow>
            </div>
        )
    }
}
