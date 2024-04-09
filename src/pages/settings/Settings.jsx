import React, { useEffect, useState } from "react";
import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { profileUpdate, userProfileGet } from "../../apiHandler/apiHandler";

const Settings = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    id: "",
  });

  console.log(input);
  const { username, email, password } = input;
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  // console.log(id);
  const PF = "https://blog-api-o3b9.onrender.com/images/";
  // const user = JSON.parse(localStorage.getItem("user")) || null;
  //console.log(user);

  const { data } = useQuery({
    queryKey: ["getMethod", id],
    queryFn: () => userProfileGet(id),
  });

  useEffect(() => {
    if (data) {
      const { username, email, password } = data?.data;
      const newData = {
        username,
        email,
        password,
        id,
      };
      // console.log(newData);
      setInput(newData);
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: profileUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getMethod"] });
      navigate("/");
    },
  });

  const handleInput = (e) => {
    // const { name, value } = e.target;
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    if (file) {
      formData.append("image", file); // Append the file to the formData if it exists
    }
    mutation.mutate(formData);
    setSuccess(true);
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle">Delete Account</span>
        </div>
        <form className="settingsForm">
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : PF + data?.image}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={username}
            placeholder={username}
            onChange={handleInput}
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder={email}
            onChange={handleInput}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            // value={password}
            onChange={handleInput}
          />
          <button
            className="settingsSubmit"
            type="submit"
            onClick={handleUpdate}
          >
            Update
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
};

export default Settings;
