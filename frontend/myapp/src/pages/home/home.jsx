
import axios from 'axios'

import Sidebar from '../../components/sidbar/sidebar'
import Header from '../../components/header/Header'
import Posts from '../../components/posts/posts'
import { useState , useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function Home() {
  const {search} = useLocation();
console.log(search)
  const [posts , setPosts] = useState([]);
  useEffect(()=>{
const fetchPosts = async ()=>{
  const res = await axios.get("http://localhost:8000/posts" + search)
setPosts(res.data)
}
fetchPosts()
  },[search])
  return (
   <>
    < Header/>
    <div className="text-center"  >
  
  <div className="row" >
    <div className="col-8"  ><Posts posts={posts}/></div>
    <div className="col-4" ><Sidebar/></div>
  </div>
</div>
   </>
  )
}
