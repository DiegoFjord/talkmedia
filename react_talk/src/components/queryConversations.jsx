import supabase from "../../config/supabaseClient";
import {useState, useEffect} from 'react'
import { Outlet, Link } from "react-router-dom";

//conversations of user query


export default function Converse({individual}) {
  const [useconversation, setconversation]=useState([])
  

  async function posted() {
    const { data, error } = await supabase.from('participants').select(`
    id, 
    user_id, 
    conversations (id, type )
  `)
  .eq('user_id', individual)

          
    if (error) {
      console.error('Error fetching data:', error.message);
      return;
    }
    console.log(data)
    setconversation(data)
    }
      
        useEffect(()=>{
            posted()
        }, []) 
    
  return ( 
    <div>
      {useconversation.length > 0 ? (
        // Map and render the data only if it exists
        useconversation.map(item => (
          <div key={item.id} className='boxtwo'>
            <Link to={`/chat/${item.conversations.id}`}>
              <p>ID: {item.conversations.id}</p>
              <p>Conversation Type: {item.conversations.type}</p>
            </Link>
          </div>
      ))) : (
        // Render a loading message or some other UI while waiting for data
        <p>Loading...</p>
      )}
    </div>
  );
    
}
    

