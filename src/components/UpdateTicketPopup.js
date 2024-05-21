import React, { useState } from 'react';
import { Modal, Box, Typography } from '@mui/material';
import '../styles/UpdateTicketPopup.css'; // Import the CSS file


function UpdateTicketPopup({ ticket, onClose, open, handleClose }) {
  const [updatedTicket, setUpdatedTicket] = useState(ticket);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTicket({ ...updatedTicket, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch('http://localhost:8080/api/tickets/' + updatedTicket.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTicket)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Ticket created:', data);
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
      });
      
    onClose()
  };

  return (
      <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="update-modal-title"
              aria-describedby="update-modal-description"
          >
            <Box sx={{ ...modalStyle }}>
                <Typography id="update-modal-title" variant="h6" component="h2">
                  Update Ticket
                </Typography>
                <div className="update-ticket-popup">
                    <div className="popup-content">
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label htmlFor="title">Title:</label>
                          <input
                            type="text"
                            name="title"
                            id="title"
                            value={updatedTicket.title}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="description">Description:</label>
                          <textarea
                            name="description"
                            id="description"
                            value={updatedTicket.description}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="contact">Contact:</label>
                          <input
                            type="text"
                            name="contact"
                            id="contact"
                            value={updatedTicket.contact}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="status">Status:</label>
                          <select name="status" id="status" value={updatedTicket.status} onChange={handleInputChange}>
                            <option value="PENDING">PENDING</option>
                            <option value="ACCEPTED">ACCEPTED</option>
                            <option value="RESOLVED">RESOLVED</option>
                            <option value="REJECTED">REJECTED</option>
                          </select>
                        </div>
                        <div className="form-button">
                          <button type="submit">Update</button>
                          <button onClick={onClose}>Close</button>
                        </div> 
                      </form>
                    </div>
                  </div>
          </Box>
      </Modal>
  );
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default UpdateTicketPopup;