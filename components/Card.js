import React, {useState,useEffect} from "react";
import { View, Image, Text } from "react-native";
import { SubInfo, TaggedItems, Title } from "./SubInfo";
import { CircleButton } from "./Button";
import { COLORS, SIZES, SHADOWS, assets } from "../constants";
import { fetchRandomDocs } from "../firebase";

const Card = () => {
  const [randomDocs, setRandomDocs] = useState([]);

  useEffect(() => {
    const getRandomDocs = async () => {
      const randomDocs = await fetchRandomDocs();
      setRandomDocs(randomDocs.map((doc) => ({ id: doc.id, ...doc.data() })));
      console.log("Here is the content of randomDocs in the Card component" + randomDocs);
    };
    getRandomDocs();
  }, []);

  const handlePress = (id) => {
    // Do something with the story id, e.g. navigate to story details screen
    console.log(`Story id ${id} clicked`);
  };

  return (
    <>
      {randomDocs.map((story) => (
        <View
          key={story.id}
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
              source={{ uri: story?.image }}
              resizeMode="cover"
              style={{
                width: "100%",
                height: "100%",
                borderTopLeftRadius: SIZES.font,
                borderTopRightRadius: SIZES.font,
              }}
            />

            <CircleButton
              imgUrl={assets.heart}
              right={10}
              top={10}
              handlePress={() => handlePress(story.id)}
            />
          </View>

          <SubInfo date={story?.date} location={story?.location} />

          <View style={{ width: "100%", padding: SIZES.font }}>
            <Title
              title={story?.solution}
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
      ))}
    </>
  );
};

export default Card;
