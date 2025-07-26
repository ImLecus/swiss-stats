import "../styles/map-controls.css"

function MapControls(props:{setZoom: React.Dispatch<React.SetStateAction<number>>, zoom: number}) {
    return (
        <div id="map-controls">
            <button onClick={() => props.setZoom(Math.max(props.zoom - 1, 1))}>-</button>
            <button onClick={() => props.setZoom(Math.min(props.zoom + 1, 20))}>+</button>
        </div>
    )
}

export default MapControls;