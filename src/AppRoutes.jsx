import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ui/ProtectedRoute';
import AppLayout from './ui/AppLayout';
import Dashboard from './pages/Dashboard';
// import Bookings from './pages/Bookings';
import Devices from './pages/Devices';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Admins from './pages/Admins';
import Doctors from './pages/Doctors';
import Nurses from './pages/Nurses';
import Patients from './pages/Patients';
import Profile from './pages/Profile';
import { useUser } from './features/authentication/useUser';
import Spinner from './ui/Spinner';

function AppRoutes() {
  const { user, isLoading } = useUser();

  if (isLoading) return <Spinner />;

  const userRole = user?.user_metadata.userRole
    ? user.user_metadata.userRole
    : '';

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate replace to="login" />} />
          {userRole === 'admin' ? (
            <Route path="dashboard" element={<Dashboard />} />
          ) : null}
          {/* {userRole !== 'patient' && userRole !== '' ? (
            <Route path="bookings" element={<Bookings />} />
          ) : null} */}

          {userRole === 'admin' ? (
            <Route path="devices" element={<Devices />} />
          ) : null}

          {userRole === 'admin' ? (
            <Route path="admins" element={<Admins />} />
          ) : null}
          {userRole === 'admin' ? (
            <Route path="admin/:userId" element={<Profile />} />
          ) : null}

          {userRole !== 'patient' && userRole !== '' ? (
            <Route path="doctors" element={<Doctors />} />
          ) : null}
          {userRole !== 'patient' && userRole !== '' ? (
            <Route path="doctor/:userId" element={<Profile />} />
          ) : null}

          {userRole !== 'patient' && userRole !== '' ? (
            <Route path="nurses" element={<Nurses />} />
          ) : null}
          {userRole !== 'patient' && userRole !== '' ? (
            <Route path="nurse/:userId" element={<Profile />} />
          ) : null}

          {userRole !== 'patient' && userRole !== '' ? (
            <Route path="patients" element={<Patients />} />
          ) : null}

          <Route path="patient/:userId" element={<Profile />} />

          {/* <Route path="settings" element={<Settings />} /> */}
          {/* <Route path="account" element={<Account />} /> */}
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
