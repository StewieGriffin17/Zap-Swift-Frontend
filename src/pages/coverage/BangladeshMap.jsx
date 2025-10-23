import React, { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const BD_CENTER = [23.685, 90.356];

function FlyTo({ target }) {
  const map = useMap();
  useMemo(() => {
    if (target) {
      map.flyTo(target, 10, { duration: 1.1 });
    }
  }, [target, map]);
  return null;
}

export default function BangladeshMap({
  warehouses = [],
  target = null,
  height = 380,
}) {
  return (
    <div className="w-full rounded-xl overflow-hidden ring-1 ring-gray-200">
      <MapContainer
        center={BD_CENTER}
        zoom={7}
        scrollWheelZoom
        style={{ height, width: "100%" }}
        maxBoundsViscosity={0.8}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {target && <FlyTo target={target} />}

        {warehouses
          .filter(
            (w) => Number.isFinite(w.latitude) && Number.isFinite(w.longitude)
          )
          .map((w, idx) => (
            <Marker
              key={`${w.district}-${w.city}-${idx}`}
              position={[w.latitude, w.longitude]}
            >
              <Popup>
                <div className="space-y-1">
                  <div className="font-semibold text-sm">
                    {w.city}, {w.district}
                  </div>
                  <div className="text-xs text-gray-600">
                    Region: <span className="font-medium">{w.region}</span>
                  </div>
                  <div className="text-xs">
                    Status:{" "}
                    <span
                      className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                        w.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {w.status}
                    </span>
                  </div>
                  {Array.isArray(w.covered_area) &&
                    w.covered_area.length > 0 && (
                      <div className="text-xs">
                        <div className="font-medium">Covered Areas:</div>
                        <ul className="list-disc list-inside">
                          {w.covered_area.slice(0, 6).map((a) => (
                            <li key={a}>{a}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  {w.flowchart && (
                    <a
                      href={w.flowchart}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block text-xs text-emerald-700 underline"
                    >
                      View flowchart
                    </a>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
