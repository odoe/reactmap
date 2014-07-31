/** @jsx React.DOM */
/* jshint ignore:start */

(function() {

  var ReactMap = React.createClass({

    propTypes: {
      coordinates: React.PropTypes.array.isRequired,
      zoom: React.PropTypes.number.isRequired,
      basemap: React.PropTypes.string.isRequired
    },

    getInitialState: function() {
      return {
        map: {}
      };
    },

    componentDidMount: function() {
      this.setState({
        map: L.map(this.refs.mapDiv.getDOMNode())
      });

      this.addBaseMap(
        this.state.map.setView(this.props.coordinates, this.props.zoom)
      );

      if (this.props.layers) {
        this.props.layers.map(function(layer) {
          if (layer.type === 'feature') {
            var params = layer.params || {};
            this.addFeatureLayer(layer, params)
              .addTo(this.state.map);
          }
        }.bind(this));
      }

    },

    addFeatureLayer: function(options, params) {
      var layer = new L.esri.FeatureLayer(options.url, params);
      if (options.bindPopupMethod) {
        layer.bindPopup(options.bindPopupMethod);
      }
      return layer;
    },

    addBaseMap: function(m) {
      L.esri.basemapLayer(this.props.basemap).addTo(m);
    },

    render: function() {
      return (
        <div
          ref='mapDiv'
          className='mapContainer'/>
      );
    }

  });

  React.renderComponent(
    <ReactMap
      coordinates={[45.528, -122.680]}
      zoom={13}
      basemap={'Gray'}
      layers={[{
        type: 'feature',
        url: 'http://services.arcgis.com/rOo16HdIMeOBI4Mb/arcgis/rest/services/Portland_Parks/FeatureServer/0',
        params: {
          style: function() {
            return { color: '#70ca49', weight: 2 };
          }
        },
        bindPopupMethod: function(feature) {
          return L.Util.template('<h3>{NAME}</h3>{ACRES} Acres<br><small>Property ID: {PROPERTYID}<small>', feature.properties);
        }
      }]}/>, document.body
  );


})();

/* jshint ignore:end */
