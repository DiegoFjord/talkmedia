import {GoogleMap, useLoadScript, Marker,OverlayView,InfoWindow} from "@react-google-maps/api"
import {useState, useEffect} from 'react'
import { useMemo } from "react";
import supabase from "../../config/supabaseClient";
import Whom from "./whoswho";
import Individual from "./person";

const getPixelPositionOffset = (width, height) => ({
  x: -(width / 2),
  y: -(height / 2),
})

export default function Location() {


  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const center = useMemo(() => ({ lat: 36, lng: -116.5 }), []);
  const test =  { id: 1, lat: 36.1699, lng: -115.1398 }
  let jwt = JSON.parse(sessionStorage.getItem('jwt'));
  const tag = 5;
  async function posted() {
    const { data: followingData, error: followingError } = await supabase
    .from('following')
    .select('followed_user_id')
    .eq('user_id', jwt.user.id)
  
  const { data, error } = await supabase
    .from('posts')
    .select('id,location,posted,user_id')
    .in('user_id', followingData.map(follow => follow.followed_user_id))
    .eq('tags', tag)
              
    if (error) {
        console.error('Error fetching data:', error.message);
        return;
      }
      console.log(data)
      data.map(info=> console.log(JSON.parse(info.location)))
      setloc(data)
  }

  useEffect(()=>{   

    posted()
  }, []) 


const [markers, setloc] = useState([]);

const [selectedMarker, setSelectedMarker] = useState(null);
//PASSINGIN STRING THATS WHY NO WORKING
  return (
    <GoogleMap
    mapContainerClassName="map"
      id="map"
      // mapContainerStyle={{ height: "400px", width: "100%" }}
      zoom={8}
      center={{ lat: 36.1699, lng: -115.1398 }}
    >
{console.log(markers)}

      {markers.map((marker) => (
        <Marker 
          key={marker.id} 
          position={JSON.parse(marker.location)} 
          onClick={() => {
            setSelectedMarker(marker);
          }}
        />

      ))}
      {selectedMarker && (
        <InfoWindow
          // position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
          position={JSON.parse(selectedMarker.location)}
          onCloseClick={() => {
            setSelectedMarker(null);
          }}
        >
          <div>
          
          <h2><Individual user={selectedMarker.user_id}/></h2>
          <h2>{selectedMarker.posted}</h2>
            <p>This is a popup!{"markers"}</p>
          </div>
        </InfoWindow>
      )}



    </GoogleMap>
  );

}


