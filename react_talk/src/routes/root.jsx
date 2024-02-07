import {GoogleMap, useLoadScript, Marker,OverlayView} from "@react-google-maps/api"
import { Outlet } from "react-router-dom";
import { useMemo } from "react";
import Header from "../components/headerBar";
import Sockets from "../components/cameraandsocket";
import { Camshow } from "../components/cameraandsocket";
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import io from "socket.io-client";
import Algofollow from "../components/algofollow";
const socket = io();


export default function Root() {
  const navigate = useNavigate();
  let jwt = JSON.parse(sessionStorage.getItem('jwt'));
  let jwt_id;
  useEffect(()=>{ 
      if (sessionStorage.getItem('jwt') == null){
      } else {
          jwt_id = jwt.user.id;
          socket.emit("send_user",{person: jwt_id})
      }
      if (sessionStorage.getItem('jwt') == null){
        alert("Please login");
        navigate('/login'); 
    }

      socket.on("receive_user", (data) => {
          console.log("chicken")
      });
      socket.on("socket_recieve_call", (data) => {
        alert(data.room);
        navigate(`call/${data.room}`); 
      });
  }, [socket]) 


  return (
  <div className="background">
    <Header/>
    <div>
    <Outlet />
    </div>
  </div>
  );
}
