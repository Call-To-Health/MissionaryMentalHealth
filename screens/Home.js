import React, { useState, useEffect } from "react";
import { View, SafeAreaView, FlatList } from "react-native";
import { Card, HomeHeader,FocusedStatusBar } from "../components";
import Header from "../components/Header";
import { COLORS } from "../constants";
import {fetchRandomDocs} from "../firebase";

const Home = () => {
  const [randomDocs, setRandomDocs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (value) => {
    setSearchQuery(value);
    if (value.length === 0) {
      setFilteredData(randomDocs);
    } else {
      const filteredData = randomDocs.filter((doc) => {
        const docValues = Object.values(doc);
        return docValues.some((fieldValue) =>
          String(fieldValue).toLowerCase().includes(value.toLowerCase())
        );
      });
      setFilteredData(filteredData);
      console.log("here is the filtered Data: " + JSON.stringify(filteredData));
    }
  };
  
  
  useEffect(() => {
    const getRandomDocs = async () => {
      const randomDocs = await fetchRandomDocs();
      setRandomDocs(randomDocs.map((doc) => ({ id: doc.id, ...doc.data() })));
      console.log("Here is the content of randomDocs in the Home component" + randomDocs);
    };
    getRandomDocs();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.primary, flex: 1 }}>
      <Header/>
      <FocusedStatusBar translucent={false} backgroundColor={COLORS.primary}/>
      <View style={{ flex: 1 }}>
        <View style={{ zIndex: 0 }}>
        <FlatList
            data={searchQuery.length === 0 ? randomDocs : filteredData}
            renderItem={({item:doc}) => <Card doc={doc}/>}
            keyExtractor={(doc) => doc.id}
            showsVerticalScrollIndicator={true}
            ListHeaderComponent={<HomeHeader onSearch={handleSearch} />}
          />
        </View>
        <View
          style={{position: "absolute", top: 0,bottom: 0,right: 0,left: 0,zIndex: -1,}}> 
          <View style={{ height: 160, backgroundColor: COLORS.primary }} />
          <View style={{ flex: 1, backgroundColor: COLORS.white }} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

