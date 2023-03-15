import React from 'react';
import { View, SafeAreaView, StatusBar, Text } from 'react-native';
import { WebpageView } from "../components/WebpageView";

const AdjustingToMission = () => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <WebpageView 
                webURL="https://www.churchofjesuschrist.org/study/manual/resource-booklet-adjusting-to-missionary-life/introduction?lang=eng" 
                style={{ zIndex: 0, flex: 1 }}
            />
        </SafeAreaView>
    )
};

export default AdjustingToMission;