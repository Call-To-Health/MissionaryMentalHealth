import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import {FocusedStatusBar} from "../components";
import React, {Component, useState, useEffect} from 'react';
import CheckinHeader from '../components/CheckinHeader';
import { SafeAreaView } from 'react-navigation';
import { COLORS, SIZES, FONTS } from '../constants';
import { Calendar } from 'react-native-calendars';
// import MyCalendar from '../components/Calendar';
import { useNavigation } from "@react-navigation/native";
import { fetchMarkedCheckinResults, auth, checkTodaysEntry } from '../firebase';
import { useRoute } from '@react-navigation/native';


const Checkin = () => {
  const route = useRoute();
  const [user, setUser] = useState(null);
  const [checkinResults, setCheckinResults] = useState(null);
  const [checkinExists, setCheckinExists] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    async function checkCheckin() {
      const exists = await checkTodaysEntry();
      setCheckinExists(exists);
    }

    checkCheckin();
    // console.log("Refresh: " + route.params?.refresh);
    if (route.params) {
      route.params.refresh = false;
    }
  }, [user, route.params?.refresh]);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const results = await fetchMarkedCheckinResults();
      setCheckinResults(results);
    };

    fetchData();
  }, [user, route.params?.refresh]);


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
                  {checkinExists ? "Re-complete" : "Complete"} Today's Check-in
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
