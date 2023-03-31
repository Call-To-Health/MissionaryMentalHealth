import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StoryCard, FocusedStatusBar } from "../components";
import StoryHeader from "../components/StoryHeader";
import { COLORS } from "../constants";
import { fetchRandomDocs } from "../firebase";

const StoriesView = () => {
  const [randomDocs, setRandomDocs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStoryData, setFilteredData] = useState([]);

  const handleSearch = (value) => {
    setSearchQuery(value);
    if (value.length === 0) {
      setFilteredData(randomDocs);
    } else {
      const filteredStoryData = randomDocs.filter((doc) => {
        const docValues = Object.values(doc);
        return docValues.some((fieldValue) =>
          String(fieldValue).toLowerCase().includes(value.toLowerCase())
        );
      });
      setFilteredData(filteredStoryData);
      console.log("here is the filtered Data: " + JSON.stringify(filteredStoryData));
    }
  };

  useEffect(() => {
    const getRandomDocs = async () => {
      const randomDocs = await fetchRandomDocs();
      setRandomDocs(randomDocs.map((doc) => ({ id: doc.id, ...doc.data() })));
      console.log("Here is the content of randomDocs in the StoriesView screen" + randomDocs);
    };
    getRandomDocs();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <FocusedStatusBar translucent={false} backgroundColor={COLORS.primary} />
      <FlatList
        data={searchQuery.length === 0 ? randomDocs : filteredStoryData}
        renderItem={({ item: doc }) => <StoryCard doc={doc} />}
        keyExtractor={(doc) => doc.id}
        showsVerticalScrollIndicator={true}
        ListHeaderComponent={<StoryHeader onSearch={handleSearch} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 0.7,
    backgroundColor: COLORS.red,
  },
});

export default StoriesView;
