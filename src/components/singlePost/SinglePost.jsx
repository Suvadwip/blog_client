import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { postDelete, postUpdate, singlePostGet } from "../../apiHandler/apiHandler";
import React, { useEffect, useState } from "react";
import "./singlePost.css";

const SinglePost = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  //const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  // console.log(id);\
  const IMGURL = "https://blog-api-o3b9.onrender.com/images/";
  const user = JSON.parse(localStorage.getItem("user")) || null;

  const { data } = useQuery({
    queryKey: ["getMethod", id],
    queryFn: () => singlePostGet(id),
  });
  console.log(data?.data);

  useEffect(() => {
    if (data) {
      const { title, desc } = data?.data;
      setTitle(title);
      setDesc(desc);
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: postUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getMethod"] });
      navigate("/");
    },
  });
  const {mutate} = useMutation({
    mutationFn: postDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getMethod"] });
      navigate("/");
    },
  });

  

  const handleUpdate = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    mutation.mutate({ id, title, desc });
    setUpdateMode(true);
  };

  const handleDelete = async(id) => {
   mutate(id)
  
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {user?.image && (
          <img
            src={IMGURL + data?.data?.image}
            alt=""
            className="singlePostImg"
          />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {data?.data?.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={() =>handleDelete(data?.data?._id)}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${data?.data?.username}`} className="link">
              <b> {data?.data?.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(data?.data?.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
