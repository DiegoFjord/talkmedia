import {useState, useEffect} from 'react'
import supabase from '../../config/supabaseClient'
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Sockets from "../components/cameraandsocket";
//websockets
import io from "socket.io-client";
const socket = io();
//
export default function SignupPage() {
    let jwt = JSON.parse(sessionStorage.getItem('jwt'));
    let jwt_id;
    const navigate = useNavigate();
    useEffect(()=>{ 
        if (jwt && jwt.session){
            jwt_id = jwt.user.id;
            socket.emit("send_user",{person: jwt_id})
            navigate('/explore');
        }
    }, [socket]) 
  

    const[formData, setFormData] = useState({
        email:'',
        password:'',
    })

    const {email, password} = formData

    const onChange = (e) =>{
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    // const show = async(e) =>{
    //     e.preventDefault()

    //     if (jwt && jwt.session) {
    //         const access_tokener = jwt.session.access_token;
    //         const { data, error } = await supabase.auth.getSession( access_tokener )
    //         console.log(data)
    //         console.log(jwt.user.id);
    //       }
    // }


    const onSubmit = async(e) =>{
        e.preventDefault()
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
          })
          if (error) {
            console.error('Error inserting data:', error);
          } else {
            console.log('Data inserted successfully:', data);

          }

        if (data && !error){
            sessionStorage.setItem('jwt', JSON.stringify(data));
            console.log(jwt);
        }
        if(jwt && jwt.session){
            navigate('/explore');
        }
        if(jwt && !jwt.session){
console.log("please confirm email")
        }
        window.location.reload(false);

    }

    async function guest(){
        const { data, error } = await supabase.auth.signInWithPassword({
            email: "test@test.com",
            password: "000000",
          })
          if (error) {
            console.error('Error inserting data:', error);
          } else {
            console.log('Data inserted successfully:', data);

          }

        if (data && !error){
            sessionStorage.setItem('jwt', JSON.stringify(data));
            console.log(jwt);
        }
        if(jwt && jwt.session){
            navigate('/explore');
        }
        if(jwt && !jwt.session){
console.log("please confirm email")
        }
        window.location.reload(false);

    }
    

    return(
        <>
        <section className='heading'>
            <div>
            <h1 className='centertwo'>
              LOGINN
            </h1>
            <img src='/src/components/talk logo.jpg' alt="" className='logo'/>

            <p>get in</p>
            </div>
         </section>
         <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                <input  type='email'
                    className='form-control'
                    id='email'
                    name='email'
                    value={email}
                    placeholder='Enter your email'
                    onChange={onChange}
                />
                </div>
                <div className="form-group">
                <input  type='password'
                    className='form-control'
                    id='password'
                    name='password'
                    value={password}
                    placeholder='Enter your password'
                    onChange={onChange}
                />
                </div>
                <div className="form-group">
                    <button type="submit" className='btn btn-block'>Submit</button>
                </div>
            </form>
         </section>
         <section className="form">
            <Link to={`/signup`} >dont have an account? Signup</Link>
            <button onClick={() => guest()}>continue as a guest</button>
         </section>
         </>

    );
}

