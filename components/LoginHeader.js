import React from "react";
import { View, Text, Image, TextInput,Pressable } from "react-native";
import { COLORS, FONTS, SIZES, assets } from "../constants";
import { useNavigation } from "@react-navigation/native";

const LoginHeader = () => {
    const navigation = useNavigation();
    return (
        <View style={{height: 70,flexDirection: "row",justifyContent: "center",alignItems: "center",paddingHorizontal: SIZES.font}}>
            <Pressable  onPress={() => navigation.navigate("Home")}>
                <Image source={assets.logo} resizeMode="contain" style={{ width: 50, height: 50 }}/>
            </Pressable>
        </View>
    )
};

export default LoginHeader;