/* eslint-disable react/prop-types */
import { useState } from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Typography, TextField, Button,Select, MenuItem } from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css'; 
import Swal from 'sweetalert2';
import apiActions from '../../actions';

const AdminPanel = ({ reservations, fetchAgain }) => {

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [people, setPeople] = useState(2)

  const formattedDate = (date) => {
    const formattedDate = new Date(date);
    const day = formattedDate.getDate();
    const month = formattedDate.getMonth() + 1; // Months are zero-based
    const year = formattedDate.getFullYear();
    return `${day}-${month}-${year}`;
  }

  const tableContainerStyle = {
    margin: '0 auto',   // Center the table
    maxWidth: '200%',    // Set a larger maximum width
  };

  const tableHeadingStyle = {
    backgroundColor: '#f5f5f5', // Background color for the heading
    padding: '16px',           // Increase padding for the heading
  };

  const cellStyle = {
    padding: '12px', // Increase padding for table cells to increase cell spacing
  };

  const dateInputStyle = {
    margin: '10px', // Add some margin for spacing
    width: '200px',
    backgroundColor: '#D3D3D3' // Set a fixed width
  };

  const handleSubmit = async () => {
    if (toDate && fromDate) {
      if (toDate > fromDate) {
        const res = await apiActions.getBookings(`?fromDate=${fromDate}&toDate=${toDate}&people=${people}`)
        fetchAgain(res)
      } else {
        Swal.fire('error', 'To date should be greater than from date')
      }
    } else {
      Swal.fire('error', 'Add both dates to search')
    }
  }

  const handleClear = async() => {
    const res = await apiActions.getBookings()
    fetchAgain(res)
    setFromDate('')
    setToDate('')
    setPeople(2)
  }

  return (
    <div style={tableContainerStyle}>
      <Typography variant="h3" style={tableHeadingStyle} sx={{backgroundColor: '#D3D3D3', color: 'black'}}>
        Revenue: ${reservations.price}
      </Typography>
      <div style={{ backgroundColor: 'white' }}>
      <TextField
        label="From Date"
        type="date"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
        style={dateInputStyle}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        label="To Date"
        type="date"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
        style={dateInputStyle}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Select
        label="People Count"
        value={people}
        onChange={(e) => setPeople(e.target.value)}
        style={dateInputStyle}
      >
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={6}>6</MenuItem>
        <MenuItem value={8}>8</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={25}>Party(25)</MenuItem>
        {/* Add more options as needed */}
      </Select>

      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{margin: '20px'}}>
        Search
      </Button>
      <Button variant="outlined" color="primary" onClick={handleClear} sx={{margin: '20px'}}>
        Clear
      </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={cellStyle}>Username</TableCell>
              <TableCell style={cellStyle}>Booking Time</TableCell>
              <TableCell style={cellStyle}>People Count</TableCell>
              <TableCell style={cellStyle}>Date of booking</TableCell>
              <TableCell style={cellStyle}>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.data?.map((reservation, index) => (
              <TableRow key={index}>
                <TableCell style={cellStyle}>{reservation.username}</TableCell>
                <TableCell style={cellStyle}>{reservation.timeSlot}</TableCell>
                <TableCell style={cellStyle}>{reservation.peopleCount}</TableCell>
                <TableCell style={cellStyle}>{formattedDate(reservation.dateOfBooking)}</TableCell>
                <TableCell style={cellStyle}>${reservation.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminPanel;
