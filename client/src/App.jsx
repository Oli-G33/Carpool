import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthenticationPage from './pages/AuthenticationPage/AuthenticationPage';
import TermsPage from './pages/TermsPage';
import BookingPage from './pages/BookingPage';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SuccessPage from './pages/SuccessPage';
import './index.css';
import DashboardPage from './pages/DashboardPage';
import MyRidesPage from './pages/MyRidesPage';

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthenticationPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/myrides" element={<MyRidesPage />} />
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </>
  );
}

export default App;
