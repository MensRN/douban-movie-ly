import React, { Component, PropTypes } from 'react';
import { View, Text, ListView, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Navigator } from 'react-native';
import Dimensions from 'Dimensions';

import Storage from '../model/storage';

import SubjectView from './subjectview';

var {width, height} = Dimensions.get('window');

class FavoriteMovieCell extends Component {

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
            <TouchableOpacity onPress={() => { this.props.onSelectMovie(this.props.movie); }}>
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
            </TouchableOpacity>
        );
    }
}

export default class FavoriteMovie extends Component {

    static title = "收藏";

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.state = {
            index: 0,
            loadingMore: false,
            items: [],
            dataSource: ds.cloneWithRows([]),
        };
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

    loadData() {
        Storage.readAllMovie(
            (data) => {
                if (data != undefined) {
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(data),
                    });
                }
            });
    }

    componentDidMount() {
        this.loadData();
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
                        <FavoriteMovieCell style={styles.item} movie={rowData} onSelectMovie={() => this.pressButton(rowData)}></FavoriteMovieCell>
                    }
                    //onEndReached={this.onEndReached}
                    renderFooter={this.renderFooter}
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
        width: width,
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
        width: 75,
        height: (75) * 1.53,
    },
    cellTextCon: {
        margin: 10
    },
    cellTextTitle: {
        fontSize: 16,
        margin: 3,
        marginBottom: 10
    },
    cellTextDirector: {
        fontSize: 14,
        margin: 3,
        color: 'grey'
    },
    cellTextGenres: {
        fontSize: 14,
        margin: 3,
        color: 'grey'
    },
    rating: {
        margin: 3,
        marginTop: 10,
        fontSize: 12,
    }
});
