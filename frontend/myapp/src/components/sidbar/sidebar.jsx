
import { useState , useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import "./sidebar.css";
import { Context } from "../../context/Context";

export default function Sidebar() {
  const {user} = useContext(Context)
  const [cats , setCats] = useState([]);
  useEffect(()=>{
    const fetchCats = async ()=>{
      const res = await axios.get("https://helpful-mittens-ant.cyclic.app/category")
setCats(res.data)
 

    
    }
    fetchCats()
      },[])
      const uniqueCategories = Array.from(new Set(cats.data?.map((c) => c.name)));
      console.log(uniqueCategories)
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
      <img 
       src={user.profilePicture? user.profilePicture : "data:image/png;base64,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"} alt="" />
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
         {
          uniqueCategories.map((c)=>  ( 
            <li className="sidebarListItem">
            <Link className="link" to={`/?cat=${c}`}>
            {c}
            </Link>
          </li>
          )

          )
         }
         
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
}
