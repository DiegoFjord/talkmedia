import supabase from "../../config/supabaseClient";
import {useState, useEffect} from 'react'
import { Form, useLoaderData } from "react-router-dom";


export default function Everyone() {
  const { contact } = useLoaderData();
  console.log(contact)

    let jwt = JSON.parse(sessionStorage.getItem('jwt'));

    const [usedata, setdata]=useState([1,2,3])

    async function posted() {

      let { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('user_id',contact)
      .limit(5)
      console.log(data)
      if(error){
        console.log(error)

      }
      if(data){
          setdata(data)
      }
  
      }

async function remove(here){
  const { error } = await supabase
  .from('posts')
  .delete()
  .eq('id', here)

}

   useEffect(()=>{
       posted()
   }, []) 

 return (
  <div>
  <ul style={{backgroundColor: "gray"}}>

    {usedata.length > 0 ? (
      // Map and render the data only if it exists
      usedata.map(data => (
        <div key={Math.floor(Math.random() * 10000)}>
      <li style={{color: "white"}}>{data.posted}</li>
      {contact == jwt.user.id && <button onClick={()=>remove(data.id)} style={{background: "gray"}}><i className="bi bi-trash-fill"></i></button >}
      </div>
      ))            ) : (
      // Render a loading message or some other UI while waiting for data
      <p>Loading...</p>
    )}
  </ul>
  </div>
 );
}



