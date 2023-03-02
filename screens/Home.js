import React, { useState, useEffect } from "react";
import { View, SafeAreaView, FlatList } from "react-native";
import { Card, HomeHeader,FocusedStatusBar } from "../components";
import { COLORS } from "../constants";
import { firebase , db,storiesCollection} from "../firebase";
import _ from 'lodash';

const Home = () => {
  const [stories, setStories] = useState([]);

  const handleSearch = (value) => {
    if (value.length === 0) {
      setStories([]);
    }
  
    const filteredData = db.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
  
    if (filteredData.length === 0) {
      setStories([]);
    } else {
      setStories(filteredData);
    }
  };

  useEffect(() => {
    const unsubscribe = storiesCollection.onSnapshot(_.debounce((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setStories(data);
    }, 500));

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.primary, flex: 1 }}>

      <FocusedStatusBar translucent={false} backgroundColor={COLORS.primary}/>

      <View style={{ flex: 1 }}>
        <View style={{ zIndex: 0 }}>
          <FlatList
            data={stories}
            renderItem={({ item }) => <Card data={item} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<HomeHeader onSearch={handleSearch} />}
          />
        </View>

        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <View style={{ height: 160, backgroundColor: COLORS.primary }} />
          <View style={{ flex: 1, backgroundColor: COLORS.white }} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
