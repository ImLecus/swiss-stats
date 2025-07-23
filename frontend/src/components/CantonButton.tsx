import "../styles/cantonbutton.css"

interface CantonProps {
    name: string;
}

const CantonButton = (props: CantonProps) =>{
    return(
        <div className="canton-button">
            <img alt={props.name} src="https://t4.ftcdn.net/jpg/00/60/07/09/360_F_60070989_mN5TNSCuKw0hmCbE2l2QS2AMiV6808pc.jpg" />
            <h3>{props.name}</h3>
        </div>
    );
}

export default CantonButton;