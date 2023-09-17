import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import './BeeMovrMap.css';

class BeeMovrMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 36.77271,
      lng: -2.81361,
      beeValue: null, // To store the value from the API
    };
  }

  componentDidMount() {
    mapboxgl.accessToken =
      'pk.eyJ1Ijoic2lrYXlsciIsImEiOiJjbG1tc29qNW4wbjM5Mm9wYjZkeTlnNTF6In0.WSjDXDdATCobQdLasaH0pw';

    // Creates map of the Earth with default view
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/satellite-streets-v12', // style URL
      center: [this.props.lng, this.props.lat], // starting position [lng, lat]
      zoom: 7,
    });

    // Creates marker for wanted yield location
    const marker = new mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat([this.props.lng, this.props.lat])
      .addTo(map);

    // Creates search bar and sets up searching
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false,
    });

    map.addControl(geocoder);

    map.on('load', () => {
      map.setFog({});
    });

    // Calculates honey yield
    const getYield = (lng, lat) => {
      // Replace with the actual URL of your Flask server
      const apiUrl = `http://localhost:5000/getBeeValue?lat=${lat}&lng=${lng}`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            beeValue: data.value,
          });

          // Update the marker popup with the bee value
          marker
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }).setText(
                'Estimated Honey Production Value (lbs/colony): ' +
                  this.state.beeValue
              )
            )
            .addTo(map);

          // Log the received beeValue for debugging
          console.log('Received beeValue:', data);
          this.updateBeeValueBox(data.value); // Update the beeValue box
        })
        .catch((error) => {
          console.error('Error fetching bee value:', error);
        });
    };

    // Update the beeValue box content
    const updateBeeValueBox = (value) => {
      const beeValueBox = document.getElementById('bee-value-box');
      if (beeValueBox) {
        beeValueBox.textContent = `Estimated Honey Production Value (lbs/colony): ${value}`;
      }
    };

    /**
     * Gets latitude and longitude when the marker is released from drag over the desired location. Then, the estimated honey yield is calculated.
     **/
    const onDragEnd = () => {
      const lngLat = marker.getLngLat();
      getYield(lngLat.lng, lngLat.lat);
    };

    /**
     * Moves the marker to the desired latitude and longitude, then calculates the honey yield estimate.
     **/
    const moveMarker = (lat, lng) => {
      marker.setLngLat([lng, lat]);
      getYield(lng, lat);
    };

    // Calculates the yield at the initial marker location when the website starts up.
    onDragEnd();

    // Event call to onDragEnd when the marker is released.
    marker.on('dragend', onDragEnd);

    // Event call when searching a location, retrieving latitude and longitude of the result. Then moves the marker to the new location and calculates the estimated honey yield.
    geocoder.on('result', (e) => {
      moveMarker(e.result.center[1], e.result.center[0]);
    });
  }

  render() {
    return (
      <div>
        <div id="map"></div>
        <div id="bee-value-box" className="bee-value-box">
          {this.state.beeValue &&
            `Estimated Honey Production Value (lbs/colony): ${this.state.beeValue}`}
        </div>
      </div>
    );
  }
}

export default BeeMovrMap;