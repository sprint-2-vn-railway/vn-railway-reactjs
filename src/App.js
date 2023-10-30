import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { Route, Routes } from 'react-router-dom';
import Booking from './components/Booking';
import Login from './components/Login';
import { axiosClient } from './services/AxiosClient';
import CreateTrip from './components/user/CreateTrip';
import PaymentSuccess from './components/payment_success/PaymentSuccess';
import Authentication from './components/user/Authentication';
import AdminRequired from './components/user/AdminRequired';
import Error401 from './components/user/Error401';
import Error403 from './components/user/Error403';
import * as appUserService from './services/AppUserService';

function App() {
  axiosClient()
  return (
    <>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Home />} />
        <Route path='/401' element={<Error401 />} />
        <Route path='/403' element={<Error403 />} />
        {/* Booking */}
        <Route element={<Authentication />}>
          <Route path='/booking' element={<Booking />} />
          <Route path='/payment-success' element={<PaymentSuccess />} />

          <Route element={<AdminRequired />}>
            {/* Trip,  */}
            <Route path='/create-trip' element={<CreateTrip />} />
          </Route>
          {/* Payment success */}
        </Route>

      </Routes>

    </>
  );
}

export default App;
