import React, { Component, PropTypes } from 'react';
import { View, Text, ListView, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import Dimensions from 'Dimensions';

import Network from '../model/network';
import SubjectView from './subjectview';

var {width, height} = Dimensions.get('window');

class TopMovieCell extends Component {
  render() {
    return (
      <TouchableOpacity onPress={() => { this.props.onSelectMovie(this.props.movie); }}>
        <View style={styles.item} >
          <View style={styles.cellImageCon}>
            <Image
              source={{ uri: this.props.movie.images.large }}
              style={styles.container}>
              <Text style={styles.rating}>
                {this.props.movie.rating.average}
              </Text>
            </Image>
          </View>
          <Text>{this.props.movie.title}</Text>
          <Text>{this.props.movie.year}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default class Top250View extends Component {

  static title = "Top250";

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      index: 0,
      loadingMore: false,
      items: [],
      dataSource: ds.cloneWithRows([]),
      title: "Top250"
    };
  }

  loadData() {
    Network.fetchTop250(this.state.index, 10,
      (data) => {
        if (data.subjects != undefined && data.subjects.length > 0) {
          const newItems = [... this.state.items, ...data.subjects];
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(newItems),
            index: this.state.index + 1,
            loadingMore: false,
            isRefreshing: false,
            items: newItems,
          });
        }
      });
  }

  pressButton(movie) {
    const { navigator } = this.props;
    if (navigator) {
      navigator.push({
        name: movie.title,
        component: SubjectView,
        params: {
          movie: movie
        }
      })
    }
  }

  componentDidMount() {
    this.loadData();
  }

  onEndReached = () => {
    if (this.state.loadingMore == false) {
      this.setState({ loadingMore: true });
      this.loadData();
    }
  }
  renderFooter = () => {
    if (this.state.loadingMore) {
      return <ActivityIndicator style={{ alignItems: 'center', }} />;
    } else {
      return <View />
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ListView
          enableEmptySections={true}
          contentContainerStyle={styles.list}
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <TopMovieCell style={styles.item}
              movie={rowData}
              onSelectMovie={() => this.pressButton(rowData)}></TopMovieCell>
          }
          onEndReached={this.onEndReached}
          renderFooter={this.renderFooter}
        />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  item: {
    backgroundColor: '#ffffff',
    margin: 1,
    alignItems: 'center',
    width: (width / 3) - 3,
    height: ((width / 3) - 3) * 1.8
  },
  container: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  cellImageCon: {
    width: (width / 3) - 3,
    height: ((width / 3) - 3) * 1.53,
  },
  rating: {
    fontSize: 20,
    color: 'white',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textShadowColor: 'grey'
  }
});

