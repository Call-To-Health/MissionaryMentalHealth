import React from "react";
import { View, Text, Image, TextInput,Pressable } from "react-native";
import { COLORS, FONTS, SIZES, assets } from "../constants";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const StoryHeader = ({ onSearch }) => {

  return (
    <View
      style={{backgroundColor: COLORS.primary, padding: SIZES.font,justifyContent:'space-between'}}>
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: SIZES.font }}>
        {/* <Text
          style={{fontFamily: FONTS.regular,fontSize: SIZES.small,color: COLORS.white,}}>
          Hello, Missionary!
        </Text> */}

        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{ fontFamily: FONTS.bold, fontSize: SIZES.large, color: COLORS.white }}>
            Search stories like yours!         
          </Text>

          <View style={{ alignItems: 'center', justifyContent: 'flex-end',flex:1, flexDirection:'row' }}>
            <Pressable onPress={() => navigation.navigate('Tabs', { screen: 'AccountStack' })}>
              <Image source={assets.person00} resizeMode="contain" style={{ width: "100%", height: "100%", borderRadius: 50, elevation:10, backgroundColor: 'lightgray', shadowRadius:5}}/>
            </Pressable>
          </View>

        </View>
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
