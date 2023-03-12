import React, {useState,useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Image, Text, TouchableOpacity} from "react-native";
import { SubInfo, TaggedItems, Title } from "./SubInfo";
import { CircleButton } from "./Button";
import { COLORS, SIZES, SHADOWS, assets } from "../constants";
// import { fetchRandomDocs } from "../firebase";

const Card = ({doc,randomDocs}) => {
  const navigation = useNavigation();

  const handlePress = (story) => {
    navigation.navigate('Details', { story: story });
    console.log(`Story id ${story.id} clicked. ${story.experience}` );
  };

  const imageIndex = Math.floor(Math.random() * 7) + 1; // numImages is the total number of available images
  const imageSource = (`assets.missionaries${imageIndex}`);
  // console.log("imageSource:", imageSource);

  console.log("Here is randomDocs as it is in the Card.js" + Object.values(randomDocs));

  return (
    
    <>
      
      {Object.values(randomDocs).length > 0 &&
      Object.values(randomDocs).map((story) => (
        <TouchableOpacity
          key={story.id}
          onPress={() => handlePress(story)}
          >
          <View
          style={{
            backgroundColor: COLORS.white,
            borderRadius: SIZES.font,
            marginBottom: SIZES.extraLarge,
            margin: SIZES.base,
            ...SHADOWS.dark,
          }}
        >
          <View style={{ width: "100%", height: 80 }}>
            <Image
              // source={imageSource}
              source={assets.missionaries1}
              resizeMode="cover"
              style={{
                width: "100%",
                height: "100%",
                borderTopLeftRadius: SIZES.font,
                borderTopRightRadius: SIZES.font,
              }}
            />

            {/* <CircleButton
              imgUrl={assets.heart}
              right={10}
              top={10}
              handlePress={() => handlePress(story.id)}
            /> */}
          </View>

          <SubInfo date={story?.date} location={story?.location} />

          <View style={{ width: "100%", padding: SIZES.font }}>
            <Title
              title={story.solution}
              titleSize={SIZES.large}
              subTitleSize={SIZES.small}
            />

            <View
              style={{
                marginTop: SIZES.font,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text>by {story.name}</Text>
              <TaggedItems tags={story.tag} />
            </View>
          </View>
        </View>
        </TouchableOpacity>
      ))}
    </>
  );
};

export default Card;