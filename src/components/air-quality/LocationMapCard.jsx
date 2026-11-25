import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { MapPin } from "lucide-react";

export default function LocationMapCard({ location }) {
  const lat = Number(location?.lat || -3.2184);
  const lng = Number(location?.lng || 104.6487);

  return (
<div className="flex h-full min-h-[430px] flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-teal-50 text-teal-600">
          <MapPin size={22} />
        </div>

        <div>
          <p className="text-sm font-bold text-teal-600">Monitoring Location</p>
          <h2 className="text-xl font-black text-slate-950">
            {location?.name || "FASILKOM UNSRI"}
          </h2>
        </div>
      </div>

      <div className="mb-4 rounded-2xl bg-slate-50 p-3 text-sm font-semibold text-slate-600">
        Coordinates: {lat}, {lng}
      </div>

      <div className="min-h-[300px] flex-1 overflow-hidden rounded-2xl border border-slate-100">
        <MapContainer
          center={[lat, lng]}
          zoom={15}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={[lat, lng]}>
            <Popup>{location?.name || "Monitoring device location"}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
