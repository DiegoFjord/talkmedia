import { useState, useEffect } from "react"
import supabase from "../../config/supabaseClient"

//to follow a user use this function
export default async function tofollow(from, too){
    const { data, error } = await supabase
    .from('following')
    .insert([
      { user_id: from, followed_user_id: too },
    ])
    .select()  
    console.log(data)
    console.log(error)
    
}
export async function deletefollow(from, too){
    const { error } = await supabase
    .from('following')
    .delete()
    .eq('user_id', from)
    .eq('followed_user_id', too)
  
}
export function FindIfFollow({from, too}){

    const[check, setCheck]= useState()
     async function findIfFollows(){
        const { data, error } = await supabase
    .from('following')
    .select('followed_user_id')
    .eq('user_id',from)  
    .eq('followed_user_id',too)  
    console.log("LOOKHERE",data)
    setCheck(data[0])
    console.log("LOOKHERE",check)
    if (error){
        console.log(error)

    }} 

    useEffect(()=>{
        findIfFollows()
    }, []) 
    function followfunc(){
        tofollow(from, too)
    }
    function unfollowfunc(){
        deletefollow(from, too)
    }

    return(
        <div>
   {!check && <button onClick={followfunc}>follow this user</button> }
   {check && <button onClick={unfollowfunc}>unfollow this user</button> }

        </div>
)
}
