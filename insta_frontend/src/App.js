import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginForm from "./components/login";
import Home from "./home";
import Profile from "./components/profile";
import CreatePost from "./components/createpost";
import UpdateBio from "./components/updatebio";
import UpdateUsername from "./components/updateusername";

const App = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/createpost" element={user ? <CreatePost /> : <Navigate to="/login" />} />
        <Route path="/update-bio" element={user ? <UpdateBio /> : <Navigate to="/login" />} /> 
        <Route path="/update-username" element={user ? <UpdateUsername /> : <Navigate to="/login" />} /> 
      </Routes>
    </Router>
  );
};

export default App;
