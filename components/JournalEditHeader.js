import React from "react";
import { View, Text, Image, TextInput,Pressable, StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES, assets } from "../constants";
import { useNavigation } from "@react-navigation/native";

const JournalEditHeader = () => {
    const navigation = useNavigation();
    return (
        <View style={{height: 80,flexDirection: "row",justifyContent: "space-between",alignItems: "center",paddingHorizontal: SIZES.font}}>
            <Pressable  onPress={() => navigation.navigate("Home")}>
                <Image source={assets.logo} resizeMode="contain" style={{ width: 50, height: 50 }}/>
            </Pressable>
            <View
    style={{ backgroundColor: COLORS.primary, height: 30, paddingHorizontal: 20 }}>
    <Text style={style.headerTitle}>Edit Journal Entry </Text></View>
            <View style={{ width: 45, height: 45 }}>
                <Pressable onPress={() => navigation.navigate('Tabs', { screen: 'Settings' })}>
                    <Image source={assets.person01} resizeMode="contain" style={{ width: "100%", height: "100%", borderRadius: 50, elevation:10, shadowRadius:5}}/>
                </Pressable>
            </View>
        </View>
    )
};

const style = StyleSheet.create ({
    header: {
      paddingVertical:20,
      flexDirection:'row',
      justifyContent: 'space-between',
      backgroundColor: COLORS.primary,
  
    },
    headerTitle: {
      color:COLORS.white,
      justifyContent: 'center',
      textAlign: 'center',
      alignItems:'center',
      fontWeight:'bold',
      fontSize: 23},})

export default JournalEditHeader;