import React, { Component, PropTypes } from 'react';
import { View, Text, ListView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Dimensions from 'Dimensions';

import Network from '../model/network';

import SubjectView from './subjectview';

var {width, height} = Dimensions.get('window');

class TheaterMovieCell extends Component {

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

    render() {
        return (
            <View style={styles.item} >
                <View style={styles.cellImageCon}>
                    <Image
                        source={{ uri: this.props.movie.images.large }}
                        style={styles.container}>

                    </Image>
                </View>
                <View style={styles.cellTextCon}>
                    <Text style={styles.cellTextTitle}>
                        {this.props.movie.title}
                    </Text>
                    <Text style={styles.cellTextDirector}>
                        导演：{this.getDirectors(this.props.movie.directors)}
                    </Text>
                    <Text style={styles.cellTextGenres}>
                        {this.getGenres(this.props.movie.genres)}
                    </Text>
                    <Text style={styles.rating}>
                        {this.props.movie.rating.average}
                    </Text>
                </View>
            </View>
        );
    }
}

export default class InTheaters extends Component {

    static title = "正在上映";

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.state = {
            dataSource: ds.cloneWithRows([]),
            title: "正在上映",
            flag:0
        };
    }

    _pressButton() {
        const { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name: 'SubjectView',
                component: SubjectView,
            })
        }
    }

    componentDidMount() {
        // networkObject = new Network();
        if(this.state.flag==0){
            Network.fetchTheaters(0,
            (data) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(data.subjects),
                    flag:1
                });
            });
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
                        <TouchableOpacity onPress={this._pressButton.bind(this)}>
                            <TheaterMovieCell style={styles.item} movie={rowData} ></TheaterMovieCell>
                        </TouchableOpacity>
                    }
                />
            </View>
        )
    }
}

var styles = StyleSheet.create({
    list: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
    item: {
        backgroundColor: '#ffffff',
        margin: 1,
        alignItems: 'center',
        flexDirection: 'row',
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
        width: 60,
        height: (60) * 1.53,
    },
    cellTextCon: {
        margin: 10
    },
    cellTextTitle: {
        fontSize: 14,
        margin: 3
    },
    cellTextDirector: {
        fontSize: 12,
        margin: 3,
        color: 'grey'
    },
    cellTextGenres: {
        fontSize: 12,
        margin: 3,
        color: 'grey'
    },
    rating: {
        margin: 3,
        fontSize: 10,
    }
});
