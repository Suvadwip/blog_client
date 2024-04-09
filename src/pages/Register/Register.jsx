import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser } from "../../apiHandler/apiHandler";
import "./register.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    image: "",
  });
  const { username, email, password, image } = input;
  const queryClient = useQueryClient();
  //even handler
  const onType = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setInput({ ...input, image: e.target.files[0] });
  };
  // add functionality
  const {mutate} = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["userData"] });
      navigate("/login");
    },
  });
  // console.log(mutation);

  const handleSubmit = (e) => {
    toast.success("Register Successfully");
    e.preventDefault();
    let formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("image", image);
    mutate(formData);
    // console.log(input);
  };

  return (
    <>
      <div className="register">
        <span className="registerTitle">Register</span>
        <form
          className="registerForm"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="mb-3">
            <label>User Name</label>
            <br />
            <input
              type="text"
              name="username"
              value={username}
              onChange={onType}
              className="registerInput"
              placeholder="Enter your username.."
              required
            />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <br />
            <input
              type="email"
              name="email"
              value={email}
              onChange={onType}
              className="registerInput"
              id="exampleInputEmail1"
              placeholder="Enter your email.."
              required
              aria-describedby="emailHelp"
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <br />
            <input
              type="password"
              name="password"
              value={password}
              onChange={onType}
              className="registerInput"
              id="exampleInputPassword1"
              placeholder="Enter your password.."
              required
            />
          </div>
          <div className="mb-3">
            <label>Image</label>
            <br />
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              className="registerInput"
              
            />
          </div>
          <button className="registerButton" type="submit">
            Submit
          </button>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default Register;
