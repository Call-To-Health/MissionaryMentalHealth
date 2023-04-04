import React, { useState, useEffect} from "react";
import { View, SafeAreaView, FlatList } from "react-native";
import { JournalCard,JournalSearch,FocusedStatusBar } from "../components";
import JournalListHeader from '../components/JournalListHeader';
import { COLORS } from "../constants";
import {fetchJournals} from "../firebase";
import { useRoute } from '@react-navigation/native';


const JournalList= () => {
  const route = useRoute();
  const [journalDocs, setJournals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredJournalData, setFilteredJournalData] = useState([]);

  const handleSearch = (value) => {
    setSearchQuery(value);
    if (value.length === 0) {
      setFilteredJournalData(journalDocs);
    } else {
      const filteredJournalData = journalDocs.filter((doc) => {
        const docValues = Object.values(doc);
        return docValues.some((fieldValue) =>
          String(fieldValue).toLowerCase().includes(value.toLowerCase())
        );
      });
      setFilteredJournalData(filteredJournalData);
      console.log("here is the filtered Data: " + JSON.stringify(filteredJournalData));
    }
  };
  
  useEffect(() => {
    const getJournals = async () => {
      const journalDocs = await fetchJournals();
      setJournals(journalDocs.map((doc) => ({ id: doc.id, ...doc })));
    };
    getJournals();

    if (route.params) {
      route.params.refresh = false;
    }
  }, [route.params?.refresh]);

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.primary, flex: 1 }}>
      <JournalListHeader/>
      <FocusedStatusBar translucent={false} backgroundColor={COLORS.primary} />
      <View style={{ flex: 1 }}>
        <View style={{ zIndex: 0 }}>
        <FlatList
            data={searchQuery.length === 0 ? journalDocs : filteredJournalData}
            renderItem={({ item:doc }) => <JournalCard doc={doc} />}
            keyExtractor={(doc) => doc.id}
            showsVerticalScrollIndicator={true}
            ListHeaderComponent={<JournalSearch onSearch={handleSearch} />}
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
          <View style={{ height: 0, backgroundColor: COLORS.primary }} />
          <View style={{ flex: 1, backgroundColor: COLORS.white }} />
        </View>
      </View>
        
    </SafeAreaView>
  );
};

export default JournalList;

