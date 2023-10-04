import {useState, useEffect} from 'react'
import supabase from '../../config/supabaseClient'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useNavigate } from 'react-router-dom';
import Everyone from '../components/everyone';
import { Form, useLoaderData } from "react-router-dom";
import io from "socket.io-client";
import Whom from '../components/whoswho';
import tofollow from '../components/functionfollow';
import { FindIfFollow } from '../components/functionfollow';
const socket = io();


// DEFAULT STARTS BELOW   
export default function Profile() {
    function followbutton(){
        tofollow(jwt.user.id, contact);
    };
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    const { contact } = useLoaderData();
    const navigate = useNavigate();
    const[usetags, setags] = useState([])
    const [isToggle, setToggle] = useState(true);
    function calluser(){
        let room = getRandomInt(100)
        socket.emit("socket_send_call",{person: contact, room:room})
        navigate(`/call/${room}`); 

    }

    let jwt = JSON.parse(sessionStorage.getItem('jwt'));

    useEffect(()=>{
        if (sessionStorage.getItem('jwt') == null){
            alert("Please login");
            navigate('/login'); 
        }
        food()
    }, []) 


    const options = [
        'one', 'two', 'three'
    ];

    const defaultOption = options[0];
          
    const[formData, setFormData, ] = useState({
        text:'',
        place:'',
        username:'',
    })
    const [formError, setFormError] = useState(null)
    const {text, place,username} = formData
    
    const onChange = (e) =>{
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    
    const onSubmit = async(e) =>{
        e.preventDefault()
            const { data, error } = await supabase
                .from('posts')
                .insert([{posted: text, tags:selectedValue.value ,user_id:jwt.user.id,location:place },])
                .select()
            if (error) {
                console.error('Error inserting data:', error);
                } else {
                console.log('Data inserted successfully:', data);
                }
            if (data){
                console.log(data)
                localStorage.setItem("name", "tod");
                let myName = localStorage.getItem("name");
                console.log(myName);

            }
    }

    const optioned = [
        { value: 'one', label: 'hi' },
        { value: 'two', label: 'hi' },
        { value: 'three', label: 'hi' },
    ];
           
// grabs users from identity



     
let datatwo = []
async function food(){
    const { data, error } = await supabase
    .from('tags')
    .select("*")
    if (error) {
        console.error('Error inserting data:', error);
      } 
    // console.log(data)
    data.map(obj => setags(oldArray => [...oldArray, 
            {"value": obj.id,
            "label": obj.tag}
        
    ]))
    // // data.map(obj => console.log(obj.tag))
    // data.map(obj => datatwo.push(obj.tag));
    console.log(usetags)
    // console.log(datatwo)
}

const [selectedValue, setSelectedValue] = useState(1);

const usernamed = async(e) =>{
    e.preventDefault()

const { data, error } = await supabase
  .from('identity')
  .insert([{ user_id: contact, name: username }])
  .select()
    if (error){
        const { data, error } = await supabase
         .from('identity')
        .update({ name: username })
        .eq("user_id", contact)
        .select()


       
    }
}

// Handle the onChange event to update the selected value
const _onSelect = (selectedOption) => {
  setSelectedValue(selectedOption);
  console.log('Selected value:', selectedOption);
  if(selectedOption.value == 5){
    alert("please format as {\"lat\":25.2744,\"lng\":133.7751}");
    setToggle(false)
}else{
    setToggle(true)
}
  console.log(selectedValue.value);
};

return(
    <div >
    <h1>profile</h1>
    <div className="fix">



{contact == jwt.user.id ? (
    <div className='fix'>
    {!isToggle && 
        <div className="form-group">
        <input  type='json'
            className='form-control'
            id='place'
            name='place'
            value={place}
            placeholder='choose a place'
            onChange={onChange}
        />
    </div> 

    }

    <section className="form">
    <form onSubmit={onSubmit}>
        <div className="form-group">
        <input  type='text'
            className='form-control'
            id='text'
            name='text'
            value={text}
            placeholder='make a post'
            onChange={onChange}
        />
        </div>
            <button type="submit"><i className='bi bi-plus-square'></i></button>
    </form>
    <form onSubmit={usernamed}>
        <div className="form-group">
        <input  type='text'
            className='username'
            id='username'
            name='username'
            value={username}
            placeholder='make a username'
            onChange={onChange}
        />
        </div>
            <button type="submit"><i className='bi bi-plus-square'></i></button>
    </form>
    </section>

    <Dropdown options={usetags}  value={defaultOption} onChange={_onSelect} placeholder="Select an option" />
    </div>

) : (
    <div>
    <Whom id={contact} />
    <button onClick={calluser}>call this user</button>
    <FindIfFollow from={jwt.user.id} too={contact}/>
    </div>
)}

</div>
    <Everyone/>
</div>

);
}

