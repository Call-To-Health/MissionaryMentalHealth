import React from "react";
import { View, Text, Image, TextInput,Pressable, StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES, assets } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';


const HomeHeader = (userProfile) => {
    const navigation = useNavigation();
    const user = userProfile ? userProfile.userProfile : null;
    return (
        <View style={{height: 80, flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: SIZES.font}}>
            <Pressable  onPress={() => navigation.navigate("Home")}>
                <Image source={assets.logo} resizeMode="contain" style={{ width: 50, height: 50 }}/>
            </Pressable>
            <View
            style={{ backgroundColor: COLORS.primary, height: 30, paddingHorizontal: 0}}>
                <Text style={style.headerTitle}>
                    Welcome, {user ? (user.gender == 'M' ? 'Elder' : 'Sister') : 'Missionary' }! 
                </Text>
            </View>
            <View style={{ width: 45, height: 45 }}>
                <Pressable onPress={() => navigation.navigate('Tabs', { screen: 'AccountStack' })}>
                    <Ionicons name="person-circle-outline" size={45} color="white" />
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

export default HomeHeader;