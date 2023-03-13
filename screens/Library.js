import { SafeAreaView, View, StyleSheet, StatusBar,ScrollView, Text, Pressable } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import { FocusedStatusBar } from "../components";
import React from 'react'
import { COLORS, SIZES } from '../constants';
import Header from '../components/Header';
import { withOrientation } from 'react-navigation';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";
  
const Library = () => {
  const navigation = useNavigation();
  const categoryIcons = [
    {icon: <MaterialCommunityIcons name="bookshelf" size={30} color={COLORS.primary} />, label: "Talks", navLocation: "AdjustingToMission"},
    {icon: <Feather name="book-open" size={30} color={COLORS.primary} />, label: "User Stories",  navLocation: "AdjustingToMission"},
    {icon: <Foundation name="torso-business" size={30} color="black" />, label: "Adjusting to Missionary Life",  navLocation: "AdjustingToMission"},
  ];
  const ListCategories = () => {
    return (
      <View style={style.categoryContainer}>
        {categoryIcons.map(({icon, label}, index) => (
          <View style={{alignItems: "center"}} key={index}>
            <Pressable onPress={() => navigation.navigate("AdjustingToMission")}>
            <View key={index} style={style.iconContainer}>
              {icon}
            </View>
            <Text style={style.labelContainer}>{label}</Text>
            </Pressable>
          </View>
        ))}
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1,backgroundColor: COLORS.primary}}>
      <Header/>
      <FocusedStatusBar translucent={false} backgroundColor={COLORS.primary}/>
        <View style={style.header}>
        </View>
        
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: COLORS.white }}>
          <View style={{backgroundColor: COLORS.primary, height: 115}}>
            <View style={{ marginLeft: 10, marginRight: 10}}>
              <Text style={style.headerTitle}>Explore the Library</Text>
              <View style={style.inputContainer}>
                <AntDesign name="search1" size={20} color="black" style={{ marginRight: SIZES.base }} />
                <TextInput placeholder='Search the library' style={{color: COLORS.black, flex: 1}} />
              </View>
            </View>
          </View>
          
          <ListCategories />
          <Text style={style.sectionTitle}>Adjusting to Missionary Life</Text>
          <View></View>
        </ScrollView>
    </SafeAreaView>
  )
}
const style = StyleSheet.create ({
  header: {
    paddingVertical:20,
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
})
export default Library;