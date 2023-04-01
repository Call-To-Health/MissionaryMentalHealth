import { View, Text, StyleSheet, TouchableOpacity, Image, useColorScheme } from 'react-native';
import {FocusedStatusBar} from "../components";
import React from 'react';
import Header from '../components/Header';
import { SafeAreaView } from 'react-navigation';
import { COLORS, SIZES, FONTS, assets } from '../constants';
import { useNavigation } from "@react-navigation/native";
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Results = ({ route }) => {
  const navigation = useNavigation();

  const { zone } = route.params;
  // console.log(zone)

  // Signs are conditional based on zone
  const Signs = () => {
    if (zone === 'green') {
      return (
        <View style={style.bodyTextGroup}>
          <Text style={style.bodyText}>- Confident and happy</Text>
          <Text style={style.bodyText}>- Ready to meet challenges</Text>
          <Text style={style.bodyText}>- Recover quickly from setbacks</Text>
          <Text style={style.bodyText}>- Getting along with your companion</Text>
          <Text style={style.bodyText}>- Feel the Spirit</Text>
        </View>
      );
    }
    else if (zone === 'yellow') {
      return (
        <View style={style.bodyTextGroup}>
          <Text style={style.bodyText}>- Tense, worried, insecure, anxious</Text>
          <Text style={style.bodyText}>- Trouble getting along with others</Text>
          <Text style={style.bodyText}>- Difficulty feeling the Spirit</Text>
        </View>
      );
    }
    else if (zone === 'orange') {
      return (
        <View style={style.bodyTextGroup}>
          <Text style={style.bodyText}>- Physically and emotionally exhausted</Text>
          <Text style={style.bodyText}>- May feel ill, such as an upset stomach</Text>
          <Text style={style.bodyText}>- Easily angered</Text>
          <Text style={style.bodyText}>- Deeply discouraged</Text>
          <Text style={style.bodyText}>- Inability to feel the Spirit</Text>
        </View>
      );
    }
    else if (zone === 'red') {
      return (
        <View style={style.bodyTextGroup}>
          <Text style={style.bodyText}>- Persistent panic, depression, or anxiety</Text>
          <Text style={style.bodyText}>- Hopelessness</Text>
          <Text style={style.bodyText}>- Trouble eating or sleeping, which can lead to illness</Text>
          <Text style={style.bodyText}>- Overwhelmed; inability to continue</Text>
          <Text style={style.bodyText}>- Feel as though you have been abandoned by God</Text>
        </View>
      );
    }
  };

  // Signs are conditional based on zone
  const WhatToDo = () => {
    if (zone === 'green') {
      return (
        <View style={style.bodyTextGroup}>
          <Text style={style.bodyText}>This is the ideal. Here you are handling the everyday stress of missionary work, learning, and progressing.</Text>
          <Text style={style.bodyText}>Continue to work hard and trust in the Lord.</Text>
        </View>
      );
    }
    else if (zone === 'yellow') {
      return (
        <View style={style.bodyTextGroup}>
          <Text style={style.bodyText}>It is normal to spend some time at the yellow level.</Text>
          <Text style={style.bodyText}>Being kind to yourself as you cope with challenges and learn new skills will help you become stronger and increase your ability to serve. Continue to pray and serve in faith. Look to the scriptures and conference talks, your district and zone leaders, and this booklet for help.</Text>
        </View>
      );
    }
    else if (zone === 'orange') {
      return (
        <View style={style.bodyTextGroup}>
          <Text style={style.bodyText}>No one enjoys being at an orange level of stress, but this is rarely permanent.</Text>
          <Text style={style.bodyText}>Pray for guidance as you study scriptures and apply the suggestions in this booklet. Let your mission president know if you stay at the orange level for more than three days, so he can help.</Text>
        </View>
      );
    }
    else if (zone === 'red') {
      return (
        <View style={style.bodyTextGroup}>
          <Text style={style.bodyText}>If you are at this level, contact your mission president for help.</Text>
          <Text style={style.bodyText}>Ask your companion or district leader for a priesthood blessing. Consider taking some time to write in your journal, ponder the suggestions in this book, pray, and perhaps take a break from the things you find most difficult about missionary work until you have a chance to speak with your mission president.</Text>
        </View>
      );
    }
  };



  return (
    <SafeAreaView style={{flex:1,backgroundColor: COLORS.primary}}>
      <Header/>
      <FocusedStatusBar translucent={false} backgroundColor={COLORS.primary}/>
        
        <View style={{backgroundColor:COLORS.primary, height:120, paddingHorizontal:20}}>
        <Text style={style.headerTitle}>Results</Text>
        </View>

        <View style={style.container}>
            <View style={style.body}>
              <Text style={{marginTop: -50, margin: 20, textAlign:'center'}}>
                <Text style={style.titleText}>You are in the </Text>
                <Text style={style.zoneText(zone)}>{zone}</Text>
                <Text style={style.titleText}> zone</Text>
              </Text>
              <Text style={style.detailText}>Signs you are at this level:</Text>
              <Signs style={style.section}/>
              <Text style={style.detailText}>What to do:</Text>
              <WhatToDo style={style.section}/>
            </View>

            <TouchableOpacity style={style.button} onPress={() => navigation.navigate("Checkin", {refresh: true})}>
                <Text style={style.buttonText}>See Previous Results</Text>
            </TouchableOpacity>
        </View>
        
    </SafeAreaView>
  )
};

const style = StyleSheet.create ({
  header: {
    paddingVertical: 20,
    flexDirection:'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    color:COLORS.white,
    fontWeight:'bold',
    fontSize: 23,
    marginTop: 10,
  },
  button: {
    backgroundColor: COLORS.white,
    padding: SIZES.small,
    borderRadius: SIZES.medium,
    width: '60%',
    alignSelf: 'center',
    marginVertical: 20
  },
  buttonText: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.medium,
    color: COLORS.primary,
    textAlign: "center",
  },
  titleText: {
    color:COLORS.white,
    fontWeight:'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  detailText: {
    color: COLORS.white,
    fontSize: 18,
    fontFamily: FONTS.semiBold,
    textAlign: 'left',
    marginHorizontal: 10,
    marginTop: 15
  },
  zoneText: (zone) => {
    const zoneColor = zone === 'red' ? 'red' : zone === 'yellow' ? 'yellow' : zone === 'orange' ? 'orange' : zone === 'green' ? '#50C878' : COLORS.white;
    return {
      color: zoneColor,
      fontWeight:'bold',
      fontSize: 20,
      textAlign: 'center',
    }
  },
  section: {
    margin: 10,
  },
  bodyText: {
    color: COLORS.white,
    fontSize: 18,
    textAlign: 'left',
    marginLeft: 10
  },
  bodyTextGroup: {
    margin: 10,
  },
  container: {
    paddingHorizontal: 15,
    padding: SIZES.medium,
    justifyContent: 'space-between',
    flex: 1,
  },
  body: {
    flex:1,
  },
  imgView: {
    flex: 1,
    borderRadius: 20,
    marginVertical: 20,
  }
});

export default Results;