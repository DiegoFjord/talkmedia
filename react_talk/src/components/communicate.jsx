
import supabase from "../../config/supabaseClient";
import React, { useRef, useEffect } from 'react';

const food = bacon

const iceArray = [];


const servers = {
  iceServers:[
      {
          urls:['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
      }
  ]
}

// Global State
const pc = new RTCPeerConnection(servers);
let localStream = null;
let remoteStream = null;

// const webcamVideo = document.getElementById('webcamVideo');
// const callButton = document.getElementById('callButton');
// const callInput = document.getElementById('callInput');
// const remoteVideo = document.getElementById('remoteVideo');
// const hangupButton = document.getElementById('hangupButton');

//media sources

/////////////////////////IGNORE BELOW///////////////////////////////////////////////////

export function Webcam({state}){
  const videoRef = useRef(null);
  const videoReftwo = useRef(null);

async function toggle(){
  localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  remoteStream = new MediaStream();

  // Push tracks from local stream to peer connection
  localStream.getTracks().forEach((track) => {
    pc.addTrack(track, localStream);
  });

  // Pull tracks from remote stream, add to video stream
  pc.ontrack = (event) => {
    event.streams[0].getTracks().forEach((track) => {
      remoteStream.addTrack(track);
    });
  };     
  videoRef.current.srcObject = localStream;
  videoReftwo.current.srcObject = remoteStream;
  // remoteVideo.srcObject = remoteStream;

  // callButton.disabled = false;
  // answerButton.disabled = false;
  // webcamButton.disabled = true;
  if (state == false){
    localStream.getTracks().forEach(track => {
      track.stop();
    });
    pc.close();

      }else{
console.log("hi")      }
  
}


useEffect(()=>{
  toggle()
}, [state]) 



return (
    <div>
  <video ref={videoRef}  autoPlay/>
  <video ref={videoReftwo}  autoPlay/>
   </div>
  );

};





////////////////////////////////////////////////////////////////////////////

// 2 create an offer

export async function callbutton(user){

//save iceies to database

  pc.onicecandidate = async (event) => {
    if (event.candidate) {
      console.log('ICE Candidate:', 'ICECREATED');
      iceArray.push(event.candidate);
      const serializedCandidates = JSON.stringify(iceArray);

  
      // Update the offer candidates in Supabase
      try {
        
        const { data: create, errordos} = await supabase
        .from('signaling')
        .insert([
          { id: user},
        ])
        .select()
        console.log(errordos)


        const { data, error } = await supabase
          .from('signaling') // Replace 'calls' with the name of your table where call data is stored
          .update({ offer_candidate: serializedCandidates })
          .eq('id', user); // Assuming you have a call ID stored in 'callInput.value'
          console.log(data)

        if (error) {
          console.error('Error updating offer candidates:', error);
        } else {
          console.log('Offer candidates updated successfully:', 'Yes');
        }
      } catch (err) {
        console.error('An error occurred:', err);
      }
    }
  };

  // Create offer
  const offerDescription = await pc.createOffer();
  await pc.setLocalDescription(offerDescription);

  const offer = {
    sdp: offerDescription.sdp,
    type: offerDescription.type,
  };

  //save offer to supabase
    try {
    const { data, error } = await supabase
      .from('signaling') // Replace 'your_table_name' with the actual table name
      .update({ offer: offer })
      .eq('id', user)

    if (error) {
      console.error('Error updating offer:', error);
    } else {
      console.log('Offer updated successfully:', data);
    }
  } catch (err) {
    console.error('An error occurred:', err);
  }
  // listen for remote answer   

};
export async function updatebutton (user){
  try {
    const { data, error } = await supabase
      .from('signaling')
      .select('answer')
      .eq('id', user)
      .single();

      if (error) {
        console.error('Error fetching data:', error.message);
        return;
      }
  
      // Access the 'answer' column from the retrieved data
      const answerData = data.answer;
      console.log('Data for answer_id 8:', JSON.parse(answerData));
      pc.setRemoteDescription(JSON.parse(answerData));
    } catch (err) {
      console.error('Error fetching data:', err.message);
    }
  
  saveanswerice(user)
  
}

//create answer
export async function answerbutton(user){

  pc.onicecandidate = async (event) => {
    if (event.candidate) {
      console.log('ICE Candidate:', 'ICECREATED');
      iceArray.push(event.candidate);
      const serializedCandidates = JSON.stringify(iceArray);

  
      // Update the offer candidates in Supabase
      try {
        const { data, error } = await supabase
          .from('signaling') // Replace 'calls' with the name of your table where call data is stored
          .update({ answer_candidate: serializedCandidates })
          .eq('id', user); // Assuming you have a call ID stored in 'callInput.value'
          
        if (error) {
          console.error('Error updating offer candidates:', error);
        } else {
          console.log('Offer candidates updated successfully:', data);
        }
      } catch (err) {
        console.error('An error occurred:', err);
      }
    }
  };



  try {
    const { data, error } = await supabase
      .from('signaling')
      .select('offer')
      .eq('id', user)
      .single();

      if (error) {
        console.error('Error fetching data:', error.message);
        return;
      }
  
      // Access the 'answer' column from the retrieved data
      const offerData = data.offer;
      console.log('Data for offer_id-8:', JSON.parse(offerData));
      pc.setRemoteDescription(JSON.parse(offerData));
    } catch (err) {
      console.error('Error fetching data:', err.message);
    }

  const answerDescription = await pc.createAnswer();
  await pc.setLocalDescription(answerDescription);
  
  
  const answer = {
    sdp: answerDescription.sdp,
    type: answerDescription.type,
  };

  try {
    const { data, error } = await supabase
      .from('signaling') // Replace 'your_table_name' with the actual table name
      .update({ answer: answer })
      .eq('id', user)

    if (error) {
      console.error('Error updating offer:', error);
    } else {
      console.log('Offer updated successfully:', data);
    }
  } catch (err) {
    console.error('An error occurred:', err);
  }

  try {
    const { data, error } = await supabase
      .from('signaling')
      .select('*')
      .eq('id', user)
      .single();

    if (error) {
      console.error('Error fetching data:', error.message);
      return;
    }

    // Access the 'candidates' column from the retrieved data
    const candidatesData = data.offer_candidate;
    for (const candidate of iceArray) {
      try {
        await pc.addIceCandidate(candidate);
        console.log('ICE candidate added successfully:', candidate);
      } catch (error) {
        console.error('Error adding ICE candidate:', error);
      }
    }
  
    // Console log the data
    console.log('Candidates Data:', JSON.parse(candidatesData));
  } catch (err) {
    console.error('Error fetching data:', err.message);
  }


}

export async function saveanswerice(user){
  try {
    const { data, error } = await supabase
      .from('signaling')
      .select('*')
      .eq('id', user)
      .single();

    if (error) {
      console.error('Error fetching data:', error.message);
      return;
    }

    // Access the 'candidates' column from the retrieved data
    const candidatesData = data.offer_candidate;
    for (const candidate of iceArray) {
      try {
        await pc.addIceCandidate(candidate);
        console.log('ICE candidate added successfully:', 'Yes');
      } catch (error) {
        console.error('Error adding ICE candidate:', error);
      }
    }
  
    // Console log the data
    console.log('Candidates Data:', JSON.parse(candidatesData));
  } catch (err) {
    console.error('Error fetching data:', err.message);
  }
  

}

export default function bacon(){
  console.log(food)
}
