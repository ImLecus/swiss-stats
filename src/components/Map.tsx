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

function Map() {
    const [zoom, setZoom] = useState(DEFAULT_ZOOM);
    const [hovered, setHovered] = useState("");
    const context = useContext(InfoContext);

    function onEachFeature(feature: GeoJSON.Feature, layer: L.Layer) {
        if(!feature.properties?.name) return;
        layer.on({
            mouseover: (e: LeafletMouseEvent) => {
                setHovered(feature.id as string);

                const canton = getCanton(feature.id as string);
                layer.bindPopup(`<div class="popup">
                                    <img src=${canton.header} alt=${canton.header} />
                                    <b>${canton.name}</b>
                                </div>`, { closeButton: false })
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
            <TileLayer attribution={"&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors"} url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"} />
            <GeoJSON data={cantons as GeoJSON.FeatureCollection} style={(feature)=> ({
                fillColor: feature?.id === context?.selected ? "#DA291C" : "#afafaf",
                weight: 1,
                opacity: 1,
                color: "#333333",
                fillOpacity: feature?.id === hovered? 0.7 : 0.5
            })} onEachFeature={onEachFeature}>

            </GeoJSON>
            <MapControls setZoom={setZoom} zoom={zoom} />
        </MapContainer>
    )
}

export default Map;