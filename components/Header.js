import React from "react";
import { View, Text, Image, TextInput, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { COLORS, FONTS, SIZES, assets } from "../constants";

const StoryHeader = ({ onSearch }) => {
  const navigation = useNavigation();

  return (
    <View style={{ backgroundColor: COLORS.primary, padding: SIZES.font }}>
      <View style={{ marginVertical: SIZES.font }}>
        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: SIZES.small,
            color: COLORS.white,
          }}
        >
          Hello, Missionary! 👋
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text
            style={{
              fontFamily: FONTS.bold,
              fontSize: SIZES.large,
              color: COLORS.white,
              marginTop: SIZES.base / 100,
            }}
          >
            Search stories like yours!
          </Text>
          <View style={{ width: 45, height: 45 }}>
            <Pressable onPress={() => navigation.navigate("UserAccount")}>
              <Image
                source={assets.person01}
                resizeMode="contain"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 50,
                  elevation: 10,
                  shadowRadius: 5,
                }}
              />
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
          <AntDesign
            name="search1"
            size={20}
            color="white"
            style={{ marginRight: SIZES.small }}
          />
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
