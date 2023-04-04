import React from "react";
import { View, Text, Image, TextInput, Pressable, StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES, assets } from "../constants";
import { useNavigation } from "@react-navigation/native";

const RegisterHeader = () => {
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
            <View style={{ paddingHorizontal: 5,alignItems: 'center',justifyContent:'center', margin: 10}}>
                <Text style={styles.headerTitle}>Register for Resilient Missionary</Text>
            </View>
        </View>

    )
};

export default RegisterHeader;

const styles = StyleSheet.create ( {
header: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
},
headerTitle: {
    fontSize: 24,
    textAlign:'center',
    fontWeight: "bold",
    color: COLORS.white,
    padding: 10,
},

})