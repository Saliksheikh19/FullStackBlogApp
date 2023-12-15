
import { useLocation , Link} from "react-router-dom";
import "./singlepost.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
export default function SinglePost() {
  const {user} = useContext(Context)
 
  const [title , setTitle] = useState("")
  const [desc , setDesc] = useState("")
  const [updateMode , setUpdateMode] = useState(false)
  const [singlePost , setSinglePost] = useState({})
  const location = useLocation()
  const path = location.pathname.split("/")[2]
  useEffect(() => {
  const getPost = async()=>{
    const res =await axios.get("https://helpful-mittens-ant.cyclic.app/posts/" + path)
    setSinglePost(res.data.data)
    setTitle(res.data.data.title);
    setDesc(res.data.data.desc);
  }
  getPost()

    
  }, [path])
  const handleDelete = async () => {
    try {
      await axios.delete(`https://helpful-mittens-ant.cyclic.app/posts/${singlePost._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`https://helpful-mittens-ant.cyclic.app/posts/${singlePost._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false)
    } catch (err) {}
  };
  
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
       {singlePost.postImage && <img
          className="singlePostImg"
          src={singlePost.postImage}
          alt=""
        />}
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
            {singlePost.username === user.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${singlePost.username}`} className="link">
              <b> {singlePost.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(singlePost.createdAt).toDateString()}
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
}