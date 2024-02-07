import{useState} from 'react';
import Individual from "../components/person";

export default function Scroller({inputs, text, img}) {
    return (
      <div id="scroller">
        <div className="media-scroller snaps-inline">
          {inputs.map((input) => (
            <h3 key={input.id}>
              <Individual input={input}  text= {"text"} img = {img}/>
            </h3>
          ))}
        </div>
      </div>
    );
  }
  