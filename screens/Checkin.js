import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import {FocusedStatusBar} from "../components";
import React from 'react';
import Header from '../components/Header';
import { SafeAreaView } from 'react-navigation';
import { COLORS, SIZES, FONTS } from '../constants';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from "@react-navigation/native";

const Checkin = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex:1,backgroundColor: COLORS.primary}}>
      <Header/>
      <FocusedStatusBar translucent={false} backgroundColor={COLORS.primary}/>
        
        <View style={{backgroundColor:COLORS.primary, height:120, paddingHorizontal:20}}>
        <Text style={style.headerTitle}>Daily Check-in</Text>
        </View>

        <View>
        <TouchableOpacity
            style={{
                backgroundColor: COLORS.white,
                padding: SIZES.small,
                borderRadius: SIZES.medium,
                width: '60%',
                alignSelf: 'center',
                marginBottom: 35
            }}
            onPress={() => navigation.navigate("Survey")}
        >
            <Text
                style={{
                fontFamily: FONTS.semiBold,
                fontSize: SIZES.font,
                color: COLORS.primary,
                textAlign: "center",
                }}
            >
            Complete Today's Check-in
            </Text>
        </TouchableOpacity>
        </View>

        <View>
        <Calendar 
            style={{
                marginHorizontal:20,
                borderRadius: 5,
            }}
            onDayPress= {(day) => {
                navigation.navigate("Modal", { selectedDate: day.dateString})
            }}
            />
        </View>
        
    </SafeAreaView>
  )
};

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
});

export default Checkin;