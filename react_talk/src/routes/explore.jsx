import { Form } from "react-router-dom";
import Scroller from "../components/scroller";
import Followers from "../components/query followers";
import {useEffect} from 'react'
import Location from "../components/mapstuff";

export default function ExplorePage() {

  let jwt = JSON.parse(sessionStorage.getItem('jwt'));

  // eventually change this to supabase output 
  const pic ='https://images.unsplash.com/photo-1641353989082-9b15fa661805?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0MzM5ODcyOA&ixlib=rb-1.2.1&q=80&w=400'
  // eventuially individualize each input to coments/images/intersts/etc...
  return(
    
    <div>
      <div className="fix,boxtwo">
      <h1 id='holder' >bonjur</h1>
      <img src='/src/components/talk logo.jpg' alt="" className='logo'/>
      </div >

      <br></br>
      <div >
      <p>comments</p>
      <div><Followers tag = {'1'}/></div>
      <p>Images</p>
      <div><Followers tag = {'2'} img = {pic}/></div>
      <p>Interests</p>
      <div><Followers tag = {'3'} img = {pic}/></div>
      <p>hobbies</p>
      <div><Followers tag = {'3'} img = {pic}/></div>
      <div>
        <Location/>
        <br></br>
      </div>
      </div>
    </div>
  );


}
      