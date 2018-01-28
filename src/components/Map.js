import React, { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { connect } from 'react-redux';
import {
  Card,
  Icon
} from 'antd';

import * as actions from '../actions';

class Map extends Component {

  componentDidMount() {
    this.props.updateWindowDimensions();
    window.addEventListener('resize', this.props.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  render() {
    const { location, width, height, showCard, updateViewport } = this.props;
    return (
      <ReactMapGL
        {...location.viewport}
        width={width}
        height={height}
        onViewportChange={(viewport) => updateViewport(viewport)}
        mapboxApiAccessToken='pk.eyJ1IjoibGx1ZmFuIiwiYSI6ImNqY3h0dGpxeTA2c2UzM3A3eXF0cW1xNGoifQ.AiV1hlzIXF2F6AfXUzqDyw'
      >
        <Marker latitude={location.latitude} longitude={location.longitude}>
          <Icon type="star" onClick={()=>showCard(true)}/>
          <Card className={location.showCard? '':'hide'} extra={<Icon type="close" onClick={()=>showCard(false)}/>} title={location.name} bordered={false} style={{ width: 300 }}>
            <p>{location.locality}</p>
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
    location: state.location
  }
}

export default connect(mapStateToProps, actions)(Map);