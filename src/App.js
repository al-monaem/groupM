import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import TicketsType from './components/Screens/Admin/TicketsType';
import Error from './components/Screens/Error';
import { useDispatch } from 'react-redux';
import { setMobile } from './app/redux/Common/SettingsSlice';
import { useEffect } from 'react';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    const checkScreenSize = () => {
      dispatch(setMobile(window.innerWidth <= 900)) // Adjust the threshold value as needed
    };

    window.addEventListener('resize', checkScreenSize); // Check screen size on window resize
    return () => {
      window.removeEventListener('resize', checkScreenSize); // Clean up event listener on component unmount
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route Component={Layout}>
          <Route path="/" element={<Navigate to={"/admin/ticketsType"} />} exact="true" />
          <Route path="/admin/ticketsType" Component={TicketsType} exact="true" />
        </Route>
        <Route path='*' Component={Error} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
