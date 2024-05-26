import React, { useState } from 'react';
import { Modal, Box, Button, TextField, Typography } from '@mui/material';

const TicketFilterPopup = ({ open, handleClose, onFilter }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [contact, setContact] = useState('');
    const [information, setInformation] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = () => {
        const params = {
            title: title || '',
            description: description || '',
            contact: contact || '',
            information: information || '',
            status: status || ''
        };
        onFilter(params);
        handleClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="filter-modal-title"
            aria-describedby="filter-modal-description"
        >
            <Box sx={modalStyle}>
                <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                    Filter Tickets
                </Typography>
                <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    margin="normal"
                    sx={{ mb: 1 }}
                />
                <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    margin="normal"
                    sx={{ mb: 1 }}
                />
                <TextField
                    label="Contact"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    fullWidth
                    margin="normal"
                    sx={{ mb: 1 }}
                />
                <TextField
                    label="Information"
                    value={information}
                    onChange={(e) => setInformation(e.target.value)}
                    fullWidth
                    margin="normal"
                    sx={{ mb: 1 }}
                />
                <select name="status" id="status" value={status} onChange={(e) => setStatus(e.target.status)}>
                    <option value="PENDING">PENDING</option>
                    <option value="ACCEPTED">ACCEPTED</option>
                    <option value="RESOLVED">RESOLVED</option>
                    <option value="REJECTED">REJECTED</option>
                </select>
                <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ mt: 2 }}>
                    Apply Filter
                </Button>
            </Box>
        </Modal>
    );
};

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default TicketFilterPopup;
