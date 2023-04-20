import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl";
import { useState, useMemo } from "react";
import Pin from "../Pin";
import { resultData } from "../../data";
import "mapbox-gl/dist/mapbox-gl.css";

const TOKEN =
  "pk.eyJ1IjoiZGlsbG9uenEiLCJhIjoiY2s2czd2M2x3MDA0NjNmcGxmcjVrZmc2cyJ9.aSjv2BNuZUfARvxRYjSVZQ"; // Set your mapbox token here

const MapBox = () => {
  const [popupInfo, setPopupInfo] = useState(null);

  const pins = useMemo(
    () =>
      resultData.map((city, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={city.longitude}
          latitude={city.latitude}
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(city);
          }}
        >
          <Pin />
        </Marker>
      )),
    []
  );

  return (
    <div className="pt-40">
      <Map
        initialViewState={{
          latitude: 59.4203,
          longitude: 24.6892,
          zoom: 12.65,
          bearing: 0,
          pitch: 0,
        }}
        mapStyle="mapbox://styles/mapbox/light-v9"
        mapboxAccessToken={TOKEN}
      >
        <GeolocateControl position="top-left" trackUserLocation={true} />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />

        {pins}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            onClose={() => setPopupInfo(null)}
          >
            <div className="px-2 flex gap-4">
              <div className="">
                <img src={popupInfo.image} className="h-[81px] w-full" alt="" />
              </div>
              <div className="text-lg font-poppins font-medium">
                {popupInfo.name}
              </div>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};
export default MapBox;
