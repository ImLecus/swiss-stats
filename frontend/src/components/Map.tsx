import "../styles/map.css"
import {useEffect, useRef, useState} from "react";
import MapControls from "./MapControls.tsx";
import cantons from "../assets/cantons.json";
import L, {GeoJSON, type LeafletMouseEvent} from "leaflet";
import {useContext} from "react";
import {InfoContext} from "../Context.tsx";

const DEFAULT_ZOOM = 7.5;

type Feature = L.Layer & {feature: GeoJSON.Feature};

function Map() {
    const [zoom, setZoom] = useState(DEFAULT_ZOOM);

    const mapRef = useRef<L.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const geoJsonRef = useRef<L.GeoJSON | null>(null);
    const selected = useRef<string>("");

    const context = useContext(InfoContext);

    function setStyle(layer: L.Layer, feature: GeoJSON.Feature, style: L.PathOptions){
        if(feature.id === selected.current){
            (layer as L.Path).setStyle({
                fillColor: "#DA291C",
            });
        }
        else {
            (layer as L.Path).setStyle(style);
        }
    }

    const defaultStyle = () => ({
        fillColor: "#afafaf",
        weight: 1,
        opacity: 1,
        color: "#333333",
        fillOpacity: 0.5,
    })

    useEffect(() => {
        if (mapRef.current || !mapContainerRef.current) return;

        const map = L.map("map", {zoomSnap: 0.1, zoomDelta: 0.1}).setView([46.8, 8.2], zoom);
        mapRef.current = map;
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors"
        }).addTo(map);

        function onEachFeature(feature: GeoJSON.Feature, layer: L.Layer) {
            if(feature.id !== context?.selected){
                const popup = L.popup().setContent(`<b>${feature.properties?.name}</b>`);
                popup.options.closeButton = false;
                (layer as L.Path)
                    .on("mouseover", (e: L.LeafletMouseEvent) => {
                    popup.setLatLng(e.latlng).openOn(map);
                    setStyle(e.target, feature, {fillColor: "#9f9f9f"});
                })
                    .on("mouseout", (e: L.LeafletMouseEvent) => {
                    setStyle(e.target, feature, defaultStyle());
                    popup.close();
                })
                    .on("click", () => {
                        context?.setSelected(feature.id as string);
                        context?.setVisible(true);
                        selected.current = feature.id as string;
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


    useEffect(() => {
        if (!geoJsonRef.current) return;
        geoJsonRef.current.eachLayer(layer => {
            const feature = (layer as Feature).feature;
            selected.current = context?.selected ?? "";
            setStyle(layer, feature, defaultStyle());
        })

    }, [context?.selected]);

    return (
        <div id="map" ref={mapContainerRef}>
            <MapControls setZoom={setZoom} zoom={zoom} />
        </div>
    )
}

export default Map;