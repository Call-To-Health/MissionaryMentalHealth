import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Image, Text} from "react-native";
import { COLORS, SIZES, SHADOWS, assets } from "../constants";
import { SubInfo, TaggedItems, Title } from "./SubInfo";
import { RectButton, CircleButton } from "./Button";
import { db, storiesCollection } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Card = () => {
  const navigation = useNavigation();
  const [storyData, setStoryData] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      const querySnapshot = await getDocs(collection(db, "stories"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStoryData(data);
    };
    fetchStories();
  }, []);

  return (
    <>
      {storyData.map((story) => (
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
          <View
            style={{
              width: "100%",
              height: 80,
            }}
          >
            <Image
              source={story.image}
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
              handlePress={() =>
                navigation.navigate("Details", { storiesId: story.id })
              }
            />
          </View>

          <SubInfo date={story.date} location={story.location} />

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
      ))}
    </>
  );
};

export default Card;
