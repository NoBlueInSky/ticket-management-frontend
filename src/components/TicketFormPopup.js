import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const TicketFormPopup = ({ onSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');
  const [information, setInformation] = useState('');
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const style = {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const ticketData = {
      title: title,
      description: description,
      contact: contact,
      information: information
    };

    fetch('http://localhost:8080/api/tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ticketData)
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

    setTitle('');
    setDescription('');
    setContact('');
    setInformation('');
    setIsOpen(false); 

    onSubmit(ticketData);
  };

  return (
    <div>
      <button onClick={handleOpen}>Create Ticket</button>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Ticket
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={handleSubmit}>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              /><br />
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea><br />
              <label htmlFor="contact">Contact:</label>
              <input
                type="text"
                id="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              /><br />
              <label htmlFor="information">Information:</label>
              <input
                type="text"
                id="information"
                value={information}
                onChange={(e) => setInformation(e.target.value)}
              /><br />
              <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

TicketFormPopup.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default TicketFormPopup;