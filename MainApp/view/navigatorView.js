import React, { Component } from 'react';
import { AppRegistry, Navigator, Text } from 'react-native';

import Top25View from './top250view';

export default class NavigatorView extends Component {
    render() {
        return (
            <Navigator
                initialRoute={{ title: 'My Initial Scene', index: 0 }}
                renderScene={(route, navigator) => {
                    return <Top25View title="top250View" />
                }}
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper={{
                            LeftButton: (route, navigator, index, navState) =>
                            { return (<Text>Cancel</Text>); },
                            RightButton: (route, navigator, index, navState) =>
                            { return (<Text>Done</Text>); },
                            Title: (route, navigator, index, navState) =>
                            { return (<Text>{route.title}</Text>); },
                        }}
                        style={{ backgroundColor: 'gray' }}
                    />
                }
                style={{paddingTop: 64}}
            />
        )
    }
}