// ReservationForm.js
import { useState } from 'react';
import { Container, Typography, TextField, Button, MenuItem } from '@mui/material';
import Swal from 'sweetalert2';
import apiActions from '../../actions';
import { useUser } from '../context/userContext';

const priceOfTables = {
  2: 100,
  4: 150,
  6: 200,
  8: 250,
  10: 300,
  25: 350,
}

function ReservationForm() {
  const { userState } = useUser();
  const [time, setTime] = useState('');
  const [people, setPeople] = useState(0);

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handlePeopleChange = (event) => {
    setPeople(event.target.value);
  };

  const handleReservation = () => {
    apiActions.createBooking({
      time, people, username: userState.username || 'system', price :priceOfTables[people]
    })
    .then(res => {
      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: `Your table has been booked for $${priceOfTables[people]}`,
          showConfirmButton: false,
          timer: 2500
        })
        setPeople('')
        setTime('')
      }
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: `Booking failed: ${err.response.data.message}`,
        showConfirmButton: true,
      })
      setPeople('')
      setTime('')
    })
  };

  return (
    <Container style={{ backgroundColor: '#f5f5f5', padding: '16px', borderRadius: '8px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)' }}>
      <Typography variant="h2" style={{ color: '#333', marginBottom: '8px' }}>Abees Resturant Dubai</Typography>
      <form>
        <TextField
          label="Booking Time"
          variant="outlined"
          fullWidth
          select
          value={time}
          onChange={handleTimeChange}
          style={{ marginBottom: '16px' }}
        >
          <MenuItem value="">-</MenuItem>
          <MenuItem value="12:00 PM">12:00 PM</MenuItem>
          <MenuItem value="1:00 PM">1:00 PM</MenuItem>
          <MenuItem value="2:00 PM">2:00 PM</MenuItem>
          <MenuItem value="3:00 PM">3:00 PM</MenuItem>
          <MenuItem value="4:00 PM">4:00 PM</MenuItem>
          <MenuItem value="5:00 PM">5:00 PM</MenuItem>
          <MenuItem value="6:00 PM">6:00 PM</MenuItem>
          <MenuItem value="7:00 PM">7:00 PM</MenuItem>
          <MenuItem value="8:00 PM">8:00 PM</MenuItem>
          <MenuItem value="9:00 PM">9:00 PM</MenuItem>
          <MenuItem value="10:00 PM">10:00 PM</MenuItem>
        </TextField>
        <TextField
          label="Number of People"
          variant="outlined"
          fullWidth
          select
          value={people}
          type='number'
          onChange={handlePeopleChange}
          style={{ marginBottom: '16px' }}
        >
          <MenuItem value={0}>-</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>Party (25)</MenuItem>
        </TextField>
        <Button disabled= {time === '' || people === 0}variant="contained" color="primary" onClick={handleReservation}>
          Reserve
        </Button>
      </form>
    </Container>
  );
}

export default ReservationForm;
