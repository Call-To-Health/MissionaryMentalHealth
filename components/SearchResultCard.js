import React, {useState,useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Image, Text } from "react-native";
import { COLORS, SIZES, SHADOWS, assets } from "../constants";
import { LibrarySubInfo, TaggedItems, Title } from "./LibrarySubInfo";
import { RectButton, CircleButton } from "./Button";

const SearchResultCard = ({ doc }) => {
  const navigation = useNavigation();
  
  if (!doc) {
    return null;
  }

  const createdAt = doc?.createdAt?.toDate()?.toLocaleString().substring(0, 16);

  return (
    <View
      key={doc?.id}
      style={{
        backgroundColor: COLORS.white,
        borderRadius: SIZES.font,
        marginBottom: SIZES.extraLarge,
        margin: SIZES.base,
        ...SHADOWS.dark,
      }}
    >
      <View
        style={{
          width: "100%",
          height: 80,
        }}
      >
        <Image
          source={doc?.image}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
            borderTopLeftRadius: SIZES.font,
            borderTopRightRadius: SIZES.font,
          }}
        />
      </View>

      <LibrarySubInfo date={createdAt} location={doc?.location} />

      <View style={{ width: "100%", padding: SIZES.font }}>
        <Title
          title={doc?.title}
          titleSize={SIZES.large}
        />
      

        <View
          style={{
            marginTop: SIZES.font,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TaggedItems tags={doc.tags} />
        </View>
      </View>
    </View>
  );
};

export default SearchResultCard;
