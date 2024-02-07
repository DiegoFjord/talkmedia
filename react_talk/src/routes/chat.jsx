
import {useState, useEffect} from 'react'
import supabase from '../../config/supabaseClient'
import Messages from '../components/querysMessages'
import Converse from '../components/queryConversations'
import { Form, useLoaderData } from "react-router-dom";
import { newconvo } from '../components/newconvo';
import Whom from '../components/whoswho';
export async function loader({ params }) {
    console.log(params)
    const contact = (params.chatId);
    return { contact };
  }
// DEFAULT STARTS BELOW   
export default function ChatPage() {
    const [open, setopen]= useState()
    const { contact } = useLoaderData();
    let jwt = JSON.parse(sessionStorage.getItem('jwt'));


    useEffect(()=>{
        if (sessionStorage.getItem('jwt') == null){
            alert("Please login");
            navigate('/login'); 
        }

    }, []) 




    const[formData, setFormData, ] = useState({
        text:'',
        addusers:'',
    })
 const [formError, setFormError] = useState(null)
    const {text,addusers} = formData

    const onChange = (e) =>{
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = async(e) =>{
        e.preventDefault()


        const { data, error } = await supabase
            .from('messages')
            .insert([{content: text, conversation_id: contact ,user_id:jwt.user.id },])
            .select()
            if (error) {
                console.error('Error inserting data:', error);
              } else {
                console.log('Data inserted successfully:', data);
              }

            if (data){
                console.log(data)                
            }
    }
    function newconvoadd(){
newconvo(jwt.user.id)
    }

    
    const addppl = async(e) =>{
        e.preventDefault()


        const { data, error } = await supabase
        .from('participants')
        .insert({'user_id':addusers,'conversation_id': contact })
        .select()
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
        <div className='fix' >

            <div >
            <Converse individual={jwt.user.id}/>
            <button className='btn' onClick={newconvoadd}>conversation<i className="bi bi-plus"></i></button>

            </div>
            <div className='box' >
        <section className='heading' >
                <Messages chat = {contact}/>
            </section>
         <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                <input  type='text'
                    className='form-control'
                    id='text'
                    name='text'
                    value={text}
                    placeholder='send them a message'
                    onChange={onChange}
                />
                </div>
                <div className="form-group">
                    <button type="submit" className='btn btn-block'><i className="bi bi-send"></i></button>
                </div>
            </form>

            <form onSubmit={addppl}>
                <div className="form-group">
                <input  type='text'
                    className='form-control'
                    id='addusers'
                    name='addusers'
                    value={addusers}
                    placeholder='please addusers'
                    onChange={onChange}
                />
                </div>
                <div className="form-group">
                    <button type="submit" className='btn btn-block'><i className="bi bi-person-plus"></i>
</button>
                </div>
            </form>
         </section>
         </div>
         </div>

    );
}

