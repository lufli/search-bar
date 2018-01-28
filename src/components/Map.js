import React, { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { connect } from 'react-redux';
import {
  Card,
  Icon
} from 'antd';

import { updateWindowDimensions, updateViewport } from '../actions';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCard: false
    };
    this.showCard = this.showCard.bind(this);
    this.hideCard = this.hideCard.bind(this);
    
  }

  componentDidMount() {
    this.props.updateWindowDimensions();
    window.addEventListener('resize', this.props.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  showCard() {
    this.setState({
      showCard: true
    })
  }

  hideCard() {
    this.setState({
      showCard: false
    })
  }

  render() {
    const { viewport, latitude, longitude, width, height, updateViewport, name, locality } = this.props;
    return (
      <ReactMapGL
        {...viewport}
        width={width}
        height={height}
        onViewportChange={(viewport) => updateViewport(viewport)}
        mapboxApiAccessToken='pk.eyJ1IjoibGx1ZmFuIiwiYSI6ImNqY3h0dGpxeTA2c2UzM3A3eXF0cW1xNGoifQ.AiV1hlzIXF2F6AfXUzqDyw'
      >
        <Marker latitude={latitude} longitude={longitude}>
          <Icon type="star" onClick={this.showCard}/>
          <Card className={this.state.showCard? '':'hide'} extra={<Icon type="close" onClick={this.hideCard}/>} title={name} bordered={false} style={{ width: 300 }}>
            <p>{locality}</p>
          </Card>
        </Marker>
      </ReactMapGL>
    );
  }
}

function mapStateToProps(state) {
  return {
    width: state.windowDimensions.width,
    height: state.windowDimensions.height,
    latitude: state.location.latitude,
    longitude: state.location.longitude,
    viewport: state.location.viewport,
    name: state.location.name,
    locality: state.location.locality
  }
}

export default connect(mapStateToProps, { updateWindowDimensions, updateViewport })(Map);