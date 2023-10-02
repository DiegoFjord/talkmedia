import {useState, useEffect} from 'react'
import supabase from '../../config/supabaseClient'

export default function SetupPage() {
    // let jwt = JSON.parse(sessionStorage.getItem('jwt'));

    useEffect(()=>{
        if (sessionStorage.getItem('jwt') == null){
            alert("Please login");
            navigate('/login'); 
        }

    }, []) 


    
    const[formData, setFormData] = useState({
        text:'',
    })

    const {text} = formData

    const onChange = (e) =>{
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = async(e) =>{
        //it works
         e.preventDefault()
        // const { data, error } = await supabase.auth.getSession( "eyJhbGciOiJIUzI1NiIsImtpZCI6IjNYSWkzZ3RHaGF4cXVHeWwiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjkzMTE2MTA4LCJpYXQiOjE2OTMxMTI1MDgsImlzcyI6Imh0dHBzOi8vZ3VrenRlZHVwb3phbnB0a3Jjc3Muc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6ImRjM2NmODQ0LTFlNDItNDY5OC04MWIxLTNjZDVmMGRmYWVjOCIsImVtYWlsIjoiZ2RpZWdvZy4xMDI5MzhAZ21haWwuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6e30sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE2OTMxMTI1MDh9XSwic2Vzc2lvbl9pZCI6IjNmYThiNDZmLWEyNzEtNGRlZC04MzQ4LTczYzM2ZDgwNGE0OCJ9.oiH-sQWbNUa98r94piGyDUjTx-XsPYjodrAnqefG2V4" )
        // const { session, user } = data
        // console.log(data)
        const { data, error } = await supabase.rpc('bacon')

        if (error) {
          console.error('Error: ', error)
        } else {
          console.log('Data: ', data)
        }
              




        
    }
    return(
        <div className='center'>
            <p>you</p>
            <div className='box'>
        <section className='heading'>
            <p >HELLO! choose some things to talk about<br></br>
                EX: this burger place has the best fries</p>
         </section>
         <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                <input  type='password'
                    className='form-control'
                    id='text'
                    name='text'
                    value={text}
                    placeholder='Enter your Interests'
                    onChange={onChange}
                />
                </div>
                <div className="form-group">
                    <button type="submit" className='btn btn-block'>&gt;</button>
                </div>
            </form>
         </section>
         </div>
         </div>

    );
}

