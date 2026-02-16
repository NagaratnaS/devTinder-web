import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [passWord, setPassWord] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        {
          emailId,
          passWord,
        },
        { withCredentials: true },
      );
    } catch (error) {
      console.log("Login failed:", error);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
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
          <div className="card-actions justify-center m-2">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
