import { SafeAreaView, View, StyleSheet, StatusBar,ScrollView, Text } from 'react-native'
import Icon from 'react-native-ico-material-design'
import {FocusedStatusBar} from "../components";
import React from 'react'
import { COLORS } from '../constants';
import Header from '../components/Header';
import { withOrientation } from 'react-navigation';
  
const Library = (navigation) => {
  return (
    <SafeAreaView style={{flex:1,backgroundColor: COLORS.primary}}>
      <Header/>
      <FocusedStatusBar translucent={false} backgroundColor={COLORS.primary}/>
      
        <View style={style.header}>
          <Text>Library</Text>
          
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{backgroundColor:COLORS.primary, height:120,paddingHorizontal:20}}>
            <Text style={style.headerTitle}>Explore the</Text>
          </View>
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
  }
})
export default Library;