import React, { Component } from 'react';
import { AppRegistry, Navigator, View, Text, StyleSheet, TouchableHighlight } from 'react-native';

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
                                        <TouchableHighlight style={styles.navButtonBg} >
                                            <Text style={styles.navButtonButton} onPress={() => navigator.pop()}>Back</Text>
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
        fontSize: 20
    },
    navButtonBg: {
        flex: 1,
        paddingTop: 10,
        paddingLeft: 10,
    },
    navButtonButton: {
        fontSize:20,
        color:"#157EFB"
    }

});  