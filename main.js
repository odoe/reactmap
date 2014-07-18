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
      this.state.map.setView(this.props.coordinates, this.props.zoom);
      L.esri.basemapLayer(this.props.basemap).addTo(this.state.map);
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
      basemap={'Gray'}/>, document.body
  );


})();

/* jshint ignore:end */
