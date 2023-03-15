import React from 'react';
import { View, SafeAreaView, StatusBar, Text } from 'react-native';
import { WebpageView } from "../components/WebpageView";
import { useRoute } from '@react-navigation/native';


const TalkWebView = () => {
    const route = useRoute();
    const { url, title } = route.params;
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <WebpageView 
                webURL= {url}
                style={{ zIndex: 0, flex: 1 }}
                title={title}
            />
        </SafeAreaView>
    )
};

export default TalkWebView;