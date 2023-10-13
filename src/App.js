import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { Route, Routes } from 'react-router-dom';
import Booking from './components/Booking';
import Login from './components/Login';
import { axiosClient } from './services/AxiosClient';
function App() {
  axiosClient()
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/booking' element={<Booking />} />

      </Routes>
    </>
  );
}

export default App;
