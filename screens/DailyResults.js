import { SafeAreaView, View, StyleSheet, StatusBar,ScrollView, Text, Pressable, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react';

import { FocusedStatusBar } from "../components";
import { COLORS, SIZES } from '../constants';
import Header from '../components/Header';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from "@react-navigation/native";
import { assets, FONTS } from '../constants';
  
const DailyResults = () => {  
  const navigation = useNavigation();

  const route = useRoute();
  const { selectedDate } = route.params;

  return (
    <SafeAreaView style={{flex: 1,backgroundColor: COLORS.primary}}>
      <Header/>
      <FocusedStatusBar translucent={false} backgroundColor={COLORS.primary}/>
        <View style={style.header}></View>
        
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: COLORS.white }}>
          <View style={{backgroundColor: COLORS.primary, height: 60}}>
            <View style={{ marginLeft: 10, marginRight: 10}}>
              <Text style={style.headerTitle}>{selectedDate}</Text>
            </View>
          </View>

          <View style={style.body}>
            <Text style={style.text}>This is where check-in results for this day will go.</Text>
          </View>
          <View style={style.footer}>
            <TouchableOpacity
                style={style.button}
                onPress={() => navigation.navigate("Checkin")}>
                <Text style={style.buttonText}>Back</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
    </SafeAreaView>
  )
}
const style = StyleSheet.create ({
  header: {
    paddingVertical:10,
    flexDirection:'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    color:COLORS.white,
    fontWeight:'bold',
    fontSize: 23,
    textAlign: 'center'
  },
  body: {
    paddingHorizontal: 15,
    padding: SIZES.medium,
    justifyContent: 'space-between',
    flex: 1,
  },
  button:{
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.small,
    padding: SIZES.small
  },
  buttonText: {
    textAlign: "center",
    fontSize: FONTS.large,
    fontFamily: FONTS.semiBold,
    color: COLORS.white
  },
  footer: {
    justifyContent: "left",
    alignItems: "left",
    padding: SIZES.medium,
    paddingBottom: SIZES.large,
  },
  text: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.medium,
    color: COLORS.primary,
  }
})
export default DailyResults;