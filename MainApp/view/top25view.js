import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

export default class Top250View extends Component {
  render() {
    return (
      <View>
        <Text style={{alignItems:"center",justifyContent: 'center'}} >
          1112312mmnfdmanadsfbasdfbalsjfasljdfhlasjfhlasjdfhalsjdfhlahdjflajkhflajshfljahldfahjsdlfjhasljkdfhasjj

          Current Scene: {this.props.title}</Text>
      </View>
    )
  }
}

Top250View.propTypes = {
  title: PropTypes.string.isRequired,
  onForward: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};