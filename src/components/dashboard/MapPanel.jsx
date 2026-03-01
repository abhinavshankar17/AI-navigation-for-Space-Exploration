import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default marker icon in React Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function MapPanel({ position, obstacles }) {
    return (
        <div className="glass-panel p-1 border border-[#222] h-full w-full relative overflow-hidden flex flex-col">
            <div className="absolute top-3 left-3 z-[400] bg-black/90 px-2 py-1 border border-[#333] text-[10px] tracking-widest font-mono text-gray-500 uppercase pointer-events-none">
                SYS.MARS_ORBITAL_V2
            </div>
            <div className="absolute top-3 right-3 z-[400] bg-black/90 px-2 py-1 border border-[#333] text-[10px] tracking-[0.2em] font-mono text-[#ff5722] pointer-events-none">
                POS: {Math.abs(position.lat).toFixed(4)}°S {position.lng.toFixed(4)}°E
            </div>

            {/* Static Radar grid overlay */}
            <div className="absolute inset-0 z-[300] pointer-events-none border-[2px] border-transparent"
                style={{ background: 'linear-gradient(rgba(255, 87, 34, 0.04) 1px, transparent 1px) 0 0 / 40px 40px, linear-gradient(90deg, rgba(255, 87, 34, 0.04) 1px, transparent 1px) 0 0 / 40px 40px' }}
            />

            <MapContainer center={[position.lat, position.lng]} zoom={13} scrollWheelZoom={true} className="h-full w-full z-0 contrast-[1.15] brightness-90 sepia-[0.3] hue-rotate-[-10deg]">
                <TileLayer
                    attribution='&copy; <a href="https://openplanetary.org/opm/">OpenPlanetary</a> contributors'
                    url="https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-mars-basemap-v0-2/all/{z}/{x}/{y}.png"
                />
                <Marker position={[position.lat, position.lng]}>
                    <Popup className="font-mono text-[10px] tracking-wider uppercase">
                        ARES-01 MARS ROVER <br /> STATUS: NOMINAL
                    </Popup>
                </Marker>
                <Circle center={[position.lat, position.lng]} radius={300} pathOptions={{ color: '#ff5722', fillColor: '#ff5722', fillOpacity: 0.1, weight: 1, dashArray: '4 4' }} />

                {/* Mock Hazards */}
                {obstacles && obstacles.map((obs, i) => (
                    <Circle key={i} center={[position.lat + 0.01, position.lng + 0.01]} radius={100} pathOptions={{ color: '#00e5ff', fillColor: '#00e5ff', fillOpacity: 0.2, weight: 1 }} />
                ))}
            </MapContainer>
        </div>
    )
}
