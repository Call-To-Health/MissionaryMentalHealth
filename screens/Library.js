import { SafeAreaView, View, StyleSheet, StatusBar,ScrollView, Text, Pressable, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Stories from './Stories';
import JournalList from './JournalList';
import { FocusedStatusBar } from "../components";
import { COLORS, SIZES } from '../constants';
import LibraryHeader from '../components/LibraryHeader';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";
import { assets } from '../constants';

const {width} = Dimensions.get('screen');
  
const Library = () => {  
  const navigation = useNavigation();
  const categoryIcons = [
    {icon: <MaterialCommunityIcons name="bookshelf" size={30} color={COLORS.primary} />, label: "Talks", navLocation: "TalksView"},
    {icon: <Feather name="book-open" size={30} color={COLORS.primary} />, label: "Missionary Stories",  navLocation: "Stories"},
    {icon: <FontAwesome5 name="pencil-alt" size={24} color={COLORS.primary} />, label: "My Journal Entries",  navLocation: "JournalList"},
  ];
  const ListCategories = () => {
    return (
      <View style={style.categoryContainer}>
        {categoryIcons.map(({icon, label, navLocation}, index) => (
          <View style={{alignItems: "center"}} key={index}>
            <Pressable onPress={() => navigation.navigate(navLocation)}>
              <View>
                <View key={index} style={style.iconContainer}>
                  {icon}
                </View>
              </View>
            </Pressable>
            <Text style={style.labelContainer}>{label}</Text>
          </View>
        ))}
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1,backgroundColor: COLORS.primary}}>
      <LibraryHeader/>
      <FocusedStatusBar translucent={false} backgroundColor={COLORS.primary}/>
        <View style={style.header}>
        </View>
        
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: COLORS.white }}>
          <View style={{backgroundColor: COLORS.primary, height: 0}}>
            <View style={{ marginLeft: 10, marginRight: 10}}>
              {/* <Text style={style.headerTitle}>Welcome to the Library</Text>
              <View style={style.inputContainer}>
                <AntDesign name="search1" size={20} color="black" style={{ marginRight: SIZES.base }} />
                <TextInput placeholder='Search the library' style={{color: COLORS.black, flex: 1}} />
              </View> */}
            </View>
          </View>
          
          <ListCategories />
          <Text style={style.sectionTitle}>Booklets</Text>
          <View style={{ paddingLeft: 20}}>
            <View style={style.cardContainer}>
              <TouchableOpacity onPress={() => navigation.navigate("AdjustingToMissionChaptersView")}>
              <Image
                source={assets.adjustToML}
                style={style.cardImage}
              />
              
              <Text style={style.cardLabel}>Adjusting to Missionary Life</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
    </SafeAreaView>
  )
}
const style = StyleSheet.create ({
  header: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection:'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    color:COLORS.white,
    fontWeight:'bold',
    fontSize: 23,
  },
  inputContainer: {
    height: 50,
    width: '100%',
    backgroundColor: COLORS.lightgray,
    borderRadius: 15,
    position: 'absolute',
    top: 90,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 12
  },
  categoryContainer: {
    marginTop: 60,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  iconContainer: {
    height: 60,
    width: 60,
    backgroundColor: COLORS.lightgray,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    elevation: 12,
  },
  labelContainer: {
    width: 100,
    color: COLORS.black,
    alignItems: "center",
    textAlign: "center",
    fontSize: 13,
    paddingTop: 10
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginVertical: 20,
    fontWeight: "bold",
    fontSize: 20,
  },
  cardContainer: {
    width: width / 2
  },
  cardImage: {
    height: 220,
    width: width / 2.3,
    marginRight: 20,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 10
  },
  cardLabel: {
    padding: 10,
  }
})
export default Library;