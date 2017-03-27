import {
    utils as _,
    react as React,
    APIFacade as API
} from '../../../utils/utils';
import ol from 'openlayers'
import './map.css'

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.api = API;
        this.pokemons = [
            { coordinate: [-3737464.9350319784, 2798206.731463732], src: 'http://www.pokepedia.fr/images/7/72/Miniat_6_x_001.png' }
        ]
    }

    componentDidMount() {
        let vectorSource = new ol.source.Vector(
            {
                //create empty vector
            }
        );

        //add the feature vector to the layer vector, and apply a style to whole layer
        let vectorLayer = new ol.layer.Vector({
            source: vectorSource
        });

        let map = new ol.Map({
            layers: [new ol.layer.Tile({ source: new ol.source.OSM() }), vectorLayer],
            target: document.getElementById("map"),
            view: new ol.View({
                center: [0, 0],
                zoom: 3
            })
        });

        for (let pokemon of this.pokemons) {
            const coordinates = new ol.geom.Point(pokemon.coordinate);
            let iconFeature = new ol.Feature({
                geometry: coordinates
            });
            iconFeature.setStyle(
                new ol.style.Style({
                    image: new ol.style.Icon({
                        src: pokemon.src
                    })
                })
            );
            vectorSource.addFeature(iconFeature);
        }

        map.on("click", event => {
            const coordinates = new ol.geom.Point(event.coordinate);
            let iconFeature = new ol.Feature({
                geometry: coordinates
            });
            iconFeature.setStyle(
                new ol.style.Style({
                    image: new ol.style.Icon({
                        src: "http://www.pokepedia.fr/images/7/72/Miniat_6_x_001.png"
                    })
                })
            );
            vectorSource.addFeature(iconFeature);
        });

    }

    render() {
        return (
            <div className="map-container">
                <p>Map</p>
                <div id="map"></div>
            </div>
        )
    }
}