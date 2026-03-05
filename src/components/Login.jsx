import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils/constants";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [emailId, setEmailId] = useState("");
  const [passWord, setPassWord] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        API_BASE_URL + "/auth/login",
        {
          emailId,
          passWord,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      return navigate("/feed");
    } catch (error) {
      setError(error.response?.data || "Login failed. Please try again.");
      console.error("Login failed:", error);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        API_BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          passWord,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      return navigate("/profile");
    } catch (err) {
      setError(err.response?.data || "Sign up failed. Please try again.");
      console.error("Sign up failed:", err);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          {isLoginForm && (
            <div>
              <label className="form-control w-full max-w-xs ">
                <div className="label my-2">
                  <span className="label-text">First Name</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                ></input>
              </label>

              <label className="form-control w-full max-w-xs ">
                <div className="label my-2">
                  <span className="label-text">Last Name</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                ></input>
              </label>
            </div>
          )}
          <div>
            <label className="form-control w-full max-w-xs ">
              <div className="label my-2">
                <span className="label-text">Email Id</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              ></input>
            </label>

            <label className="form-control w-full max-w-xs ">
              <div className="label my-2">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                className="input input-bordered w-full max-w-xs"
                value={passWord}
                onChange={(e) => setPassWord(e.target.value)}
              ></input>
            </label>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center m-2">
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
        </div>
        <p
          className="text-center text-blue-500 underline m-auto cursor-pointer py-2"
          onClick={() => setIsLoginForm(!isLoginForm)}
        >
          {isLoginForm ? "New User?Sign Up Here" : "Existing User?Login Here"}
        </p>
      </div>
    </div>
  );
};

export default Login;
