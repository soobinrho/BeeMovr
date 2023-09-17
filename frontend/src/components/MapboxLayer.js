import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl'; // Import Mapbox GL
import './MapboxLayer.css'; // Import your CSS file
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';


class MapboxLayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 36.77271,
      lng: -2.81361,
      beeValue: null, // To store the value from the API
    };
  }
  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZWdkMDIiLCJhIjoiY2xtbTd3NmozMDNlNzJuczYzaHl0Z2hlaiJ9.cLQf6WE4mrIaLFWKzZsz4w';

    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/satellite-streets-v12', // Initial style URL
      center: [this.props.lng, this.props.lat], // starting position [lng, lat]
      zoom: 5 // starting zoom
    });

    const layerList = document.getElementById('menu');
    const inputs = layerList.getElementsByTagName('input');

    for (const input of inputs) {
      input.onclick = () => {
        const layerId = input.id;
        map.setStyle('mapbox://styles/mapbox/' + layerId);
      };
    }

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
  
      geocoder.on('result', async (e) => {
        this.setState({
          lat: e.result.center[1],
          lng: e.result.center[0],
        });
      
        // Trigger the transition to MapboxLayer
        this.setState({ showMap: true });
      
        // Fetch the beeValue (assuming it's fetched asynchronously)
        const beeValue = await this.fetchBeeValue(e.result.center[1], e.result.center[0]);
      
        // Display the marker with the beeValue
        //this.displayMarker(this.state.beeValue);
      });

    // Function to reset the map to focus on the USA
    const resetMapToUSA = () => {
      map.flyTo({
        center: [-95.7129, 37.0902], // USA's approximate center coordinates
        zoom: 3, // Appropriate zoom level to show the USA
      });
    };

    // Add an event listener to the reset button
    const resetButton = document.getElementById('resetButton');
    resetButton.addEventListener('click', resetMapToUSA);
  } 

  // Function to make an API call to get the bee value
  fetchBeeValue(lat, lng) {
    // Replace with the actual URL of your Flask server
    const apiUrl = `http://localhost:5000/getBeeValue?lat=${lat}&lng=${lng}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Update the beeValue state with the response
        this.setState({ beeValue: data.value });

        // Log the received beeValue for debugging
        console.log('Received beeValue:', this.state.beeValue);
        alert(`Bee Value updated: ${this.state.beeValue}`);
      })
      .catch((error) => {
        console.error('Error fetching bee value:', error);
      });
  }

  render() {
    return (
      <div>
        {/* Reset Position button */}
        <button id="resetButton" className="reset-button">
          Reset Position
        </button>

        {/* Map container with reduced opacity */}
        <div id="map" className="map-cont">
          <div id="menu">
            {/* Your radio button inputs */}
          </div>
        </div>
      </div>
    );
  }
}

export default MapboxLayer;
