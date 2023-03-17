import React, { useState } from "react";
import { View, Text } from "react-native";
import { Title, TaggedItems } from "./SubInfo";
import { COLORS, SIZES, FONTS } from "../constants";

const DetailsDesc = ({ story }) => {
  const [solutionText, setSolutionText] = useState(story?.solution.slice(0, 500));
  const [solutionReadMore, setSolutionReadMore] = useState(false);

  const [experienceText, setExperienceText] = useState(story?.experience.slice(0, 500));
  const [experienceReadMore, setExperienceReadMore] = useState(false);

  return (
    <>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title
          title={story?.name}
          subTitle={story?.name}
          titleSize={SIZES.extraLarge}
          subTitleSize={SIZES.font}
        />

        <TaggedItems tags={story?.tag} />
      </View>
      <View style={{ marginVertical: SIZES.extraLarge * 1.5 }}>
        <Text
          style={{
            fontSize: SIZES.large ,
            fontFamily: FONTS.semiBold,
            color: COLORS.primary,
          }}
        >
          {story.name}'s Expierence with {story.tag}
        </Text>
        <View
          style={{
            marginTop: SIZES.base,
          }}
        >
          <Text
            style={{
              color: COLORS.secondary,
              fontSize: SIZES.medium,
              fontFamily: FONTS.regular,
              lineHeight: SIZES.large,
            }}
          >
            {experienceText}
            {/* {!experienceReadMore && "..."} */}
            
            <Text
              style={{
                color: COLORS.primary,
                fontSize: SIZES.small,
                fontFamily: FONTS.semiBold,
              }}
              onPress={() => {
                if (!experienceReadMore) {
                  setExperienceText(story?.experience);
                  setExperienceReadMore(true);
                } else {
                  setExperienceText(story?.experience.slice(0, 500));
                  setExperienceReadMore(false);
                }
              }}
            >
              {/* {experienceReadMore ? " Show Less" : " Read More"} */}
            </Text>
          </Text>
        </View>
      </View>

      <View style={{ marginVertical: SIZES.extraLarge * 1.5 }}>
        <Text
          style={{
            fontSize: SIZES.large,
            fontFamily: FONTS.semiBold,
            color: COLORS.primary,
          }}
        >

{story.name}'s Solution
        </Text>
        <View
          style={{
            marginTop: SIZES.base,
          }}
        >
          <Text
            style={{
              color: COLORS.secondary,
              fontSize: SIZES.medium,
              fontFamily: FONTS.regular,
              lineHeight: SIZES.large,
            }}
          >
            {solutionText}
            {/* {!solutionReadMore && "..."} */}
            
            <Text
              style={{
                color: COLORS.primary,
                fontSize: SIZES.small,
                fontFamily: FONTS.semiBold,
              }}
              onPress={() => {
                if (!solutionReadMore) {
                  setSolutionText(story?.solution);
                  setSolutionReadMore(true);
                } else {
                  setSolutionText(story?.solution.slice(0, 100));
                  setSolutionReadMore(false);
                }
              }}
            >
              {/* {solutionReadMore ? " Show Less" : " Read More"} */}
            </Text>
          </Text>
        </View>
      </View>
    </>
  );
};

export default DetailsDesc;