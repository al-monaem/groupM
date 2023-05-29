import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import TicketsType from './components/Screens/Admin/TicketsType';
import Error from './components/Error';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={Layout}>
          <Route path="/" element={<Navigate to={"/admin/ticketsType"} />} exact={true} />
          <Route path="/admin/ticketsType" Component={TicketsType} exact={true} />
          <Route path='*' Component={Error} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
