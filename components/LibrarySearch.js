import React, {useState, useEffect} from "react";
import { View, Text, Image, TextInput,StyleSheet,TouchableOpacity, Pressable, Alert } from "react-native";
import { COLORS, FONTS, SIZES, assets } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { getAdjustingToMissionaryLifeData } from '../firebase';
import { getTalksData } from '../firebase';
import SearchResults from "../screens/SearchResults";

const LibrarySearch = ({ onSearch }) => {

  const [searchQuery, setSearchQuery] = useState("");
  const [combinedData, setCombinedData] = useState([]);
  const [filteredLibraryData, setFilteredLibraryData] = useState([]);
  const navigation = useNavigation();

  const handleSearch = (value) => {
    
      const filteredLibraryData = combinedData.filter((doc) => {
        const docValues = Object.values(doc);
        return docValues.some((fieldValue) =>
          String(fieldValue).toLowerCase().includes(value.toLowerCase())
        );
      });
      setFilteredLibraryData(filteredLibraryData);
    
    const filteredDataLength = filteredLibraryData.length;
    if (filteredDataLength === 0) {
      Alert.alert(
        "No Results Found",
        "Please try a different search term."
      );
    } else {
      navigation.navigate("SearchResults", {
        searchQuery: value,
        combinedData,
      });
    }
  };
  
  

  useEffect(() => {
    const fetchData = async () => {
      const talksData = await getTalksData();
      const adjustingToMissionaryLifeData = await getAdjustingToMissionaryLifeData();
      setCombinedData([...talksData, ...adjustingToMissionaryLifeData]);
    };
  
    fetchData();
  }, []);

  return (
    <View
      style={{backgroundColor: COLORS.primary, padding: SIZES.font,}}>
      
      {/* <View style={{ marginVertical: SIZES.font }}>
      
        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: SIZES.large,
            color: COLORS.white,
            marginTop: SIZES.base / 100,
          }}
        >
          Search the Library
        </Text>
      </View> */}

      <View style={{ marginTop: SIZES.font }}>
        <View
          style={{
            width: "100%",
            borderRadius: SIZES.font,
            backgroundColor: COLORS.gray,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: SIZES.font,
            paddingVertical: SIZES.small - 6,
          }}
        >
          <Image
            source={assets.search}
            resizeMode="contain"
            style={{ width: 20, height: 20, marginRight: SIZES.base}}
          />
          <TextInput
            placeholder="Search the library here..."
            style={{ flex: 1}}
            onChangeText={(text) => setSearchQuery(text)}
            value = {searchQuery} 
          >
          </TextInput>
          <TouchableOpacity onPress={() => handleSearch(searchQuery)} style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchButton: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: COLORS.red,
    borderRadius: 12,
    elevation:20,
    alignItems: 'center',
  },
  searchButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
});


export default LibrarySearch;
