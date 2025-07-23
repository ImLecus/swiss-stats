import "../styles/map.css"
import {useEffect, useRef, useState} from "react";
import MapControls from "./MapControls.tsx";
import cantons from "../assets/cantons.json";
import L from "leaflet";

const DEFAULT_ZOOM = 7.5;

function Map() {
    const [zoom, setZoom] = useState(DEFAULT_ZOOM);
    const mapRef = useRef<L.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const geoJsonRef = useRef<L.GeoJSON | null>(null);

    useEffect(() => {
        if (mapRef.current || !mapContainerRef.current) return;

        const map = L.map("map", {zoomSnap: 0.1, zoomDelta: 0.1}).setView([46.8, 8.2], zoom);
        mapRef.current = map;
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors"
        }).addTo(map);

        const defaultStyle = () => ({
            fillColor: "#afafaf",
            weight: 1,
            opacity: 1,
            color: "#333333",
            fillOpacity: 0.5,
        })

        const hoverStyle = () => ({
            fillColor: "#9f9f9f",
        })

        function highlightFeature(e: L.LeafletMouseEvent) {
            const layer = e.target as L.Path;
            layer.setStyle(hoverStyle());
            layer.bringToFront();
        }

        function resetHighlight(e: L.LeafletMouseEvent) {
            const layer = e.target as L.Path;
            geoJsonRef.current?.resetStyle(layer);
        }

        function onEachFeature(feature: GeoJSON.Feature, layer: L.Layer) {
            if(feature.properties?.name){
                const popup = L.popup().setContent(`<b>${feature.properties.name}</b>`);
                (layer as L.Path)
                    .on("mouseover", (e: L.LeafletMouseEvent) => {
                    popup.setLatLng(e.latlng).openOn(map);
                    highlightFeature(e);
                })
                    .on("mouseout", (e: L.LeafletMouseEvent) => {
                    resetHighlight(e);
                    popup.close();
                });
            }
        }

        geoJsonRef.current = L.geoJSON(cantons as GeoJSON.FeatureCollection, {
            style: defaultStyle,
            onEachFeature,
        }).addTo(map);

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    return (
        <div id="map" ref={mapContainerRef}>
            <MapControls setZoom={setZoom} zoom={zoom} />
        </div>
    )
}

export default Map;