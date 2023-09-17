import React, { Component } from 'react';
import './BeeMovrLayout.css'; // Import your CSS file
import mapboxgl from 'mapbox-gl'; // Import Mapbox GL
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapboxLayer from './MapboxLayer';

class BeeMovrLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lng: 0,
    };
  }

  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZWdkMDIiLCJhIjoiY2xtbTd3NmozMDNlNzJuczYzaHl0Z2hlaiJ9.cLQf6WE4mrIaLFWKzZsz4w';

    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/satellite-streets-v12', // Initial style URL
      center: [this.state.lng, this.state.lat], // starting position [lng, lat]
      zoom: 1, // starting zoom
    });

    const layerList = document.getElementById('menu');
    const inputs = layerList.getElementsByTagName('input');

    for (const input of inputs) {
      input.onclick = () => {
        const layerId = input.id;
        map.setStyle('mapbox://styles/mapbox/' + layerId);
      };
    }

    // Function to rotate the map by a specified angle
    const rotateMap = () => {
      const currentBearing = map.getBearing();
      const newBearing = (currentBearing + 1) % 360; // Increment the bearing angle
      map.easeTo({ bearing: newBearing }); // Rotate the map
    };

    // Start rotating the map continuously (adjust the interval as needed)
    const rotationInterval = setInterval(rotateMap, 80); // Rotate every 100 milliseconds

    // Stop the rotation when the component unmounts
    this.componentWillUnmount = () => {
      clearInterval(rotationInterval);
    };

    // Create and add the geocoder
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false,
      placeholder: 'Search for places', // Custom placeholder text
    });

    // Add a class to the geocoder container div to apply styles
    const geocoderContainer = geocoder.onAdd(map);
    geocoderContainer.classList.add('mapboxgl-ctrl-geocoder');

    // Add the geocoder to the map
    map.addControl(geocoder);

    // Listen to the "result" event of the geocoder and update state with the new coordinates
    geocoder.on('result', (e) => {
        this.setState({
        lat: e.result.center[1],
        lng: e.result.center[0],
        });

        // Trigger the transition to MapboxLayer
        this.setState({ showMap: true });
    });

    // Reset Position button click event handler
    document.getElementById('resetPositionButton').addEventListener('click', () => {
        // Set the map center and zoom to focus on the USA
        map.flyTo({
        center: [-95.7129, 37.0902], // USA's approximate center coordinates
        zoom: 3, // Appropriate zoom level to show the USA
        });
    });
  }

  render() {
    return (
      <div>
        {this.state.showMap ? (
          <MapboxLayer lat={this.state.lat} lng={this.state.lng}/>
        ) : (
          <div>
            {/* Reset Position button */}
            <button id="resetPositionButton" className="reset-button">
              Reset Position
            </button>

            {/* Map container with reduced opacity */}
            <div id="map" className="map-container">
              <div id="menu">
                {/* Your radio button inputs */}
              </div>
            </div>

            {/* Big fluffy text "BeeMovr" */}
            <div className="big-text">
              <h1>BeeMovr</h1>
            </div>

            {/* Display the latitude and longitude */}
            <div className="coordinates">
              <p>Latitude: {this.state.lat.toFixed(6)}</p>
              <p>Longitude: {this.state.lng.toFixed(6)}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BeeMovrLayout;
