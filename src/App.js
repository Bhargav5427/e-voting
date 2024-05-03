import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './Admin/Pages/Dashboard';
import Election from './Admin/Pages/Election';
import Party from './Admin/Pages/Party';
import User from './Admin/Pages/User';
import AdminNav from './Admin/Header/AdminNav';
import Connection from './Admin/Pages/Connection';

const App = () => {
  const location = useLocation();

  const isLoginPage = location.pathname === '/';

  return (
    <>
      {!isLoginPage && <AdminNav />}
      {!isLoginPage && ( // Render container only if not on login page
        <div className='container' style={{ maxWidth: "1150px", padding: "30px 40px 40px", height: "100vh", marginLeft: "310px" }}>
          <Routes>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/party' element={<Party />} />
            <Route path='/election' element={<Election />} />
            <Route path='/connection' element={<Connection />} />
            <Route path='/user' element={<User />} />
          </Routes>
        </div>
      )}
      {isLoginPage && (
        <Routes>
          <Route path='/' element={<Login />} />
        </Routes>
      )}
    </>
  );
};

export default App;
