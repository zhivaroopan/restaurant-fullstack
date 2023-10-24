import SignIn from './components/signin'
import Table from './components/table/index';
import AdminTable from './components/admin/index';
import SignUp from './components/signup';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path="/home" Component={Table} />
          <Route path="/admin" Component={AdminTable}/>
          <Route path="/login" Component={SignIn} />
          <Route path="/signup" Component={SignUp} />
          <Route path="/" Component={SignIn}>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
