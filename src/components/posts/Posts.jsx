import React from 'react'
import Post from '../post/Post'
import './posts.css'
import { useQuery } from '@tanstack/react-query'
import { postGet } from '../../apiHandler/apiHandler'

const Posts = () => {
    const {data,isLoading,isError,error}=useQuery({
        queryKey:["getMethod"],
        queryFn: postGet
    })
    // console.log(data);
    
    if (isLoading) return <h1>....Loading</h1>;
    if (isError) return <h1>{error.message}</h1>;
  return (
    <div className='posts'>
    {data?.data && data?.data.map((p) => {
      return (
        <div key={p._id}>
          <Post post={p}/>
        </div>
      )
    })}
 
  </div>
  )
}

export default Posts