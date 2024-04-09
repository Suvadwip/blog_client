import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import "./write.css";
import { postBlog, postGet } from "../../apiHandler/apiHandler";
import { useNavigate } from "react-router-dom";

const Write = () => {
  const navigate= useNavigate()
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  // const [post, setPost] = useState({
  //   title: "",
  //   desc: "",
  //   image: "",
  // });
  //console.log(post);
  //const { title, desc, image } = post;
  const queryClient = useQueryClient();

  // const onType = (e) => {
  //   setPost({ ...post, [e.target.name]: e.target.value });
  // };

  // const handleFileChange = (e) => {
  //   setPost({ ...post, image: e.target.files[0] });
  // };

  const data = JSON.parse(localStorage.getItem("user")) || null;

  console.log(data);

  const mutation = useMutation({
    mutationFn: postBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getMethod"] });
      navigate("/")
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      username: data?.username,
      title,
      desc,
      image,
    };
    console.log(newPost);
    mutation.mutate(newPost);

    // if (file) {
    //   const data = new FormData();
    //   const filename = Date.now() + file.name;
    //   data.append("name", filename);
    //   data.append("image", file);
    //   newPost.file = filename;
    //   console.log(data);
    //   try {
    //     mutation.mutate(data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
  };

  return (
    <div className="write">
      {image && (
        <img className="writeImg" src={URL.createObjectURL(image)} alt="" />
      )}
      <form
        className="writeForm"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setImage(e.target.files[0])}
          />
          <input
            type="text"
            name="title"
            value={title}
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            name="desc"
            value={desc}
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
};

export default Write;
