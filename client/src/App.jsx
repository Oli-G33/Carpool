import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthenticationPage from './pages/AuthenticationPage/AuthenticationPage';
import TermsPage from './pages/TermsPage';
import BookingPage from './pages/BookingPage';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SuccessPage from './pages/SuccessPage';
import './index.css';
import DashboardPage from './pages/DashboardPage';
import MyRidesPage from './pages/MyRidesPage';
import { Copyright } from './components/copyright';
import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { useSelector } from 'react-redux';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

function App() {
  const isAuth = Boolean(useSelector(state => state.user));
  const particlesInit = useCallback(async engine => {
    await loadFull(engine);
  }, []);

  return (
    <div className="app">
      <Particles
        id="tsparticles"
        className="particles-background"
        init={particlesInit}
        options={{
          fullScreen: false,
          background: {
            image: ' linear-gradient(19deg, #21D4FD 0%, #1c305c 100%)'
          },
          particles: {
            number: { value: 20, density: { enable: true, value_area: 600 } },
            color: { value: '#ffffff' },
            shape: {
              type: 'circle',
              stroke: { width: 0, color: '#000000' },
              polygon: { nb_sides: 5 }
            },
            opacity: {
              value: 0.25,
              random: true,
              anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
            },
            size: {
              value: 29,
              random: true,
              anim: { enable: false, speed: 2, size_min: 0.1, sync: false }
            },
            line_linked: {
              enable: false,
              distance: 300,
              color: '#ffffff',
              opacity: 0,
              width: 0
            },
            move: {
              enable: true,
              speed: 0.5,
              direction: 'top',
              straight: true,
              out_mode: 'out',
              bounce: false,
              attract: { enable: false, rotateX: 600, rotateY: 1200 }
            }
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: { enable: false, mode: 'repulse' },
              onclick: { enable: false, mode: 'push' },
              resize: true
            },
            modes: {
              grab: { distance: 800, line_linked: { opacity: 1 } },
              bubble: {
                distance: 790,
                size: 79,
                duration: 2,
                opacity: 0.8,
                speed: 3
              },
              repulse: { distance: 400, duration: 0.4 },
              push: { particles_nb: 4 },
              remove: { particles_nb: 2 }
            }
          },
          retina_detect: true
        }}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <div className="content">
            <Routes>
              <Route
                path="/"
                element={
                  isAuth ? <Navigate to="/booking" /> : <AuthenticationPage />
                }
              />
              <Route
                path="/booking"
                element={isAuth ? <BookingPage /> : <AuthenticationPage />}
              />
              <Route path="/terms" element={<TermsPage />} />
              <Route
                path="/success"
                element={isAuth ? <SuccessPage /> : <AuthenticationPage />}
              />
              <Route
                path="/dashboard"
                element={isAuth ? <DashboardPage /> : <AuthenticationPage />}
              />
              <Route
                path="/myrides"
                element={isAuth ? <MyRidesPage /> : <AuthenticationPage />}
              />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/reset-password/:resetToken"
                element={<ResetPassword />}
              />
            </Routes>
          </div>
        </BrowserRouter>
        <div className="footer">
          <Copyright sx={{ mt: 5, mb: 1 }} />
        </div>
      </LocalizationProvider>
    </div>
  );
}

export default App;
