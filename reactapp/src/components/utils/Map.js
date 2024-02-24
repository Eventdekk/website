import React, { useState, useEffect } from "react";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";

import mapData from "../../assets/features.json";

export function Map({ planes, airports }) {
  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleMarkerClick = (marker) => {
    console.log(marker);
    setSelectedMarker(marker); // Open the popup for the clicked marker
  };

  return (
    <ComposableMap>
      <ZoomableGroup center={[0, 0]} zoom={1}>
        <Geographies geography={mapData}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#EAEAEC"
                stroke="#D6D6DA"
              />
            ))
          }
        </Geographies>

        {airports.map((airport) => (
          <Marker
            key={airport.id}
            coordinates={[airport.longitude, airport.latitude]}
            onClick={() => handleMarkerClick(airport)}
          >
            {/* Render your airport icon */}
            <circle r={5} fill="blue" />
          </Marker>
        ))}

        {planes.map((plane) => (
          <Marker
            key={plane.id}
            coordinates={[plane.longitude, plane.latitude]}
            onClick={() => handleMarkerClick(plane)}
          >
            {/* Render your plane icon */}
            <circle r={2} fill="red" />
          </Marker>
        ))}
        {selectedMarker && (
          <Marker
            coordinates={[
              selectedMarker.longitude,
              selectedMarker.latitude + 3,
            ]}
          >
            {/* Group for styling the popup */}
            <g>
              {/* Background for the popup */}
              <rect
                x="-30" // Adjust x position as needed
                y="-20" // Adjust y position as needed
                width="120" // Absolute width of the popup
                height="40" // Absolute height of the popup
                fill="white" // Background color
                stroke="#333" // Border color
                strokeWidth="1" // Border width
                rx="5" // Border radius
              />

              {/* Text content */}
              <text
                textAnchor="middle"
                fill="#333" // Text color
                fontWeight="bold" // Text weight
                fontSize="14px" // Font size
                dy=".35em" // Vertical alignment
              >
                {selectedMarker.name}
              </text>
            </g>
          </Marker>
        )}
      </ZoomableGroup>
    </ComposableMap>
  );
}
