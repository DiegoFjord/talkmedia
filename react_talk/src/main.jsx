//AIzaSyANuEcjQHsz7xtPExoAci63l4BMItdjJ44
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from "./routes/root";
import ErrorPage from "./error-page";
import ExplorePage from "./routes/explore";
import SigninPage from "./routes/signin";
import SignupPage from "./routes/signup";
import SetupPage from "./routes/setup";
import PeoplePage from "./routes/people";
import ChatPage from "./routes/chat";
import Profile from './routes/profile';
import supabase from '../config/supabaseClient';
import Contact, {
  loader as contactLoader,
} from "./routes/chat";
import Videopage from './routes/videocall';

window.SERVER_DATA = 'hen';


console.log(SERVER_DATA)


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage />,
    children:[
      {
        path: "setup",
        element: <SetupPage />,
      },
      {
        path: "people",
        element: <PeoplePage />,
      },
      {
        path: "chat/:chatId",
        element: <ChatPage />,
        loader: contactLoader,
    
      },
      {
        path: "profile/:chatId",
        element: <Profile />,
        loader: contactLoader,
      },
      {
        path: "explore",
        element: <ExplorePage />,
      },
      {
        path: "call/:chatId",
        element: <Videopage />,
        loader: contactLoader,
      }  
    ]
  },
  {
    path: "login",
    element: <SigninPage />,
  },
  {
    path: "Signup",
    element: <SignupPage />,
  },


]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
