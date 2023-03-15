import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import {FocusedStatusBar} from "../components";
import React, { useState } from 'react';
import Header from '../components/Header';
import { SafeAreaView } from 'react-navigation';
import { COLORS, SIZES, FONTS } from '../constants';
import { useNavigation } from "@react-navigation/native";

const Survey = () => {

    const navigation = useNavigation();

    // Save user's answers
    const [answers, setAnswers] = useState({
        question1: null,
        question2: null,
        question3: null,
        question4: null,
      });

    // highlight selected options
    const [selectedOption, setSelectedOption] = useState(null, null);

    // Handle user's answer selection
    const handleAnswerSelection = (question, answer) => {
    setAnswers(prevAnswers => ({
        ...prevAnswers,
        [question]: answer,
    }));
    setSelectedOption(answer);
    };

    // Question 1 is reversed coded
    const Question1 = () => {

        return (
            <View style={style.question}>
                <Text style={style.questionText}>1. How often have you felt that you were unable to control the important things in your life?</Text>
                <View style={style.optionGroup}>
                    <TouchableOpacity onPress={() => handleAnswerSelection('question1', '5')} style={style.option}>
                        <Text style={selectedOption === '5' ? {fontWeight: 'bold'} : {}}>Never</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleAnswerSelection('question1', '4')} style={style.option}>
                        <Text style={selectedOption === '4' ? {fontWeight: 'bold'} : {}}>Rarely</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleAnswerSelection('question1', '3')} style={style.option}>
                        <Text style={selectedOption === '3' ? {fontWeight: 'bold'} : {}}>Sometimes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleAnswerSelection('question1', '2')} style={style.option}>
                        <Text style={selectedOption === '2' ? {fontWeight: 'bold'} : {}}>Often</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleAnswerSelection('question1', '1')} style={style.option}>
                        <Text style={selectedOption === '1' ? {fontWeight: 'bold'} : {}}>Always</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
      
    const Question2 = () => {
        return (
            <View style={style.question}>
                <Text style={style.questionText}>2. How often have you felt confident about your ability to handle your personal problems?</Text>
                <View style={style.optionGroup}>
                    <TouchableOpacity onPress={() => handleAnswerSelection('question2', '1')} style={style.option}>
                        <Text style={selectedOption === '1' ? {fontWeight: 'bold'} : {}}>Never</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleAnswerSelection('question2', '2')} style={style.option}>
                        <Text style={selectedOption === '2' ? {fontWeight: 'bold'} : {}}>Rarely</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleAnswerSelection('question2', '3')} style={style.option}>
                        <Text style={selectedOption === '3' ? {fontWeight: 'bold'} : {}}>Sometimes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleAnswerSelection('question2', '4')} style={style.option}>
                        <Text style={selectedOption === '4' ? {fontWeight: 'bold'} : {}}>Often</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleAnswerSelection('question2', '5')} style={style.option}>
                        <Text style={selectedOption === '5' ? {fontWeight: 'bold'} : {}}>Always</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const Question3 = () => {
        return (
            <View style={style.question}>
                <Text style={style.questionText}>3. How often have you felt that things were going your way?</Text>
                <View style={style.optionGroup}>
                    <TouchableOpacity onPress={() => handleAnswerSelection('question3', '1')} style={style.option}>
                        <Text style={selectedOption === '1' ? {fontWeight: 'bold'} : {}}>Never</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleAnswerSelection('question3', '2')} style={style.option}>
                        <Text style={selectedOption === '2' ? {fontWeight: 'bold'} : {}}>Rarely</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleAnswerSelection('question3', '3')} style={style.option}>
                        <Text style={selectedOption === '3' ? {fontWeight: 'bold'} : {}}>Sometimes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleAnswerSelection('question3', '4')} style={style.option}>
                        <Text style={selectedOption === '4' ? {fontWeight: 'bold'} : {}}>Often</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleAnswerSelection('question3', '5')} style={style.option}>
                        <Text style={selectedOption === '5' ? {fontWeight: 'bold'} : {}}>Always</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    // Question 4 is reverse coded
    const Question4 = () => {
        return (
            <View style={style.question}>
                <Text style={style.questionText}>4. How often have you felt difficulties were piling up so high that you could not overcome them?</Text>
                <View style={style.optionGroup}>
                    <TouchableOpacity onPress={() => handleAnswerSelection('question4', '5')} style={style.option}>
                        <Text style={selectedOption === '5' ? {fontWeight: 'bold'} : {}}>Never</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleAnswerSelection('question4', '4')} style={style.option}>
                        <Text style={selectedOption === '4' ? {fontWeight: 'bold'} : {}}>Rarely</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleAnswerSelection('question4', '3')} style={style.option}>
                        <Text style={selectedOption === '3' ? {fontWeight: 'bold'} : {}}>Sometimes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleAnswerSelection('question4', '2')} style={style.option}>
                        <Text style={selectedOption === '2' ? {fontWeight: 'bold'} : {}}>Often</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleAnswerSelection('question4', '1')} style={style.option}>
                        <Text style={selectedOption === '1' ? {fontWeight: 'bold'} : {}}>Always</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    // Submit answers and calculate score
    const handleSubmit = () => {
        // Send answers to backend or perform any other necessary actions
        console.log(answers)

        // add scores from questions
        const totalScore = parseInt(answers.question1) + parseInt(answers.question2) + parseInt(answers.question3) + parseInt(answers.question4);

        // determine zone
        var zone = "";
        if (totalScore > 15) {
            zone = "green";
        }
        else if (totalScore > 10) {
            zone = "yellow";
        }
        else if (totalScore > 5) {
            zone = "orange";
        }
        else {
            zone = "red";
        }

        // navigate to Checkin for now (working on Results page)        
        navigation.navigate("Results", { zone: zone});
      };

    return (
        <SafeAreaView style={{flex:1,flexDirection: 'column', backgroundColor: COLORS.primary}}>
          <Header/>
          <FocusedStatusBar translucent={false} backgroundColor={COLORS.primary}/>
          <ScrollView>
            <View style={{backgroundColor:COLORS.primary, paddingHorizontal:20}}>
                <Text style={style.headerTitle}>Please answer the following questions:</Text>
            </View>

            <View style={style.form}>
                <Question1 />
                <Question2 />
                <Question3 />
                <Question4 />
                <TouchableOpacity onPress={handleSubmit} style={style.button}>
                <Text style={style.buttonText}>Submit</Text>
            </TouchableOpacity>
            </View>
          </ScrollView>
            
        </SafeAreaView>
      )

};

const style = StyleSheet.create ({
    header: {
      paddingVertical:5,
      flexDirection:'row',
      justifyContent: 'space-between',
      backgroundColor: COLORS.primary,
    },
    headerTitle: {
      color:COLORS.white,
      fontWeight:'bold',
      fontSize: 22,
    }, 
    form: {
        backgroundColor: 'white',
        flexDirection: 'column',
        flex:1,
        justifyContent: 'space-between',
        margin: 15,
        borderRadius: SIZES.small,
        padding: SIZES.small
    },
    formItem: {
        flex:1,
        
    },
    button: {
        backgroundColor: '#50C878',
        borderRadius: SIZES.small,
        padding: SIZES.small,
        marginHorizontal: 80,
    },
    buttonText: {
        textAlign: "center",
        fontSize: 20,
        fontFamily: FONTS.semiBold,
        color: COLORS.white
      },
    question: {
        marginBottom: SIZES.large
    },
    questionText: {
        fontSize: 18,
        fontWeight:'500',
        margin: 5,
        padding: 2
    },
    optionText: {
        fontSize: 16,
        fontWeight: '500'
    },
    option: {
        margin: 4,
        padding: 2,
    },
    optionGroup: {
        margin: 2
    }
  });

export default Survey;