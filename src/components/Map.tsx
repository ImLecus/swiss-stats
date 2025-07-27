import "../styles/map.css"
import {useState} from "react";
import cantons from "../assets/cantons.json";
import L, {type LeafletMouseEvent} from "leaflet";
import {useContext} from "react";
import {InfoContext} from "../Context.tsx";
import {MapContainer, TileLayer, GeoJSON} from "react-leaflet";
import MapControls from "./MapControls.tsx";
import {getCanton} from "../interfaces/Canton.ts";
import "../styles/popup.css"

const DEFAULT_ZOOM = 7.5;
const LIGHT_MODE_MAP = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
const DARK_MODE_MAP = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

function Map() {
    const [zoom, setZoom] = useState(DEFAULT_ZOOM);
    const [hovered, setHovered] = useState("");
    const context = useContext(InfoContext);

    const darkModeMq = window.matchMedia("(prefers-color-scheme: dark)");

    function onEachFeature(feature: GeoJSON.Feature, layer: L.Layer) {
        if(!feature.properties?.name) return;
        layer.on({
            mouseover: (e: LeafletMouseEvent) => {
                setHovered(feature.id as string);

                const canton = getCanton(feature.id as string);
                layer.bindPopup(`<img src=${canton.header} alt=${canton.header} />
                                         <b>${canton.name}</b>`, { closeButton: false })
                    .openPopup(e.latlng);
            },
            mouseout: () => {
                setHovered("");
                layer.closePopup();
            },
            click: () => {
                context?.setSelected(feature.id as string);
                context?.setVisible(true);
                (layer as L.Path).setStyle({fillColor: "#DA291C"});
            }
        });
    }

    return (
        <MapContainer center={[46.8, 8.2]} zoom={zoom} zoomSnap={0.1} zoomDelta={0.2} id="map">
            <TileLayer url={darkModeMq.matches ? DARK_MODE_MAP : LIGHT_MODE_MAP} />
            <GeoJSON data={cantons as GeoJSON.FeatureCollection} style={feature => ({
                fillColor: feature?.id === context?.selected ? "#ba0a0a" : "#afafaf",
                weight: 2,
                opacity: 1,
                color: "#919191",
                fillOpacity: feature?.id === hovered? 0.5 : 0.25
            })} onEachFeature={onEachFeature}>

            </GeoJSON>
            <MapControls setZoom={setZoom} zoom={zoom} />
        </MapContainer>
    )
}

export default Map;