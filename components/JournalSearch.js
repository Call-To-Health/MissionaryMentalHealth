import React from "react";
import { View, Text, Image, TextInput,Pressable } from "react-native";
import { COLORS, FONTS, SIZES, assets } from "../constants";
import { useNavigation } from "@react-navigation/native";

const JournalSearch = ({ onSearch }) => {

  return (
    <View
      style={{backgroundColor: COLORS.primary, padding: SIZES.font,}}>
      
      {/* <View style={{ marginVertical: SIZES.font }}>
      

        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: SIZES.large,
            color: COLORS.white,
            marginTop: SIZES.base / 100,
          }}
        >
          Search below in your journal entries.
        </Text>
      </View> */}

      <View style={{ marginTop: SIZES.font }}>
        <View
          style={{
            width: "100%",
            borderRadius: SIZES.font,
            backgroundColor: COLORS.gray,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: SIZES.font,
            paddingVertical: SIZES.small,
          }}
        >
          <Image
            source={assets.search}
            resizeMode="contain"
            style={{ width: 20, height: 20, marginRight: SIZES.base }}
          />
          <TextInput
            placeholder="Search your journal entries here..."
            style={{ flex: 1 }}
            onChangeText={onSearch}
          />
        </View>
      </View>
    </View>
  );
};

export default JournalSearch;
