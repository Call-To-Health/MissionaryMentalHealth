import React from "react";
import { View, Text, Image, TextInput,Pressable } from "react-native";
import { COLORS, FONTS, SIZES, assets } from "../constants";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const StoryHeader = ({ onSearch }) => {

  return (
    <View
      style={{backgroundColor: COLORS.primary, padding: SIZES.font,justifyContent:'space-between',}}>
      
      <View style={{ marginVertical: SIZES.font }}>
        <Text
          style={{fontFamily: FONTS.regular,fontSize: SIZES.small,color: COLORS.white,}}>
          Hello, Missionary!  👋
        </Text>

        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: SIZES.large,
            color: COLORS.white,
            marginTop: SIZES.base / 100,
          }}
        >
          Search stories like yours!
          <View style={{ width: 45, height: 45 }}>
                <Pressable onPress={() => navigation.navigate("UserAccount")}>
                    <Image source={assets.person01} resizeMode="contain" style={{ width: "100%", height: "100%", borderRadius: 50, elevation:10, shadowRadius:5}}/>
                </Pressable>
            </View>
        </Text>
        
      </View>

      

      <View style={{ marginTop: SIZES.font }}>
        <View
          style={{
            width: "100%",
            borderRadius: SIZES.font,
            backgroundColor: COLORS.gray,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: SIZES.font,
            paddingVertical: SIZES.small - 3,
          }}
        >
          <AntDesign name="search1" size={20} color="white" style={{ marginRight: SIZES.base}} />
          <TextInput
            placeholder="Search for resources..."
            style={{ flex: 1 }}
            onChangeText={onSearch}
          />
        </View>
      </View>
    </View>
  );
};

export default StoryHeader;
