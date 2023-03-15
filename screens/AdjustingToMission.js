import React from 'react';
import { View, SafeAreaView, StatusBar, Text } from 'react-native';
import { WebView } from "react-native-webview";
import { CircleButton, FocusedStatusBar } from '../components';
import { assets } from '../constants';
import { useNavigation } from '@react-navigation/native';
import { WebpageView } from "../components/WebpageView";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AdjustingToMission = () => {
    const navigation = useNavigation();
    const Stack = createStackNavigator();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FocusedStatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent={true}
            />
            <View style={{ margin: 10, marginTop: 30 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={32} color="black" />
                </TouchableOpacity>
            </View>
            <WebpageView 
                webURL="https://www.churchofjesuschrist.org/study/manual/resource-booklet-adjusting-to-missionary-life/introduction?lang=eng" 
                style={{ zIndex: 0, flex: 1 }}
            />
        </SafeAreaView>
    )
};

export default AdjustingToMission;