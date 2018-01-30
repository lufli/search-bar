import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  Card,
  Input,
  Menu,
  Icon
} from 'antd';
import * as actions from '../actions';

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      term: '',
      showOption: false
    }
    this.onFocus = this.onFocus.bind(this);
    this.renderOption = this.renderOption.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.search = _.debounce(this.props.search, 300);
    this.searchLocation = _.debounce(this.props.searchLocation, 300);
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
            >
              {element.device.name}<Icon style={{float: 'right', position: 'relative', top: 14}} type="desktop" />
          </Menu.Item>
          )
        )
      )
    } else {
      const filteredNode = this.props.node.filter(element => element.device.name.toLowerCase().indexOf(this.state.term.toLowerCase())!==-1);
      let mapedResult = [];
      if (filteredNode.length<=2) {
        mapedResult = this.props.result.map((element) => (
          <Menu.Item
            value={element.center}
            key={element.id}
            name={element.text}
            locality={element.place_name}
          >
            {element.text}
          </Menu.Item>
        ))
      }
      return (
        filteredNode.map((element) => (
          <Menu.Item
            value={element.device.location.coordinates}
            key={element._id}
            name={element.device.name}
            locality={element.device.locality}
          >
            {element.device.name}<Icon style={{float: 'right', position: 'relative', top: 14}} type="desktop" />
          </Menu.Item>
          )
        )
        .concat(mapedResult)
      )
    }
  }

  onFocus() {
    this.setState({
      showOption: true
    })
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({
      ...this.state,
      term: value
    })
    if(value==="") {
      return this.props.updateResult([]);
    }
    this.search(value);
  }

  handleClick(event) {
    const { value, name, locality } = event.item.props;
    this.props.updateLocation(value, name, locality);
    this.setState({
      term: name,
      showOption: false
    })
  }

  onSearch() {
    if(this.state.term==="") return;
    this.searchLocation(this.state.term);
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
          onSearch={this.onSearch}
          onChange={this.handleChange}
          onFocus={this.onFocus}
          style={{ width: '100%' }}
        />
          <Menu style={{overflowY: "scroll", maxHeight: 300}} onClick={this.handleClick} >
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
    node: state.node,
    result: state.result
  }
}

export default connect(mapStateToProps, actions)(SearchBar);