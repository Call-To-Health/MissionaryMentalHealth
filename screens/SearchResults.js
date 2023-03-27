import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { FocusedStatusBar,SearchResultCard } from '../components';
// import LibrarySearch from '../components/LibrarySearch';
import SearchResultsHeader from '../components/SearchResultsHeader';
import { COLORS, SIZES } from '../constants';

const SearchResults = ({ route }) => {
  const { filteredData, combinedData } = route.params;

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.primary, flex: 1 }}>
      <SearchResultsHeader/>
      <FocusedStatusBar translucent={false} backgroundColor={COLORS.primary} />
      <View style={{ flex: 1 }}>
        <View style={{ zIndex: 0 }}>
        <FlatList
            data={filteredData.length > 0 ? filteredData : combinedData}
            renderItem={({ item:doc }) => <SearchResultCard doc={doc} />}
            keyExtractor={(doc) => doc.id}
            showsVerticalScrollIndicator={true}
            // ListHeaderComponent={<LibrarySearch onSearch={handleSearch} />}
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
          <View style={{ flex: 1, backgroundColor: COLORS.white }} />
        </View>
      </View>
        
    </SafeAreaView>
  );
};


const style = StyleSheet.create ({
  header: {
    paddingVertical: 20,
    flexDirection:'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    color: COLORS.white,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems:'center',
    fontWeight:'bold',
    fontSize: 23,
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15 ,
    marginHorizontal:20,
  },
  instructionalText: {
    fontSize: SIZES.large,
    paddingBottom: 12,
    paddingTop: 5,
    fontWeight: "bold"
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginHorizontal: 10,
    alignItems: 'center',
    width: '60%'
  },
  redButton: {
    backgroundColor: COLORS.red,
  },
  whiteButton: {
    backgroundColor: COLORS.white,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  cardContainer: {
    backgroundColor: COLORS.white,
    // paddingVertical: 10,
    paddingHorizontal:10,
    borderRadius: 20,
  },
  cardContainerWrapper: {
    marginHorizontal: 18,
  },
  card: {
    backgroundColor: COLORS.lightgray,
    elevation:10,
    width: 130,
    height: 80,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quoteCard: {
    backgroundColor: COLORS.lightgray,
    elevation:10,
    width: 318,
    height: 80,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },})
  
  export default SearchResults;