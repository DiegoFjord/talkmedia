import supabase from "../../config/supabaseClient";
import {useState, useEffect} from 'react'
import Individual from "../components/person";
import Scroller from "../components/scroller";

export default function Followers({tag,img}) {
  let jwt = JSON.parse(sessionStorage.getItem('jwt'));

  const [usepost, setpost]=useState([])
  // this function displays all the posts of the people userb9 follows
  async function posted() {
      const { data: followingData, error: followingError } = await supabase
      .from('following')
      .select('followed_user_id')
      .eq('user_id', jwt.user.id)
    
    const { data, error } = await supabase
      .from('posts')
      .select('id, posted, user_id')
      .in('user_id', followingData.map(follow => follow.followed_user_id))
      .eq('tags', tag)
                
      if (error) {
          console.error('Error fetching data:', error.message);
          return;
        }
        console.log(data)
        setpost(data)     
    
    }
  
    useEffect(()=>{
        posted()
    }, []) 

  return (
    <div >
      <div className="media-scroller snaps-inline">
      {usepost.length > 0 ? (
        // Map and render the data only if it exists
        usepost.map(message => (
          <h3 key={message.id} >
          <Individual input={message}  text= {message.posted} img ={img} user={message.user_id}/>
          </h3>
        ))            ) : (
        // Render a loading message or some other UI while waiting for data
        <p>Loading...</p>
      )}
    </div>
    </div>
  );

}

