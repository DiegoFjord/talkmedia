import supabase from '../../config/supabaseClient'
import {useState, useEffect} from 'react'

export default function Whom({id}) {
const [user, setuser]= useState(null)
 async function Whoms() {
    let { data, error } = await supabase
    .from('identity')
    .select('name')
    .eq("user_id", id)
    console.log(data[0])
    console.log(error)
    setuser(data[0].name)
  }

  useEffect(()=>{
    Whoms()
}, []) 

  return(
    <div>
        <p>{user}:</p>
    </div>
  )
}

