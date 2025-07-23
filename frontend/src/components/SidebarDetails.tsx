import type Canton from "../interfaces/Canton.ts";
import renderCantonElement from "../renderers/CantonRenderer.tsx";

const SidebarDetails = (props: {canton: Canton} ) => {
    return (
        <aside id="sidebar-info">
            <a>Return</a>
            <img alt="kanton-img" src="https://t4.ftcdn.net/jpg/00/60/07/09/360_F_60070989_mN5TNSCuKw0hmCbE2l2QS2AMiV6808pc.jpg"/>
            <div>
                <h2>{props.canton.name}</h2>
                {
                    props.canton.content.map((element) => (
                        renderCantonElement(element)
                    ))
                }
            </div>
        </aside>
    );
}

export default SidebarDetails;