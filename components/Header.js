import React from "react";
import { View, Text, Image, TextInput,Pressable } from "react-native";
import { COLORS, FONTS, SIZES, assets } from "../constants";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
    const navigation = useNavigation();
    return (
        <View style={{height: 80,flexDirection: "row",justifyContent: "space-between",alignItems: "center",paddingHorizontal: SIZES.font}}>
            <Pressable  onPress={() => navigation.navigate("Home")}>
                <Image source={assets.logo} resizeMode="contain" style={{ width: 50, height: 50 }}/>
            </Pressable>

            <View style={{ width: 45, height: 45 }}>
                <Pressable onPress={() => navigation.navigate('Tabs', { screen: 'Settings' })}>
                    <Image source={assets.person00} resizeMode="contain" style={{ width: "100%", height: "100%", borderRadius: 50, elevation:10, shadowRadius:5}}/>
                </Pressable>
            </View>
        </View>
    )
};

export default Header;