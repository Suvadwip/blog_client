import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { postDelete } from '../../apiHandler/apiHandler'
import './post.css'
import { Link } from 'react-router-dom'

const Post = ({post}) => {


    const IMGURL = 'https://blog-api-o3b9.onrender.com/images/'
    const queryClient= useQueryClient();

    const mutation = useMutation({
        mutationFn: postDelete,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["getMethod"] });
        },
      });

  return (
    <div className='post'>
      {post.image && <img className='postImg' src={IMGURL + post?.image} alt='' />}
      <div className='postInfo'>
        <div className='postCats'>
          {post.categories.map((c) => (
            <span className='postCat'>{c.name}</span>
          ))}
        </div>
        <Link to={`/singlePost/${post._id}`} className='link'>
          <span className='postTitle'>{post.title}</span>
        </Link>
        <hr />
        <span className='postDate'>
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className='postDesc'>{post.desc}</p>
    </div>
  )
}

export default Post