import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StatusBar, Text, StyleSheet, ScrollView, Pressable, TouchableOpacity, Dimensions } from 'react-native';
import { WebpageView } from "../components/WebpageView";
import { getPsychTodayData, addRecentView, auth } from '../firebase.js'
import Header from '../components/Header';
import { FocusedStatusBar } from "../components";
import { COLORS, SIZES } from '../constants';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('screen').width

const PsychologyTodayListView = () => {
    const [psychTodayData, setData] = useState([]);
    const [user, setUser] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
      const fetchData = async () => {
        const result = await getPsychTodayData();
        setData(result);
      };
  
      fetchData();
    }, []);

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

    return (
        <SafeAreaView style={{flex: 1,backgroundColor: COLORS.primary}}>
            <Header />
            <FocusedStatusBar translucent={false} backgroundColor={COLORS.primary}/>
            <View style={style.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={32} color={COLORS.white} />
                </TouchableOpacity>
                <Text style={style.headerTitle}>Psychology Today</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: COLORS.white }}>
                <View>
                    {psychTodayData.map(chapter => (
                        <View key={chapter.id}>
                        <Pressable onPress={() => 
                            {navigation.navigate('GeneralWebView', {url: chapter.link, title: chapter.title})
                            if (user)
                              addRecentView(user.uid, chapter.id, 'Psychology_Today');
                        }}> 
                            <View style={style.iconContainer}>
                                <Text>{chapter.title}</Text>
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

export default PsychologyTodayListView;