import type Canton from "../interfaces/Canton.ts";

function CantonPopup  (props: {canton: Canton}) {
    return (
        <div className="popup">
            <img src={props.canton.header} alt={props.canton.header} />
            <b>{props.canton.name}</b>
        </div>
    )
}

export default CantonPopup;