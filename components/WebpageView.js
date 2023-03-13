import React from 'react';
import {SafeAreaView} from 'react-native';
import {WebView} from "react-native-webview";

//webURL should be a single string url
export const WebpageView = (webURL) => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <WebView 
            source={{ uri: JSON.stringify(webURL) }} 
            />
        </SafeAreaView>
    );
}