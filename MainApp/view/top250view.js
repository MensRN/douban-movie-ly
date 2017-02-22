import React, { Component, PropTypes } from 'react';
import { View, Text, ListView } from 'react-native';

import Network from '../model/network';

class TopMovieCell extends Component {
  render() {
    console.log('data:' + JSON.stringify(this.props.movie));
    return (
      <Text>
        {this.props.movie.title}: {this.props.movie.year}
      </Text>
    );
  }
}

export default class Top250View extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([])
    };
  }

  componentDidMount() {
    networkObject = new Network();

    networkObject.fetchTop250(0,
    (data)=>{
      console.log('----------------------------------------------------');
      console.log('data:' + JSON.stringify(data.subjects));
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data.subjects),
      });
    });
  }

  render() {
    return (
      <View style={{flex: 1, paddingTop: 22}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <TopMovieCell movie={rowData} ></TopMovieCell>}
        />
      </View>
    )
  }
}

Top250View.propTypes = {
  title: PropTypes.string.isRequired,
  onForward: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};