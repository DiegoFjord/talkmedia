import Whom from "./whoswho";

export default function Individual({text, img, user}) {
    return(
        <div className="bacon">
            <div className="media-element">
            {img ? <img src={img} alt="" /> : null}
            {user && <Whom id = {user}/>}
            <p className="title">{text} </p>
            </div>
        </div>
    );
}

