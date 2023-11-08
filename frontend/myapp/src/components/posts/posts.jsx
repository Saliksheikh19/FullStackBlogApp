import Post from "../post/post"


export default function Posts({posts}) {

  return (
<div className='container d-flex flex-wrap' style={{marginTop:"10px"}}>   
{
posts.data?.map((p)=> (
  <Post post={p}/>
))


}
 
      </div> 
  );
}