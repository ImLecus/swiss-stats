import "../styles/map.css"
import Plot from "react-plotly.js";
import {useState} from "react";
import MapControls from "./MapControls.tsx";
import cantons from "../assets/cantons.json";

const DEFAULT_ZOOM = 7.5;

function Map() {
    const [zoom, setZoom] = useState(DEFAULT_ZOOM);
    return (
        <div id="map">
            <Plot
                data={[
                    {
                        type: "choroplethmap",
                        geojson: cantons,
                        locations: ["ZH", "GE", "BE"],
                        z: [6200, 6400, 5900],
                        featureidkey: "id"
                    },
                ]}
                layout={{
                    map: {
                        style: "open-street-map",
                        center: { lat: 46.8, lon: 8 },
                        zoom: zoom,
                    },
                    margin: { t: 0, b: 0, l: 0, r: 0 },
                    autosize: true,
                }}
                config={{ responsive: true, scrollZoom: true }}
                style={{ width: "100vw", height: "100vh" }}
            />
            <MapControls setZoom={setZoom} zoom={zoom} />
        </div>
    )
}

export default Map;