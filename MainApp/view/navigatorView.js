import React, { Component } from 'react';
import { AppRegistry, Navigator, View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';

export default class NavigatorView extends Component {
    render() {
        return (
            <Navigator
                initialRoute={{ name: this.props.rootScene.name, component: this.props.rootScene, index: 0 }}
                renderScene={(route, navigator) => {
                    let Component = route.component;
                    return <Component {...route.params} navigator={navigator} />
                }}
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper={{
                            LeftButton: (route, navigator, index, navState) => {
                                if (route.index === 0) {
                                    return null;
                                } else {
                                    return (
                                        <TouchableHighlight style={styles.navButtonBg}>
                                            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                                <Image source={require('../resources/back.png')}></Image>
                                                <Text style={styles.navButtonButton} onPress={() => navigator.pop()}>Back</Text>
                                            </View>
                                        </TouchableHighlight>
                                    );
                                }
                            },
                            RightButton: (route, navigator, index, navState) =>
                            { return null; },
                            Title: (route, navigator, index, navState) => {
                                return (<Text style={styles.navTitle}>{route.component.title}</Text>);
                            },
                        }}
                        style={styles.navBar}
                    />
                }
                style={styles.content}
            />
        )
    }
}

const styles = StyleSheet.create({
    content: {
        paddingTop: 64
    },
    navBar: {
        borderBottomColor: 'silver',
        borderBottomWidth: 1
    },
    navTitle: {
        flex: 1,
        paddingTop: 10,
        fontSize: 17
    },
    navButtonBg: {
        flex: 1,
        paddingLeft: 10,
        justifyContent: 'center',
        width:88,
        height:44
    },
    navButtonButton: {
        fontSize: 17,
        paddingLeft: 5,
        color: "#157EFB"
    }
});  