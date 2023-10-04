import ReactSearchBox from "react-search-box";
import everyone from "../components/everyone";
import { Outlet, Link } from "react-router-dom";
import supabase from "../../config/supabaseClient";
import { Webcam, callbutton, answerbutton,updatebutton } from "../components/communicate";
import React, { useRef, useEffect, useState } from 'react';

import io from "socket.io-client";
const socket = io();

 
export default function Sockets(){
  // Room State
  const [room, setRoom] = useState("");

  // Messages States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  return(
    <div>
    <br></br>
<div className="box">
<input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room</button>
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button>
      <h1> Message:</h1>
      {messageReceived}
      </div>


</div>
  )
}

function Camshow({user}){
  const [showWebcam, setShowWebcam] = useState(false);
  function callbuttonpass(){
    callbutton(user)
  }
  function answerbuttonpass(){
    answerbutton(user)
  }
  function updatebuttonpass(){
    updatebutton(user)
  }
  // Room State
  return(
    <div>
    <div>
      {showWebcam? 
      <>
      <Webcam state={showWebcam} user={user}/>
      <button onClick={callbuttonpass}>call button</button>
      <button onClick={answerbuttonpass}>answerbutton</button>
      <button onClick={updatebuttonpass}>updatebutton</button>
      <button onClick={() => setShowWebcam(false)}>hangupbutton</button>
      <p>please press each button multiple times to work. Thank You.</p>
      </>:
      <button onClick={() => setShowWebcam(true)}>opencam</button>
    }

    </div>
    <br></br>
    <br></br>
    <br></br>

</div>
  )
}
export {
  Camshow
}