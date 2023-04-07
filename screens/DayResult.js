import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,SafeAreaView, TouchableOpacity } from 'react-native';
import { FocusedStatusBar } from '../components';
import Header from "../components/Header";
import { COLORS, SIZES, FONTS } from '../constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import { fetchCheckinResults } from '../firebase';

const DayResult = () => {

    const navigation = useNavigation();

    const route = useRoute();
    const { selectedDate } = route.params;

    const [checkinDocs, setCheckin] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
   
    useEffect(() => {
        const fetchData = async () => {
          const result = await fetchCheckinResults(selectedDate);
          setCheckin([result]);
          setIsLoading(false);
        };
        fetchData();
      }, [selectedDate]);

    if (isLoading || !checkinDocs[0]) {
        return (
            <SafeAreaView style={{flex:1,backgroundColor: COLORS.primary}}>
                <Header />
                <FocusedStatusBar translucent={false} backgroundColor={COLORS.primary} />
                <View style={style.header}></View>

                <View style={{ backgroundColor: COLORS.white }}>
                    <View style={{backgroundColor: COLORS.primary, height: 60}}>
                        <View style={{ marginLeft: 10, marginRight: 10}}>
                            <Text style={style.headerTitle}>{selectedDate}</Text>
                        </View>
                    </View>
                </View>

                <View style={{paddingHorizontal: 30, padding: SIZES.medium, flex:1}}>
                    <Text style={style.text}>You have not completed a check-in for this day.</Text>
                </View>

                <TouchableOpacity
                    style={style.button}
                    onPress={() => navigation.navigate("Checkin")}>
                    <Text style={style.buttonText}>Return to Check-in</Text>
                </TouchableOpacity>

            </SafeAreaView>
        )
    }
    else {
        // Get text values for responses
        function getTextValue (numberValue) {
            switch (numberValue) {
                case 1:
                  return "Never";
                case 2:
                  return "Rarely";
                case 3:
                  return "Sometimes";
                case 4:
                  return "Often";
                case 5:
                  return "Always";
                default:
                  return "Invalid value";
              }
        }

        // For reverse-coded questions
        function getTextValueReverse (numberValue) {
            switch (numberValue) {
                case 1:
                  return "Always";
                case 2:
                  return "Often";
                case 3:
                  return "Sometimes";
                case 4:
                  return "Rarely";
                case 5:
                  return "Never";
                default:
                  return "Invalid value";
              }
        }

        return (
            <SafeAreaView style={{flex:1,backgroundColor: COLORS.primary}}>
                <Header />
                <FocusedStatusBar translucent={false} backgroundColor={COLORS.primary} />
                <View style={style.header}></View>

                <View style={{ backgroundColor: COLORS.white }}>
                    <View style={{backgroundColor: COLORS.primary, height: 60}}>
                        <View style={{ marginLeft: 10, marginRight: 10}}>
                            <Text style={style.headerTitle}>{selectedDate}</Text>
                        </View>
                    </View>
                </View>

                <View style={style.body}>
                    <Text style={{textAlign: 'center', marginBottom: 15,}}>
                        <Text style={style.subHeadText}>You were in the </Text>
                        <Text style={style.zoneText(checkinDocs[0]["zone"])}>{checkinDocs[0]["zone"]}</Text>
                        <Text style={style.subHeadText}> zone.</Text>
                    </Text>

                    <View style={style.responses}>
                        <Text style={style.text}>Question 1: </Text>
                        <Text style={style.questionText}>How often have you felt that you were unable to control the important things in your life?</Text>
                        <Text style={style.questionText}>You answered: <Text style={style.text}>{getTextValueReverse(parseInt(checkinDocs[0]["question1"]))}</Text></Text>

                        <Text style={style.text}>Question 2: </Text>
                        <Text style={style.questionText}>How often have you felt confident about your ability to handle your personal problems?</Text>
                        <Text style={style.questionText}>You answered: <Text style={style.text}>{getTextValue(parseInt(checkinDocs[0]["question2"]))}</Text></Text>

                        <Text style={style.text}>Question 3: </Text>
                        <Text style={style.questionText}>How often have you felt that things were going your way?</Text>
                        <Text style={style.questionText}>You answered: <Text style={style.text}>{getTextValue(parseInt(checkinDocs[0]["question3"]))}</Text></Text>

                        <Text style={style.text}>Question 4: </Text>
                        <Text style={style.questionText}>How often have you felt difficulties were piling up so high that you could not overcome them?</Text>
                        <Text style={style.questionText}>You answered: <Text style={style.text}>{getTextValueReverse(parseInt(checkinDocs[0]["question4"]))}</Text></Text>
                    </View>

                </View>

                <TouchableOpacity
                    style={style.button}
                    onPress={() => navigation.navigate("Checkin")}>
                    <Text style={style.buttonText}>Return to Check-in</Text>
                </TouchableOpacity>

            </SafeAreaView>
        )
    }

};

const style = StyleSheet.create ({
    headerTitle: {
        color:COLORS.white,
        fontWeight:'bold',
        fontSize: 23,
        marginTop: 10,
        textAlign: 'center',
      },
    header: {
        paddingVertical:10,
        flexDirection:'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.primary,
    },
    body: {
        paddingHorizontal: 30,
        padding: SIZES.medium,
        justifyContent: 'center',
        flex: 1,
    },
    button:{
        backgroundColor: COLORS.white,
        borderRadius: SIZES.small,
        padding: SIZES.small,
        marginHorizontal: 100,
        marginVertical: 20
    },
    buttonText: {
        textAlign: "center",
        fontSize: FONTS.large,
        fontFamily: FONTS.semiBold,
        color: COLORS.primary
    },
    footer: {
        alignItems: "left",
        padding: SIZES.medium,
        paddingBottom: SIZES.large,
    },
    text: {
        fontFamily: FONTS.semiBold,
        fontWeight: 'bold',
        fontSize: SIZES.medium,
        color: COLORS.white,
        marginTop: 15,
    },
    subHeadText: {
        fontFamily: FONTS.semiBold,
        fontSize: 20,
        color: COLORS.white,
        textAlign: 'center'
    },
    questionText: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.medium,
        color: COLORS.white,
        marginLeft: 20,
        margin: 3,
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
    responses: {
        justifyContent: 'space-between',
        marginBottom: 20,
    }
});

export default DayResult;