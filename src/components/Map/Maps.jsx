import { memo, useContext, useState } from 'react';
import PinsContext from '../../context';
import { ReactComponent as MarkerIcon } from '../../assets/marker.svg';
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import './Map.scss'
const Maps = () => {
  const { pins, setPins } = useContext(PinsContext);
  const [value, setValue] = useState('');
  const sendNews = () => {
    setPins([
      ...pins,
      {
        id: `${newLocation.lat + Math.random()}`,
        lat: newLocation.lat,
        long: newLocation.long,
        text: value,
      },
    ]);
    setValue('');
    setNewLocation(null);
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      sendNews()
    }
  }
  const [currentPinId, setCurrentPinId] = useState(null);
  const [newLocation, setNewLocation] = useState(null);

  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 48.858372,
    longitude: 2.294481,
    zoom: 8,
  }); 
  const onAddMarker = (e) => {
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
    position: 'absolute',
    zIndex: '2',
  }
  const PopupStyleText = {
    fontSize: '16px',
    maxWidth: '100px',
    height: '100px'
  }

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken="pk.eyJ1IjoienViY292MDEiLCJhIjoiY2t1OG0yOTIyMDloajJ1bXp1bG14bDZtNyJ9.52s7E-zwqUjKUgeOjX25ew  "
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      onClick={onAddMarker}
      transitionDuration={40}
      style={MapStyle}
      mapStyle="mapbox://styles/zubcov01/cku8m5t3b3h8417o32iod27z4">

      {pins.map((pin) => (
        <div key={pin.id}>
          <div className="markerBlock">
            <Marker
              latitude={pin.lat}
              longitude={pin.long}
              offsetLeft={-20}
              offsetTop={-10}>
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
            offsetTop={-10}>
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
            anchor="bottom">
            <input
            className = 'input-marker'
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="text"
              placeholder="Текст новости"
              onKeyDown = {handleKeyPress}
              required
            />
            <button className = 'btn-marker'
            onClick={sendNews}>✔</button>
          </Popup>
        </div>
      )}
    </ReactMapGL>
  );
};

export default memo(Maps);