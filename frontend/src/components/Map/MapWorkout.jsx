import MapGL, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl";
import { useState, useMemo } from "react";
import Pin from "../Pin";
import "mapbox-gl/dist/mapbox-gl.css";

const TOKEN =
  "pk.eyJ1IjoiZGlsbG9uenEiLCJhIjoiY2s2czd2M2x3MDA0NjNmcGxmcjVrZmc2cyJ9.aSjv2BNuZUfARvxRYjSVZQ"; // Set your mapbox token here

const MapWorkout = ({ data }) => {
  const [popupInfo, setPopupInfo] = useState(null);

  const pins = useMemo(() => (
    <Marker
      key={`marker-1`}
      longitude={data.location.longitude}
      latitude={data.location.latitude}
      onClick={(e) => {
        e.originalEvent.stopPropagation();
        setPopupInfo(data);
      }}
    >
      <Pin />
    </Marker>
  ));

  return (
    <div className="pt-4">
      <MapGL
        initialViewState={{
          latitude: data.location.latitude,
          longitude: data.location.longitude,
          zoom: 14.65,
          bearing: 0,
          pitch: 0,
        }}
        mapStyle="mapbox://styles/mapbox/light-v9"
        mapboxAccessToken={TOKEN}
        onRender={(event) => event.target.resize()}
        style={{ height: "600px" }}
      >
        <GeolocateControl
          position="top-left"
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          showAccuracyCircle={false}
          showUserLocation={true}
        />
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
      </MapGL>
    </div>
  );
};
export default MapWorkout;
