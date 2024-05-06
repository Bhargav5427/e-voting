import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./Admin/Pages/Dashboard";
import Election from "./Admin/Pages/Election";
import Party from "./Admin/Pages/Party";
import User from "./Admin/Pages/User";
import AdminNav from "./Admin/Header/AdminNav";
import Connection from "./Admin/Pages/Connection";
import AdminLogin from "./components/AdminLogin";
import UserNav from "./User/Header/UserNav";
import Home from "./User/Pages/Home";

const getRole = () => {
  const role = localStorage.getItem("role");
  return role;
};

const App = () => {
  const role = getRole();
  const location = useLocation();

  const isLoginPage = location.pathname === "/";

  if (!role || role === "") {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
      </Routes>
    );
  }

  if (role === "admin") {
    return (
      <>
        <AdminNav />
        <div
          className="container"
          style={{
            maxWidth: "1150px",
            padding: "30px 40px 40px",
            height: "100vh",
            marginLeft: "310px",
          }}
        >
          <Routes>
            <Route path="*" element={<Dashboard to="/" replace />} />
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route path="/party" exact element={<Party />} />
            <Route path="/election" exact element={<Election />} />
            <Route path="/connection" exact element={<Connection />} />
            <Route path="/user" exact element={<User />} />
          </Routes>
        </div>
      </>
    );
  }

  if (role === "user") {
    return (
      <>
        <UserNav />
        <div
          className="container"
          style={{
            maxWidth: "1150px",
            padding: "30px 40px 40px",
            height: "100vh",
            marginLeft: "310px",
          }}
        >
          {/* You can add a sidebar or navigation here for users */}
          <Routes>
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>
      </>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
export default App;

// import { Route, Routes, useLocation } from "react-router-dom";
// import Login from "./components/Login";
// import Dashboard from "./Admin/Pages/Dashboard";
// import Election from "./Admin/Pages/Election";
// import Party from "./Admin/Pages/Party";
// import User from "./Admin/Pages/User";
// import AdminNav from "./Admin/Header/AdminNav";
// import Connection from "./Admin/Pages/Connection";
// import AdminLogin from "./components/AdminLogin";

// const App = () => {
//   const location = useLocation();

//   const isLoginPage = location.pathname === "/";

//   return (
//     <>
//       {!isLoginPage && <AdminNav />}
//       {!isLoginPage && ( // Render container only if not on login page
//         <div
//           className="container"
//           style={{
//             maxWidth: "1150px",
//             padding: "30px 40px 40px",
//             height: "100vh",
//             marginLeft: "310px",
//           }}
//         >
//           <Routes>
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/party" element={<Party />} />
//             <Route path="/election" element={<Election />} />
//             <Route path="/connection" element={<Connection />} />
//             <Route path="/user" element={<User />} />
//             <Route path="/adminlogin" element={<AdminLogin />} />
//             <Route path="/login" element={<Login />} />
//           </Routes>
//         </div>
//       )}
//       {isLoginPage && (
//         <Routes>
//           <Route path="/" element={<Login />} />
//         </Routes>
//       )}
//     </>
//   );
// };

// export default App;
