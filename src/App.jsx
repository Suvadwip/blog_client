import "./App.css";
import Login from "./pages/Login/Login";

import Topbar from "./components/topbar/Topbar";
import "react-toastify/dist/ReactToastify.css";


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./pages/Register/Register";
import Write from "./pages/write/Write";
import Homepage from "./pages/Homepage/Homepage";
import Single from "./pages/single/Single";
import Settings from "./pages/settings/Settings";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user);
  return (
    <>
      <Router>
        <Topbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/post" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/singlePost/:id" element={<Single />} />
          <Route
            path="/write"
            element={user ? <Write /> : <Navigate to="/login" />}
          />
          <Route
            path="/settings/:id"
            element={user ? <Settings /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
     
    </>
  );
}

export default App;
