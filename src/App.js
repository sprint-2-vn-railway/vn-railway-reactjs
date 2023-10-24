import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { Route, Routes } from 'react-router-dom';
import Booking from './components/Booking';
import Login from './components/Login';
import { axiosClient } from './services/AxiosClient';
import { Suspense } from 'react';
import Loading from './components/common/Loading';
import CreateTrip from './components/user/CreateTrip';
import PaymentSuccess from './components/payment_success/PaymentSuccess';
function App() {
  axiosClient()
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='*' element={<Home />} />
          <Route path='/login' element={<Login />} />
          {/* Booking */}

          <Route path='/booking' element={<Booking />} />
          {/* Train,  */}
          <Route path='/create-trip' element={<CreateTrip />} />

          {/* Payment success */}
          <Route path='/payment-success' element={<PaymentSuccess />} />
        </Routes>
      </Suspense>

    </>
  );
}

export default App;
