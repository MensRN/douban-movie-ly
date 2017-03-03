import React, { Component, PropTypes } from 'react';
import { View, Text, ListView, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';

var {width, height} = Dimensions.get('window');

export default class SubjectView extends Component {

  static title = "Detail";

  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  getGenres(genres) {
    var string = null;
    for (index in genres) {
      if (string == null) {
        string = genres[index];
      } else {
        string = string + "，" + genres[index];
      }
    }
    return string;
  }

  getDirectors(directors) {
    var string = null;
    for (index in directors) {
      if (string == null) {
        string = directors[index].name;
      } else {
        string = string + "，" + directors[index].name;
      }
    }
    return string;
  }

  componentDidMount() {
    //这里获取从FirstPageComponent传递过来的参数: id
    this.setState({
      movie: this.props.movie
    });
  }

  render() {
    if (this.state.movie != null) {
      return (
        <ScrollView>
          <View style={styles.cellImageCon}>
            <Image
              source={{ uri: this.state.movie.images.large }}
              style={styles.container}>
            </Image>
          </View>
          <View style={styles.cellTextCon}>
            <Text style={styles.cellTextTitle}>
              {this.state.movie.title}
            </Text>
            <Text style={styles.cellTextDirector}>
              导演：{this.getDirectors(this.state.movie.directors)}
            </Text>
            <Text style={styles.cellTextGenres}>
              {this.getGenres(this.state.movie.genres)}
            </Text>
            <Text style={styles.rating}>
              {this.state.movie.rating.average}
            </Text>
          </View>
        </ScrollView>
      );
    } else {
      return (<View></View>);
    }
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