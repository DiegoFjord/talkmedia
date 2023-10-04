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
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
          <div className="container">
          <a href="#" className="navbar-brand">aloha</a>
          <div className="collapse navbar-collapse"></div>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
            <Link to={`/explore`} className="nav-link">explore</Link>
            </li>

            <li className="nav-item">
            <Link to={`/chat/1`} className="nav-link">chat</Link>
            </li>

            <li className="nav-item">
            <Link to={`/people`} className="nav-link">people</Link>
            </li>

            <li className="nav-item">
            <Link to={`/login`} className="nav-link">signin</Link>
            </li>

            <li className="nav-item">
            {jwt?(<Link to={`/profile/${jwt.user.id}`} className="nav-link">profile</Link>):<></>}
            </li>
          </ul>


          </div>
        </nav>
        <div className="navbar">
        </div>

      </div>
    );
  }
  