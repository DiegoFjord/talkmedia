import { Camshow } from "../components/cameraandsocket";
import { useLoaderData } from "react-router-dom";

export default function Videopage({inputs, text, img}) {
    const { contact } = useLoaderData();
    return (
    <div>
        <Camshow user={contact}/>
    </div>
    );
  }
  