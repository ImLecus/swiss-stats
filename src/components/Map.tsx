import "../styles/map.css"
import {useState, useEffect, useRef} from "react";
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
    const mapRef = useRef<L.Map | null>(null);
    const [zoom, setZoom] = useState(DEFAULT_ZOOM);
    const [hovered, setHovered] = useState("");
    const context = useContext(InfoContext);
    const darkModeMq = window.matchMedia("(prefers-color-scheme: dark)");
    const SELECTED_COLOR = darkModeMq.matches ? "#ba0a0a" : "#ed0c0c";

    useEffect(() => {
        mapRef.current?.setZoom(zoom);
    }, [mapRef, zoom])

    function onEachFeature(feature: GeoJSON.Feature, layer: L.Layer) {
        if (!feature.properties?.name) return;
        layer.on({
            mouseover: (e: LeafletMouseEvent) => {
                setHovered(feature.id as string);

                const canton = getCanton(feature.id as string);
                layer.bindPopup(`<img src=${canton.header} alt=${canton.header} />
                                         <b>${canton.name}</b>`, {closeButton: false})
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

    function isSelected(feature: GeoJSON.Feature<GeoJSON.GeometryObject, GeoJSON.GeoJsonProperties> | undefined){
        return (feature?.id === context?.selected && context?.visible);
    }

    return (
        <MapContainer center={[46.8, 8.2]} zoom={zoom} zoomSnap={0.1} zoomDelta={0.2} id="map" ref={mapRef}>
            <TileLayer url={darkModeMq.matches ? DARK_MODE_MAP : LIGHT_MODE_MAP} />
            <GeoJSON
                data={cantons as GeoJSON.FeatureCollection}
                onEachFeature={onEachFeature}
                style={ (feature: GeoJSON.Feature<GeoJSON.GeometryObject, GeoJSON.GeoJsonProperties> | undefined) => ({
                fillColor: isSelected(feature)? SELECTED_COLOR : "#afafaf",
                weight: 2,
                opacity: 1,
                color: "#919191",
                fillOpacity:(feature?.id === context?.selected && context?.visible)? 0.65: feature?.id === hovered? 0.7 : 0.3
            })}>
            </GeoJSON>
            <MapControls setZoom={setZoom} zoom={zoom} />
        </MapContainer>
    )
}

export default Map;