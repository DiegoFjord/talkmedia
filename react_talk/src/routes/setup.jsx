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

