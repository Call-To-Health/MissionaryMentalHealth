import React from "react";
import { View, Text, SafeAreaView, Image, StatusBar, VirtualizedList } from "react-native";
import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../constants";
import { CircleButton, RectButton, SubInfo, DetailsDesc, DetailsArticle, FocusedStatusBar } from "../components";

const DetailsHeader = ({ story, navigation }) => (
  <View style={{ width: "100%", height: 373 }}>
    <Image
      source={assets.missionaries1}
      resizeMode="cover"
      style={{ width: "100%", height: "100%" }}
    />

    {/* <CircleButton
      imgUrl={assets.left}
      handlePress={() => navigation.goBack()}
      left={15}
      top={StatusBar.currentHeight + 10}
    /> */}

    <CircleButton
      imgUrl={assets.heart}
      right={15}
      top={StatusBar.currentHeight + 10}
    />
  </View>
);

const getItem = (data, index) => {
  return data[index];
};

const getItemCount = (data) => {
  return data.length;};

const Details = ({ route, navigation }) => {
  const { story } = route.params;

  const renderItem = ({ item }) => {
    // return (
    //   // <DetailsArticle story={story} />
    // );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />

      <View
        style={{
          width: "100%",
          position: "absolute",
          bottom: 0,
          paddingVertical: SIZES.font,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(255,255,255,0.5)",
          zIndex: 1,
        }}
      >
        
      </View>

      <VirtualizedList
        data={story?.experience}
        renderItem={renderItem}
        keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: SIZES.extraLarge * 3,
        }}
        ListHeaderComponent={() => (
          <React.Fragment>
            <DetailsHeader story={story} navigation={navigation} />
            <SubInfo />
            <View style={{ padding: SIZES.font }}>
              <DetailsDesc story={story} />

              {story?.solution.length > 0 && (
                <Text
                  style={{
                    fontSize: SIZES.font,
                    fontFamily: FONTS.semiBold,
                    color: COLORS.primary,
                  }}
                >
                  {/* Similar Topics */}
                </Text>
              )}
            </View>
          </React.Fragment>
        )}
        getItem={getItem}
        getItemCount={getItemCount}
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews={true}
      />
    </SafeAreaView>
  );
};

export default Details;
