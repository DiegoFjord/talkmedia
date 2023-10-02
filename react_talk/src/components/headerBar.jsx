import { Outlet, Link } from "react-router-dom";
import { Form, useLoaderData } from "react-router-dom";
import {useEffect} from 'react'

export default function Header({inputs, text, img}) {

  let jwt = JSON.parse(sessionStorage.getItem('jwt'));
  console.log(jwt)

  useEffect(()=>{
      if (jwt.user == null){
          alert("Please login");
          console.log("execute")

      }else{
        console.log("execute")

      }

  }, []) 

    return (
      <div>
        <div className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to={`/explore`} className="header-item">explore</Link>
        <Link to={`/chat/1`} className="header-item">chat</Link>
        <Link to={`/people`} className="header-item">people</Link>
        <Link to={`/login`} className="header-item">signin</Link>
        {jwt?(<Link to={`/profile/${jwt.user.id}`} className="header-item">profile</Link>):<></>}
        </div>

      </div>
    );
  }
  