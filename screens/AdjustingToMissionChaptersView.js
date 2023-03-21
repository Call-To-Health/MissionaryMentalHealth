import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StatusBar, Text, StyleSheet, ScrollView, Pressable, TouchableOpacity, Dimensions } from 'react-native';
import { WebpageView } from "../components/WebpageView";
import { getAdjustingToMissionaryLifeData } from '../firebase.js'
import Header from '../components/Header';
import { FocusedStatusBar } from "../components";
import { COLORS, SIZES } from '../constants';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('screen').width

const AdjustingToMissionChaptersView = () => {
    const [adjustToMLData, setData] = useState([]);
    const navigation = useNavigation();
    useEffect(() => {
      const fetchData = async () => {
        const result = await getAdjustingToMissionaryLifeData();
        setData(result);
      };
  
      fetchData();
    }, []);
    return (
        <SafeAreaView style={{flex: 1,backgroundColor: COLORS.primary}}>
            <Header />
            <FocusedStatusBar translucent={false} backgroundColor={COLORS.primary}/>
            <View style={style.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={32} color={COLORS.white} />
                </TouchableOpacity>
                <Text style={style.headerTitle}>Adjusting To Missionary Life</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: COLORS.white }}>
                <View>
                    {adjustToMLData.map(chapter => (
                        <View key={chapter.chapter}>
                        <Pressable onPress={() => navigation.navigate('AdjustingToMission', {url: chapter.url, title: chapter.title})}> 
                            <View style={style.iconContainer}>
                                <Text>{chapter.chapter}. {chapter.title}</Text>
                            </View>
                        </Pressable>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
        
    )
};

const style = StyleSheet.create ({
    header: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
    },
    headerTitle: {
        color: COLORS.white,
        fontSize: 23,
        marginLeft: 10,
    },
    categoryContainer: {
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },
    iconContainer: {
        height: 70,
        backgroundColor: COLORS.lightgray,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        elevation: 12,
        margin: 13,
        padding: 15,
        marginHorizontal: 40,
      },
      sectionTitle: {
        marginHorizontal: 20,
        marginVertical: 20,
        fontWeight: "bold",
        fontSize: 20,
      },
  })

export default AdjustingToMissionChaptersView;