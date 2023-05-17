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

const MapBox = ({ data }) => {
  const [popupInfo, setPopupInfo] = useState(null);

  const pins = useMemo(
    () =>
      data.map((city, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={city.locationLongitude}
          latitude={city.locationLatitude}
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setPopupInfo(city);
          }}
        >
          <Pin />
        </Marker>
      )),
    [data]
  );

  return (
    <div className="pt-16">
      <MapGL
        initialViewState={{
          latitude: 59.4203,
          longitude: 24.6892,
          zoom: 12.65,
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
export default MapBox;
