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
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const TOKEN =
  "pk.eyJ1IjoiZGlsbG9uenEiLCJhIjoiY2s2czd2M2x3MDA0NjNmcGxmcjVrZmc2cyJ9.aSjv2BNuZUfARvxRYjSVZQ"; // Set your mapbox token here

const MapBox = ({ data }) => {
  const [popupInfo, setPopupInfo] = useState(null);

  const pins = useMemo(
    () =>
      data.map((city, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={city.location?.longitude}
          latitude={city.location?.latitude}
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
        mapStyle="mapbox://styles/mapbox/streets-v9"
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
            longitude={popupInfo.location?.longitude}
            latitude={popupInfo.location?.latitude}
            onClose={() => setPopupInfo(null)}
          >
            <div className="px-2 flex gap-4">
              <div className="">
                <img src={popupInfo.image} className="h-[60px] w-full" alt="" />
              </div>
              <div className="flex flex-col">
                <div className="text-lg font-poppins font-medium leading-none">
                  {popupInfo.name}
                </div>
                <div className="text-[12px] font-poppins leading-none">
                  {dayjs(popupInfo.startDate).format("HH:mm")} - {dayjs(popupInfo.endDate).format("HH:mm")}
                </div>
                <Link
                  className="border border-orange rounded mt-2 active:ring-2 active:ring-yellow-500 text-center"
                  to={{
                    pathname: `/workout/${popupInfo.id}`,
                  }}
                >
                  more info
                </Link>
              </div>
            </div>
          </Popup>
        )}
      </MapGL>
    </div>
  );
};
export default MapBox;
