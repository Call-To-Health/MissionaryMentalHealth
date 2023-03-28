import React from "react";
import { View, Image, Text } from "react-native";
import { SIZES, FONTS, COLORS, SHADOWS, assets } from "../constants";

export const Title = ({ title, subTitle, titleSize, subTitleSize }) => {
  return (
    <View>
      <Text
        style={{
          fontFamily: FONTS.semiBold,
          fontSize: titleSize,
          color: COLORS.primary,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontFamily: FONTS.regular,
          fontSize: subTitleSize,
          color: COLORS.primary,
        }}
      >
        
      </Text>
    </View>
  );
};

export const TaggedItems = ({ tags }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image
        source={assets.tag}
        resizeMode="contain"
        style={{ width: 20, height: 20, marginRight: 2 }}
      />
      <Text
        style={{
          fontFamily: FONTS.medium,
          fontSize: SIZES.font,
          color: COLORS.primary,
        }}
      >
        {tags}
      </Text>
    </View>
  );
};

const ImageCmp = ({ imgUrl, index }) => {
  return (
    <Image
      source={imgUrl}
      resizeMode="contain"
      style={{
        width: 48,
        height: 48,
        borderRadius: 50,
        marginLeft: index === 0 ? 0 : -SIZES.font,
      }}
    />
  );
};

// export const People = () => {
//   return (
//     // <View style={{ flexDirection: "row" }}>
//     //   {[assets.person02, assets.person03, assets.person04].map(
//     //     (imgUrl, index) => (
//     //       <ImageCmp imgUrl={imgUrl} index={index} key={`People-${index}`} />
//     //     )
//     //   )}
//     // </View>
//   );
// };

export const EndDate = () => {
  return (
    <View
      style={{
        paddingHorizontal: SIZES.font,
        paddingVertical: SIZES.base,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.font,
        justifyContent: "center",
        alignItems: "center",
        ...SHADOWS.light,
        elevation: 1,
        maxWidth: "50%",
      }}
    >
      {/* <Text
        style={{
          fontFamily: FONTS.regular,
          fontSize: SIZES.small,
          color: COLORS.primary,
        }}
      >
        type
      </Text> */}
      <Text
        style={{
          fontFamily: FONTS.semiBold,
          fontSize: SIZES.small,
          color: COLORS.primary,
        }}
      >
        ARTICLE
      </Text>
    </View>
  );
};

export const LibrarySubInfo = () => {
  return (
    <View
      style={{
        width: "100%",
        paddingHorizontal: SIZES.font,
        marginTop: -SIZES.extraLarge,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <EndDate />
    </View>
  );
};
