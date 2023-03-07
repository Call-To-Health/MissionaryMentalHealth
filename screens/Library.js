import { SafeAreaView, View, StyleSheet, StatusBar,ScrollView, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import {FocusedStatusBar} from "../components";
import React from 'react'
import { COLORS } from '../constants';
import Header from '../components/Header';
import { withOrientation } from 'react-navigation';
import { TextInput } from 'react-native-gesture-handler';
  
const Library = (navigation) => {
  const categoryIcons = [
    {icon: <MaterialCommunityIcons name="bookshelf" size={30} color="white" />, label: "Talks"},
    {icon: <Feather name="book-open" size={30} color="white" />, label: "User Stories"},
    {icon: <Foundation name="torso-business" size={30} color="white" />, label: "Adjusting to ML"},
  ];
  const ListCategories = () => {
    return (
      <View style={style.categoryContainer}>
        {categoryIcons.map(({icon, label}, index) => (
          <View key={index} style={style.iconContainer}>
            {icon}
          </View>
        ))}
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex:1,backgroundColor: COLORS.primary}}>
      <Header/>
      <FocusedStatusBar translucent={false} backgroundColor={COLORS.primary}/>
        <View style={style.header}>
          <Text></Text>
        </View>
        
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{backgroundColor: COLORS.primary, height: 120, margin: 15}}>
            <Text style={style.headerTitle}>Explore the Library</Text>
            <View style={style.inputContainer}>
              <AntDesign name="search1" size={24} color="white" />
              <TextInput placeholder='Search the library' style={{color: COLORS.black, paddingLeft: 10}} />
            </View>
          </View>
          
          <ListCategories />
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
    height: 60,
    width: '100%',
    backgroundColor: COLORS.gray,
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
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  }
})
export default Library;