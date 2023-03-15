import React from 'react';
import { View, SafeAreaView, StatusBar, Text } from 'react-native';
import { CircleButton, FocusedStatusBar } from '../components';
import { COLORS } from '../constants';
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
            <WebpageView 
                webURL="https://www.churchofjesuschrist.org/study/manual/resource-booklet-adjusting-to-missionary-life/introduction?lang=eng" 
                style={{ zIndex: 0, flex: 1 }}
            />
        </SafeAreaView>
    )
};

export default AdjustingToMission;