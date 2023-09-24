import React from "react";
// openlayers
import Map from "ol/Map";
import Feature from "ol/Feature";
import View from "ol/View";
import { Point, Style, Circle, Fill } from "ol";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";

export default class Mapa extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    this.map = new Map({
      target: "mapContainer",
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([2.896372, 44.6024]),
        zoom: 3
      })
    });
  }

  componentDidUpdate() {
    if (this.props.positions) {
      this.geo_points = this.props.positions.map(
        (p) =>
          new Feature({
            geometry: new Point(fromLonLat(p))
          })
      );

      this.vectorSource = new VectorSource({
        features: this.geo_points
      });

      this.vectorLayer = new VectorLayer({
        source: this.vectorSource,
        style: new Style({
          image: new Circle({
            radius: 6,
            fill: new Fill({ color: "red" })
          })
        })
      });

      this.map.addLayer(this.vectorLayer);
    }
  }

  render() {
    console.log("-> render App");
    return (
      <div
        id="mapContainer"
        ref={this.mapRef}
        style={{ width: "100%", height: "100%" }}
      >
        {" "}
      </div>
    );
  }
}
