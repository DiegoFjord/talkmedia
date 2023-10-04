import Whom from "./whoswho";

export default function Individual({text, img, user}) {
    return(
        <div >
            <div className="media-element ">
            {img ? <img src={img} alt="" /> : null}
            {user && <Whom id = {user}/>}
            <p className="title, break">{text} </p>
            </div>
            
        </div>
    );
}

