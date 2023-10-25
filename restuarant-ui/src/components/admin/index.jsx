/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react'
import AdminPanel from "./admin";
import apiActions from '../../actions';

const AdminTable = () => {
  const [reservations, setReservations] = useState([]);

  const resendReservations = (res) => {
    setReservations(res)
  }
  useEffect(() => {
    // Make an API call and store the response in the 'reservations' state
    apiActions.getBookings()
      .then(response => {
        setReservations(response);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
    return(
        <div>
            <AdminPanel reservations={reservations} fetchAgain={resendReservations}/>
        </div>
    )
}

export default AdminTable