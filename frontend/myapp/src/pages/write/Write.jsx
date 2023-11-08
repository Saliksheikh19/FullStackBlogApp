import { useContext, useState } from "react";
import axios from "axios"
import "./write.css";
import { storage} from "../../firebaseconfig"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Context } from "../../context/Context";


export default function Write() {

  const {user} = useContext(Context)
  const [title , setTitle] = useState("")
  const [desc , setDesc] = useState("")
  const [category , setCategory] = useState("")
  // const [src , setsrc] = useState("")
  const [file , setFile] = useState(null)

 
  async function postHandler(e) {
    e.preventDefault();
    if (!desc && !title && !file) {
        alert('There is nothing to upload')
    } else if (file) {
        /** @type {any} */
        const metadata = {
            contentType: 'image/jpg'
        };

        const storageRef = ref(storage, 'postImages/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;
                    case 'storage/unknown':
                        break;
                }
            },
           async () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    console.log('File available at', downloadURL);
                    setFile(downloadURL)
                    const newPost = {
                        username: user?.username,
                        desc: desc,
                        postImage: downloadURL || "" , 
                        title:title,
                        categories:category


                    }
                    try {
                      setFile(null)
                      const res = await axios.post('http://localhost:8000/posts/', newPost)
                      window.location.replace("/post/" + res.data.post._id)
                     console.log(res)
                        const cat = await axios.post('http://localhost:8000/category/',{name:category})
                        console.log(cat)
                        window.location.replace("/post/" + res.data.post._id)
                   
                    }
                    
                   
                    catch (error) {
                        console.error(error)
                    }
                    
                 
                  
                    
                });
            }
        );
    } else {
        const newPost = {
            username: user?.username,
            desc: desc,
            title:title,
            categories:category,
        }
    
        try {
           const res =  await axios.post('http://localhost:8000/posts/', newPost)
           console.log(res)
           window.location.replace("/post/" + res.data.post._id)
           const cat = await axios.post('http://localhost:8000/category/',{name:category})
          console.log(cat)
           window.location.replace("/post/" + res.data.post._id)
        } 
        catch (error) {
            console.error(error)
        }
       
        
    }
   

   
}



  return (
    <div className="write">
     { file ? <img
        className="writeImg"
        src={URL.createObjectURL(file)}
        alt=""
      /> : null
    }
      <form className="writeForm" onSubmit={postHandler}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input id="fileInput" type="file" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])}/>
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={e=> setTitle(e.target.value)}
          />
           <input
            className="writeInput"
            placeholder="category"
            type="text"
            autoFocus={true}
            onChange={e=> setCategory(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            onChange={e=> setDesc(e.target.value)}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
 }
