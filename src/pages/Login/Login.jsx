import { useQueryClient, useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { loginUser } from "../../apiHandler/apiHandler";
import "./login.css";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;

  const queryClient = useQueryClient();
  const onType = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const { mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
      window.location.pathname = "/";
    },
  });
  const handleSubmit = (e) => {
    toast.success("Login Successfully");
    // console.log(user);
    e.preventDefault();
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    mutate(formData);
    //console.log(formData);
  };

  return (
    <>
      <div className="login">
        <span className="loginTitle">LogIn</span>
        <form className="loginForm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>UserName</label>
            <br />
            <input
              className="loginInput"
              type="email"
              name="email"
              value={email}
              onChange={onType}
              placeholder="Enter Username.."
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <br />
            <input
              className="loginInput"
              type="password"
              name="password"
              value={password}
              onChange={onType}
              id="exampleInputPassword1"
              placeholder="Enter Password.."
              required
            />
          </div>

          <button type="submit" className="loginButton">
            Login
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
