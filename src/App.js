
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './Admin/Pages/Dashboard';
import Election from './Admin/Pages/Election';
import Party from './Admin/Pages/Party';
import User from './Admin/Pages/User';
import AdminNav from './Admin/Header/AdminNav';

const App = () => {

  return (
    <>
      <Login />
      <AdminNav />
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/election' element={<Election />} />
        <Route path='/party' element={<Party />} />
        <Route path='/user' element={<User />} />
      </Routes>
    </>

  );
};

export default App;
