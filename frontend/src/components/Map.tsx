import "../styles/map.css"
import Plot from "react-plotly.js";
import {useState} from "react";
import MapControls from "./MapControls.tsx";

const DEFAULT_ZOOM = 7.5;

function Map() {
    const [zoom, setZoom] = useState(DEFAULT_ZOOM);
    return (
        <div>
            <Plot
                data={[
                    {
                        type: "scattermapbox",
                        lat: [46.948, 47.3769, 46.2044], // Ejemplo: Berna, Zúrich, Ginebra
                        lon: [7.4474, 8.5417, 6.1432],
                        mode: "markers",
                        marker: { size: 14, color: "#DA291C" },
                        text: ["Berna", "Zúrich", "Ginebra"],
                        hoverinfo: "text",
                    },
                ]}
                layout={{
                    mapbox: {
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