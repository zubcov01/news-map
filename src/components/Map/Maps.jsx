import { memo, useCallback, useContext,useReducer,useRef, useState } from "react";
import PinsContext from "../../context";
import { ReactComponent as MarkerIcon } from "../../assets/marker.svg";
import ReactMapGL, { GeolocateControl, Marker, Popup } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import "./Map.scss";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
const Maps = () => {
  const { pins, setPins } = useContext(PinsContext);
  const [value, setValue] = useState("");
  const sendNews = (e) => {
    setPins([
      ...pins,
      {
        id: `${newLocation.lat + Math.random()}`,
        lat: newLocation.lat,
        long: newLocation.long,
        text: value,
      },
    ]);
    setValue("");
    setNewLocation(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendNews();
    }
  };
  const handleKeyUser = (e) => {
    if (e.key === "Enter") {
      userLoc();
    }
  };
  const [currentPinId, setCurrentPinId] = useState(null);
  const [newLocation, setNewLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null)
  const [userLatitude, setUserLatitude] = useState(0)
  const [userLongitude, setUserLongitude] = useState(0)
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 48.858372,
    longitude: 2.294481,
    zoom: 8,
  });
    
      navigator.geolocation.getCurrentPosition(function (position) {
        setUserLatitude(position.coords.latitude)
        setUserLongitude(position.coords.longitude)
        setPins([
          {
            id: `${position.coords.latitude + Math.random()}`,
            lat: userLatitude,
            long: userLongitude,
            text: '',
          },
        ]);
      });

    const userLoc = () => {
      setUserLocation({
        userLatitude,
        userLongitude
      })

        setPins(pins.map(el => el.id === el.id ?
            {...el,text: value} : el  )) 
          
    }
  const onAddMarker = (e) => {
    setValue(e.target.value = '')
    const [long, lat] = e.lngLat;
    setNewLocation({
      lat,
      long,
    });
  };

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPinId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const MapStyle = {
    position: "absolute",
    zIndex: "2",
  };
  const PopupStyleText = {
    fontSize: "16px",
    maxWidth: "100px",
    height: "100px",
  };

  const geolocateStyle = {
    bottom: "50px",
    left: 0,
    margin: 10,
  };
  const positionOptions = { enableHighAccuracy: true };
  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (nextViewport) => setViewport(nextViewport),
    []
  );

  const handleGeocoderViewportChange = useCallback((nextViewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return handleViewportChange({
      ...nextViewport,
      ...geocoderDefaultOverrides,
    });
  }, []);
  const geocoderContainerRef = useRef();

  return (
    <ReactMapGL
      {...viewport}
      ref={mapRef}
      mapboxApiAccessToken="pk.eyJ1IjoienViY292MDEiLCJhIjoiY2t1OG0yOTIyMDloajJ1bXp1bG14bDZtNyJ9.52s7E-zwqUjKUgeOjX25ew"
      onViewportChange={handleViewportChange}
      onClick={onAddMarker}
      transitionDuration={40}
      style={MapStyle}
      mapStyle="mapbox://styles/zubcov01/cku8m5t3b3h8417o32iod27z4"
    >
      <Geocoder
        mapRef={mapRef}
        containerRef={geocoderContainerRef}
        onViewportChange={handleGeocoderViewportChange}
        mapboxApiAccessToken="pk.eyJ1IjoienViY292MDEiLCJhIjoiY2t1OG0yOTIyMDloajJ1bXp1bG14bDZtNyJ9.52s7E-zwqUjKUgeOjX25ew"
        position="bottom-right"
      />
      <GeolocateControl
        style={geolocateStyle}
        positionOptions={positionOptions}
        trackUserLocation
        auto
      />

      {pins.map((pin) => (
        <div key={pin.id}>
          <div className="markerBlock">
            <Marker
              latitude={pin.lat}
              longitude={pin.long}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <div onClick={() => handleMarkerClick(pin.id, pin.lat, pin.long)}>
                <MarkerIcon />
              </div>
            </Marker>
            <div className="popupBlock">
              <Popup
                latitude={pin.lat}
                longitude={pin.long}
                closeButton={false}
                closeOnClick={true}
                onClose={() => setCurrentPinId(null)}
                // anchor="top"
                dynamicPosition={true}
                anchor="bottom"
              >
                <div>
                  <span style={PopupStyleText}>{pin.text}</span>
                </div>
              </Popup>
            </div>
          </div>
        </div>
        
      ))}
      {newLocation && (
        <div>
          <Marker
            latitude={newLocation.lat}
            longitude={newLocation.long}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <div>
              <MarkerIcon />
            </div>
          </Marker>
          <Popup
            latitude={newLocation.lat}
            longitude={newLocation.long}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setNewLocation(null)}
            // anchor="top"
            dynamicPosition={true}
            anchor="bottom"
          >
            <input
              className="input-marker"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="text"
              placeholder="Текст новости"
              onKeyDown={handleKeyPress}
            />
            <button className="btn-marker" onClick={value ? sendNews : ""}>
              ✔
            </button>
          </Popup>
        </div>
      )}
      {!userLocation && (
        <div>
          <Marker
            latitude={userLatitude}
            longitude={userLongitude}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <div>
              <MarkerIcon />
            </div>
          </Marker>
          <Popup
            latitude={userLatitude}
            longitude={userLongitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setNewLocation(null)}
            dynamicPosition={true}
            anchor="bottom"
          >

            <input
              className="input-marker"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="text"
              placeholder="Текст новости"
              onKeyDown={handleKeyUser}
            />
            <button className="btn-marker" onClick={userLoc}>
              ✔
            </button>
          </Popup>
        </div>
      )}
    </ReactMapGL>
  );
};
export default memo(Maps);
