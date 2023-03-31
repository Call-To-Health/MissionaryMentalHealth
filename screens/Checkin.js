import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import {FocusedStatusBar} from "../components";
import React, {Component, useState, useEffect} from 'react';
import CheckinHeader from '../components/CheckinHeader';
import { SafeAreaView } from 'react-navigation';
import { COLORS, SIZES, FONTS } from '../constants';
import { Calendar } from 'react-native-calendars';
// import MyCalendar from '../components/Calendar';
import { useNavigation } from "@react-navigation/native";
import { fetchMarkedCheckinResults, auth } from '../firebase';

const Checkin = () => {
  const markedDates = {
    '2023-04-01': { selected: true, selectedColor: 'green' },
  };
  const [checkinResults, setCheckinResults] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const results = await fetchMarkedCheckinResults();
      setCheckinResults(results);
    };

    fetchData();
  }, [auth.currentUser]);

  return (
    <SafeAreaView style={{flex:1,backgroundColor: COLORS.primary}}>
      <CheckinHeader/>
      <FocusedStatusBar translucent={false} backgroundColor={COLORS.primary}/>
        
        <View style={{backgroundColor:COLORS.primary, height:40, paddingHorizontal:20}}>

        </View>

        <View style={{justifyContent: 'center'}}>
          <View>
            <TouchableOpacity style={style.surveyButton} onPress={() => navigation.navigate("Survey")}>
                <Text style={style.buttonText}>
                  Complete Today's Check-in
                </Text>
            </TouchableOpacity>
          </View>

          <View>
            <Calendar 
                style={style.calendar}
                markedDates={checkinResults}
                onDayPress= {(day) => {
                    navigation.navigate("DayResult", { selectedDate: day.dateString})
                }}
              />
          </View>
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
  },
  surveyButton: {
    backgroundColor: '#e32f45',
    padding: SIZES.small,
    borderRadius: SIZES.medium,
    width: '60%',
    alignSelf: 'center',
    marginBottom: 35,
  },
  buttonText:{
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.medium,
    color: COLORS.white,
    textAlign: "center",
  },
  calendar: {
    marginHorizontal:20,
    borderRadius: 5,
  }
});

export default Checkin;
