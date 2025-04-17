import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/userSlice";
import { useNavigate, Link } from "react-router-dom";
import React from "react";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const credentials = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    dispatch(loginUser(credentials));
  };

  React.useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-3">Login</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
            
          </div>
        </form>
        {error && <p className="text-danger mt-3 text-center">{error.error}</p>}        
        <p className="text-center mt-3 mb-0">
          
          Don't have an account?{" "}
          <Link to="/register" className="text-decoration-none">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
