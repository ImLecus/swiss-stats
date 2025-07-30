import "../styles/content-lock.css";
import Mobile from "../assets/mobile.svg";

function ContentLock(props: {visible: boolean}) {
    return (
        <div id={"content-lock"} className={props.visible? "" : "hidden"}>
            <picture>
                <img src={Mobile} alt={"mobile"} width={"50%"}/>
            </picture>
            <p>Please rotate your device</p>
        </div>
    )
}

export default ContentLock;