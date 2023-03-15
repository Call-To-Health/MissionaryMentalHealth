import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StatusBar, Text, StyleSheet, ScrollView, Pressable, TouchableOpacity } from 'react-native';
import { WebpageView } from "../components/WebpageView";
import { getTalksData } from '../firebase.js'
import Header from '../components/Header';
import { FocusedStatusBar } from "../components";
import { COLORS, SIZES } from '../constants';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';


const TalksView = () => {
    const [talksData, setData] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const navigation = useNavigation();
    
    useEffect(() => {
      const fetchData = async () => {
        const result = await getTalksData();
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
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: COLORS.white }}>
                <View style={{backgroundColor: COLORS.primary, height: 80}}>
                    <View style={{ marginLeft: 10, marginRight: 10}}>
                        <Text style={style.headerTitle}>Talks</Text>
                    </View>
                </View>
                <Text style={style.sectionTitle}>Tags</Text>
                <View style={style.categoryContainer}>
                    {talksData.map(talk => (
                        <View key={talk.id}>
                            <Pressable onPress={() => navigation.navigate('TalkWebView', {url: talk.url, title: talk.title})}> 
                                <View style={style.iconContainer}>
                                    <Text>{talk.title}</Text>
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
    categoryContainer: {
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },
    iconContainer: {
        height: 60,
        backgroundColor: COLORS.lightgray,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        elevation: 12,
        margin: 13,
      },
      sectionTitle: {
        marginHorizontal: 20,
        marginVertical: 20,
        fontWeight: "bold",
        fontSize: 20,
      },
  })

export default TalksView;