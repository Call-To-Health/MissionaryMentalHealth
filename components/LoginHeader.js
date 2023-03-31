import React from "react";
import { View, Text, Image, TextInput, Pressable, StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES, assets } from "../constants";
import { useNavigation } from "@react-navigation/native";

const LoginHeader = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.header}>
            <View style={{ marginRight: 10 }}>
            <Pressable onPress={() => navigation.navigate('Tabs', { screen: 'HomeStack' })}>
                <Image
                    source={assets.logo}
                    resizeMode="contain"
                    style={{ width: 50, height: 50 }}
                />
                </Pressable>
            </View>
            <View style={{ paddingHorizontal: 15, margin: 10}}>
                <Text style={styles.headerTitle}>Resilient Missionary Login</Text>
            </View>
        </View>

    )
};

export default LoginHeader;

const styles = StyleSheet.create ( {
header: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
},
headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.white,
    padding: 10,
},

})