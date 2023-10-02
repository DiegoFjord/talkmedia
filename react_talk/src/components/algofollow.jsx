import supabase from "../../config/supabaseClient";
import {useState, useEffect} from 'react'
import Individual from "./person";

export default function Algofollow() {

const [organized, setorganized]=useState([])

    async function Algofollowing() {

    const { data: followingData, error: followingError } = await supabase
    .from('following')
    .select('followed_user_id')
    .eq('user_id', "dc3cf844-1e42-4698-81b1-3cd5f0dfaec8")
    .limit(25)

  const { data, error } = await supabase
    .from('following')
    .select('id, followed_user_id')
    .in('user_id', followingData.map(follow => follow.followed_user_id))
    .limit(25)


              
    if (error) {
        console.error('Error fetching data:', error.message);
        return;
      }
      console.log(data)
      let letters = []
      let letterCounts = [];
      data.map(count => letters.push(count.followed_user_id))


    for(let i = 0; i < letters.length; i++) {
        let letter = letters[i];
        if(letterCounts[letter]) {
            letterCounts[letter]++;
        } else {
            letterCounts[letter] = 1;
        }
    }
    
    let mappedObj = Object.keys(letterCounts).map(function(key) {
        let newObj = {};
        newObj[key] = letterCounts[key];
        return newObj;
      });
      
      mappedObj.sort(function(a, b) {
        let aValue = Object.values(a)[0]; // Get the count from object a
        let bValue = Object.values(b)[0]; // Get the count from object b
        return bValue - aValue; // Sort in descending order
      });
      
      setorganized(mappedObj)
      console.log(mappedObj); // Outputs: [{a: 1}, {b: 2}, {c: 3}]

    }  
    console.log(organized)


    useEffect(()=>{
      Algofollowing()
  }, []) 


const pic =("data:image/png;base64,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")
return(
<div>
<div id="scroller">
        <div className="media-scroller snaps-inline">
        {organized.map(arri => (
              <Individual input={arri} img={pic} user={Object.keys(arri)[0]} key={Math.floor(Math.random() * 10000)}/>
	))}
          </div>
      </div>


</div>
)
}

