import supabase from "../../config/supabaseClient";
import {useState, useEffect} from 'react'

// this will all messages from a conversation ex: gett all mwessages from convo 2
export default function Messages({chat}) {

const [usemessage, setmessage]=useState([])
const [useindividal, setindividual]=useState([])
// retrieve the messages from a chat
     async function posted() {
        const { data, error } = await supabase.from('conversations').select(`
        id, 
        type, 
        messages (id, content )
      `)
      .eq('id', chat)
      
         if (error) {
          console.error('Error fetching data:', error.message);
          return;
        }    
      
        setmessage(data)
        console.log(data)
        return data
      }


    useEffect(()=>{
        posted()
    }, [chat]) 

  return (
    <div>
      {usemessage.length > 0 ? (
        // Map and render the data only if it exists
        usemessage[0].messages.map(message => (
          <p key={message.id}>{message.content}</p>
        ))            ) : (
        // Render a loading message or some other UI while waiting for data
        <p>Loading...</p>
      )}



    </div>
  );

}





