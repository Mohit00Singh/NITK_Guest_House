import "./login.scss";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const { loading, error, dispatch } = useContext(AuthContext);
  const [showErrorModal, setShowErrorModal] = useState(false);
  /*const dispatch = useDispatch();
  const err = useSelector((state) => state.search.error);*/
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post("/auth/login", credentials);

      if (res.status === 200) {
        if (res.data.isAdmin) {
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: res.data.details,
          });
          navigate("/");
        } else {
          setCredentials({
            username: "",
            password: "",
          });

          setShowErrorModal(true);
          setTimeout(() => {
            setShowErrorModal(false);
          }, 5000);
          
        }
      } else {
        dispatch({ type: "LOGIN_FAILURE", payload: res.data });
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
  };

  const handleCloseErrorModal = () => {
    // Close the error modal
    setShowErrorModal(false);

  };
  return (
    <div className="main-login">
      <div className="login">
        <div className="left-login">{false && <img src="" alt="..." />}</div>
        <div className="right-login">
          <h2>Sign in or create an account</h2>
          <input
            type="text"
            id="username"
            className="login-input"
            placeholder="Username"
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            className="login-input"
            placeholder="Password"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            type="submit"
            style={{ width: "18rem", margin: "0" }}
            className="btn"
            onClick={handleClick}
            id="liveAlertBtn"
          >
            Submit{" "}
          </button>
          {showErrorModal && <span className="err">You are not authorized </span>}
          {/* Error Modal */}
          {showErrorModal && (
            <div className="error-modal">
              <div className="modal-content">
                <span className="close" onClick={handleCloseErrorModal}>
                  &times;
                </span>
                <p>{error}</p>
              </div>
            </div>
          )}
          <div className="signtxt">
            By signing in or creating an account, you agree with our{" "}
            <span>Terms & conditions</span> and <span>Privacy statement</span>
          </div>
          <hr />
          <div className="copyright">
            All rights reserved. Copyright (2006 - 2023) - Booking.com™
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
