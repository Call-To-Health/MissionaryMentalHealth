import React from 'react';
import { SafeAreaView } from 'react-native';
import { WebView } from "react-native-webview";
import { useNavigation } from '@react-navigation/native';

//webURL should be a single string url
export const WebpageView = (webURL) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <WebView 
                source={{ uri: webURL.webURL }} 
            />
        </SafeAreaView>
    );
}