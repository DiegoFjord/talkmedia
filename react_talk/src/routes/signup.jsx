import {useState, useEffect} from 'react'
import supabase from '../../config/supabaseClient'
import { Outlet, Link } from "react-router-dom";

export default function SignupPage() {
    const[formData, setFormData] = useState({
        email:'',
        password:'',
    })

    const {name, email, password, password2} = formData

    const onChange = (e) =>{
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = async(e) =>{
        e.preventDefault()

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
          })
          if (error) {
            console.error('Error inserting data:', error);
          } else {
            console.log('Data inserted successfully:', data);
          }

        if (data){
            console.log(data)
        }

          
          
    }
    return(
        <>
        <section className='heading'>
            <h1>
              Register
            </h1>
            <p>Please create an account</p>
         </section>
         <section className="form">
            <form onSubmit={onSubmit}>
            <div className="form-group">
                <input  type='text'
                    className='form-control'
                    id='name'
                    name='name'
                    value={name}
                    placeholder='Enter your name'
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
                    id='password2'
                    name='password2'
                    value={password2}
                    placeholder='confirm password'
                    onChange={onChange}
                />
                </div>
                <div className="form-group">
                    <button type="submit" className='btn btn-block'>Submit</button>
                </div>
            </form>
         </section>
         <Link to={`/login`} >dont have an account? Login</Link>

         </>

    );
}

