import React from "react";
import { View, Text, Image } from "react-native";
import { TaggedItems } from "./SubInfo";
import { COLORS, SIZES, FONTS } from "../constants";


const DetailsArticle = ({ story }) => {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: SIZES.base,
        paddingHorizontal: SIZES.base,
      }}
      key={story?.id}
    >
      <Image
        source={story?.image}
        resizeMode="contain"
        style={{ width: 48, height: 48 }}
      />

      <View
        style={{
          flex: 1,
          alignItems: "center",
          paddingHorizontal: SIZES.base,
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.semiBold,
            fontSize: SIZES.small,
            color: COLORS.primary,
          }}
        >
          Similar story by {story?.name}
        </Text>
        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: SIZES.small - 2,
            color: COLORS.secondary,
            marginTop: 3,
          }}
        >
          {story?.date}
        </Text>
      </View>

      <TaggedItems tags={story?.tags} />
    </View>
  );
};

export default DetailsArticle;