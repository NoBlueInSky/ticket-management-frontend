import {React, useState, useEffect}  from 'react';
import axios from 'axios';
import TicketFormPopup from '../components/TicketFormPopup';
import TicketTable from '../components/TicketTable';
import TicketFilterPopup from '../components/TicketFilterPopup';
import '../styles/HomePage.css'

const HomePage = () => {
  const [tickets, setTickets] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);

  const handleFilterOpen = () => {
      setFilterOpen(true);
  };

  const handleFilterClose = () => {
      setFilterOpen(false);
  };

  const fetchTickets = async (params = {}) => {
    try {
        const query = new URLSearchParams(params).toString();
        const response = await axios.get(`http://localhost:8080/api/tickets/search?${query}`);
        const data = await response.data;
        setTickets(data.content);
        setTotalCount(data.totalElements); // Assuming the API response includes totalElements for pagination
    } catch (error) {
        console.error('Error fetching tickets:', error);
    }
};
const handleFilter = (params) => {
    fetchTickets(params);
};

  useEffect(() => {
    fetchTickets();
  }, []);

  const postTicket = async (ticket) => {
    try {
      await axios.post('http://localhost:8080/api/tickets', ticket);
      fetchTickets();
    } catch (error) {
      console.error('Error create ticket:', error);
    }
  };
  
  const handleSubmit = (ticketData) => {
    postTicket(ticketData)
  };

  return (
    <div>
      <h1>Ticket Management</h1>
      <TicketFormPopup onSubmit={handleSubmit} />
      <div className='ticker-button'>
        <button onClick={handleFilterOpen}> Open Filter </button>
      </div>
      <TicketFilterPopup open={filterOpen} handleClose={handleFilterClose} onFilter={handleFilter} />
      <TicketTable tickets={tickets} totalTickets={totalCount} onUpdated={() => fetchTickets({ page: 0, size: 10 })} fetchTickets={fetchTickets} />
    </div>
  );
};

export default HomePage;
