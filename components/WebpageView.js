import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { WebView } from "react-native-webview";
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants';
import { useNavigation } from '@react-navigation/native';

//webURL should be a single string url
export const WebpageView = (props) => {
    
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ margin: 10, marginTop: 30, flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={32} color={COLORS.primary} />
                </TouchableOpacity>
                <Text style={{ marginLeft: 10, fontSize: 20 }}>{ props.title }</Text>
                <Text>{JSON.stringify(props.webUrl)}</Text>
            </View>
            <WebView 
                source={{ uri: props.webURL }} 
            />
        </SafeAreaView>
    );
}