import React, { useState, useEffect } from 'react';
import UpdateTicketPopup from './UpdateTicketPopup';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import PropTypes from 'prop-types';

function TicketTable({ tickets, totalTickets, onUpdated, fetchTickets }) {
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [updateOpen, setUpdateOpen] = useState(false);

    const handleUpdateClose = () => {
        setUpdateOpen(false);
        setSelectedTicket(null);
        onUpdated();
    };

    useEffect(() => {
        fetchTickets({ page, size: rowsPerPage });
    }, [page, rowsPerPage]);

    const handleUpdateClick = (ticket) => {
        setUpdateOpen(true);
        setSelectedTicket(ticket);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Title</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Contact</TableCell>
                            <TableCell align="right">CreatedAt</TableCell>
                            <TableCell align="right">UpdatedAt</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tickets.map((ticket) => (
                            <TableRow
                                key={ticket.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="ticket">{ticket.id}</TableCell>
                                <TableCell align="right">{ticket.title}</TableCell>
                                <TableCell align="right">{ticket.description}</TableCell>
                                <TableCell align="right">{ticket.contact}</TableCell>
                                <TableCell align="right">{ticket.createdAt}</TableCell>
                                <TableCell align="right">{ticket.updatedAt}</TableCell>
                                <TableCell align="right">{ticket.status}</TableCell>
                                <TableCell align="right"><button onClick={() => handleUpdateClick(ticket)}>Update</button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={totalTickets}  // Total number of tickets from the server
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
            {selectedTicket && (
                <UpdateTicketPopup open={updateOpen} onClose={handleUpdateClose} ticket={selectedTicket} />
            )}
        </>
    );
}

TicketTable.propTypes = {
    tickets: PropTypes.array.isRequired,
    totalTickets: PropTypes.number.isRequired,
    onUpdated: PropTypes.func.isRequired,
    fetchTickets: PropTypes.func.isRequired,
};

export default TicketTable;
