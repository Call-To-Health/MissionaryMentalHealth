import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { WebView } from "react-native-webview";
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants';
import { useNavigation } from '@react-navigation/native';

//webURL should be a single string url
export const WebpageView = (webURL) => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ margin: 10, marginTop: 30 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={32} color={COLORS.primary} />
                </TouchableOpacity>
            </View>
            <WebView 
                source={{ uri: webURL.webURL }} 
            />
        </SafeAreaView>
    );
}