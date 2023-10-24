/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-comment-textnodes */

import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Typography } from '@mui/material';

// eslint-disable-next-line react/prop-types
const AdminPanel = ({ reservations }) => {

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

  return (
    <div style={tableContainerStyle}>
    <Typography variant="h1" style={tableHeadingStyle}>
      Admin Panel: Reservations
    </Typography>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={cellStyle}>Username</TableCell>
            <TableCell style={cellStyle}>Booking Time</TableCell>
            <TableCell style={cellStyle}>People Count</TableCell>
            <TableCell style={cellStyle}>Date of booking</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reservations.map((reservation, index) => (
            <TableRow key={index}>
              <TableCell style={cellStyle}>{reservation.username}</TableCell>
              <TableCell style={cellStyle}>{reservation.timeSlot}</TableCell>
              <TableCell style={cellStyle}>{reservation.peopleCount}</TableCell>
              <TableCell style={cellStyle}>{formattedDate(reservation.dateOfBooking)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
);
};

export default AdminPanel;
