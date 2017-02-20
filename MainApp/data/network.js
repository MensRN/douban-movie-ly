import React, { Component } from 'react';

const httpHost = "http://localhost:12345";

class NetWork {

    requestNetWork(url, para, update) {
        return fetch(httpHost + url)
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log('responseJson:' + JSON.stringify(responseJson));
                return responseJson;
            })
            .then(update)
            .catch((error) => {
                console.error(error);
            });
    }

    fetchTop250(index, update){
        var para = {"start":index, "count":10};
        this.requestNetWork("/v2/movie/top250",para,update);
    }
}

export default NetWork;