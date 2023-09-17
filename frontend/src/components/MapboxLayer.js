import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl'; // Import Mapbox GL
import './MapboxLayer.css'; // Import your CSS file

class MapboxLayer extends Component {
  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZWdkMDIiLCJhIjoiY2xtbTd3NmozMDNlNzJuczYzaHl0Z2hlaiJ9.cLQf6WE4mrIaLFWKzZsz4w';

    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/satellite-streets-v12', // Initial style URL
      center: [this.props.lng, this.props.lat], // starting position [lng, lat]
      zoom: 6 // starting zoom
    });

    const layerList = document.getElementById('menu');
    const inputs = layerList.getElementsByTagName('input');

    for (const input of inputs) {
      input.onclick = () => {
        const layerId = input.id;
        map.setStyle('mapbox://styles/mapbox/' + layerId);
      };
    }
  }

  render() {
    return (
      <div>
        <div id="map" className="map"></div>
        <div id="menu">
          <input id="satellite-streets-v12" type="radio" name="rtoggle" value="satellite" defaultChecked />
          <label htmlFor="satellite-streets-v12">satellite streets</label>
          <input id="light-v11" type="radio" name="rtoggle" value="light" />
          <label htmlFor="light-v11">light</label>
          <input id="dark-v11" type="radio" name="rtoggle" value="dark" />
          <label htmlFor="dark-v11">dark</label>
          <input id="streets-v12" type="radio" name="rtoggle" value="streets" />
          <label htmlFor="streets-v12">streets</label>
          <input id="outdoors-v12" type="radio" name="rtoggle" value="outdoors" />
          <label htmlFor="outdoors-v12">outdoors</label>
        </div>
      </div>
    );
  }
}

export default MapboxLayer;
