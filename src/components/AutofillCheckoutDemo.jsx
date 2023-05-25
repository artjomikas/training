import { useState, useCallback, useEffect } from "react";
import {
  AddressAutofill,
  AddressMinimap,
  config,
} from "@mapbox/search-js-react";

export default function Address({defLocation, setLocation}) {
  const [showFormExpanded, setShowFormExpanded] = useState(false);
  const [showMinimap, setShowMinimap] = useState(false);
  const [feature, setFeature] = useState();
  const [token, setToken] = useState("");

  function handleSaveMarkerLocation(coordinate) {
    console.log(`Marker moved to ${JSON.stringify(coordinate)}.`);
  }

  useEffect(() => {
    const accessToken =
      "sk.eyJ1IjoiYWxtYXBvd2VsbCIsImEiOiJjbGR0amdicjYyMjFpM3BvNDA4b3hkZXN3In0.A0Rpl1tlRN4tWU6HO4JHdQ";
    setToken(accessToken);
    config.accessToken = accessToken;
  }, []);

  const handleRetrieve = useCallback(
    (res) => {
      const feature = res.features[0];
      setLocation(feature)

      setFeature(feature);
      setShowMinimap(true);
      setShowFormExpanded(true);
    },
    [setFeature, setShowMinimap]
  );

  return (
    <form>
      <div className="font-poppins">
        <label
          className="label"
          htmlFor="address"
        >
          Address
        </label>
        <AddressAutofill accessToken={token} onRetrieve={handleRetrieve}>
          <input
            className="input"
            id="address"
            defaultValue={defLocation}
            type="text"
            required
            autoComplete="address-line1"
            placeholder="Start typing the address, e.g. 123 Main..."

          />
        </AddressAutofill>


        <div
          style={{ display: showFormExpanded ? "flex" : "none" }}
          className="flex flex-col gap-2 pt-4"
        >
          <div className="py-1">
            <label className="block font-medium text-sm text-slate-700 capitalize">
              City
            </label>
            <input
              className="outline-none py-2 px-2 border border-voilet-200 focus:border-amber-300 focus:ring focus:ring-amber-200 focus:ring-opacity-50 rounded shadow-sm mt-1 block w-full"
              placeholder="City"
              autoComplete="address-level2"
            />
          </div>

          <div className="py-1">
            <label className="block font-medium text-sm text-slate-700 capitalize">
              State / Region
            </label>
            <input
              className="outline-none py-2 px-2 border border-voilet-200 focus:border-amber-300 focus:ring focus:ring-amber-200 focus:ring-opacity-50 rounded shadow-sm mt-1 block w-full"
              placeholder="State / Region"
              autoComplete="address-level1"
            />
          </div>

          <div className="py-1">
            <label className="block font-medium text-sm text-slate-700 capitalize">
              ZIP / Postcode
            </label>
            <input
              className="outline-none py-2 px-2 border border-voilet-200 focus:border-amber-300 focus:ring focus:ring-amber-200 focus:ring-opacity-50 rounded shadow-sm mt-1 block w-full"
              placeholder="ZIP / Postcode"
              autoComplete="postal-code"
            />
          </div>
        </div>
      </div>

      <div className="h-[350px] pt-4">
        <AddressMinimap
          canAdjustMarker={true}
          satelliteToggle={true}
          feature={feature}
          show={showMinimap}
          onSaveMarkerLocation={handleSaveMarkerLocation}
        />
      </div>
    </form>
  );
}
