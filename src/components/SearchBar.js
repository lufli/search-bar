import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Input,
  Menu
} from 'antd';
import { updateLocation } from '../actions';

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      term: '',
      showOption: false
    }
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.renderOption = this.renderOption.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  renderOption() {
    if(this.state.term==="") {
      return (
        this.props.node.map((element) => (
          <Menu.Item 
            value={element.device.location.coordinates}
            key={element._id}
            name={element.device.name}
            locality={element.device.locality}
            onClick={()=>{this.props.updateLocation(element.device.location.coordinates)}}
            >
              {element.device.name}
          </Menu.Item>
          )
        )
      )
    } else {
      return (
        this.props.node.filter(element => element.device.name.toLowerCase().indexOf(this.state.term.toLowerCase())!==-1)
        .map((element) => (
          <Menu.Item
            value={element.device.location.coordinates}
            key={element._id}
            onClick={()=>{console.log(element.device.location.coordinates); this.props.updateLocation(element.device.location.coordinates)}}
          >
            {element.device.name}
          </Menu.Item>
          )
        )
      )
    }
  }

  onFocus() {
    this.setState({
      showOption: true
    })
  }

  onBlur() {
    this.setState({
      showOption: false
    })
  }

  handleChange(event) {
    this.setState({
      ...this.state,
      term: event.target.value
    })
  }

  handleClick(event) {
    this.props.updateLocation(event.item.props.value, event.item.props.name, event.item.props.locality);
    this.setState({
      showOption: false
    })
  }

  render() {
    const Search = Input.Search;
    return (
      <Card 
        title="Open Map" 
        style={{
          position: 'fixed',
          background: '#ffffff', 
          width: 300, 
          height: 150,
          margin: 15,
          zIndex: 2
        }}
      >
        <Search
          placeholder="Search nodes and places"
          value={this.state.term}
          onSearch={value => console.log(value)}
          onChange={this.handleChange}
          onFocus={this.onFocus}
          
          style={{ width: '100%' }}
        />
          <Menu
            style={{overflowY: "scroll", maxHeight: 300}}
            onClick={this.handleClick}
          >
          {
            this.state.showOption
            ? this.renderOption()
            : null
          }
          </Menu>
      </Card>
    )
  }
}

function mapStateToProps(state) {
  return {
    node: state.node
  }
}

export default connect(mapStateToProps, { updateLocation })(SearchBar);