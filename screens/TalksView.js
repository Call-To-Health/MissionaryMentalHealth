import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StatusBar, Text, StyleSheet, ScrollView, Pressable, TouchableOpacity, Dimensions } from 'react-native';
import { WebpageView } from "../components/WebpageView";
import { getTalksData } from '../firebase.js'
import { FocusedStatusBar } from "../components";
import Header from "../components/Header";
import TagButton from "../components/TagButton";
import { COLORS, SIZES } from '../constants';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';


const screenWidth = Dimensions.get('screen').width


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

    const handleTagPress = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((t) => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    // Extract all tags from talksData
    const allTags = talksData.reduce((acc, talk) => {
        const tags = talk.tags.split(', ');
        return [...acc, ...tags];
    }, []);
    // Remove duplicates
    const uniqueTags = [...new Set(allTags)];

    
    return (
        <SafeAreaView style={{flex: 1,backgroundColor: COLORS.primary}}>
            <Header />
            <FocusedStatusBar translucent={false} backgroundColor={COLORS.primary}/>
            <View style={style.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={32} color={COLORS.white} />
                </TouchableOpacity>
                <Text style={style.headerTitle}>Talks</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: COLORS.white }}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 10}}>
                    <View style={style.tagContainer}>
                        {uniqueTags.map(tag => (
                            <TagButton
                                key={tag}
                                onPress={() => handleTagPress(tag)}
                                isSelected={selectedTags.includes(tag)}
                            >
                                {tag}
                            </TagButton>
                        ))}
                    </View>
                </ScrollView>
                <Text style={style.sectionTitle}>Helpful Talks</Text>
                <View style={style.categoryContainer}>
                {talksData.filter((talk) => {
                    if (selectedTags.length === 0) {
                        return true;
                    }
                    const tags = talk.tags.split(', ');
                    return selectedTags.every((tag) => tags.includes(tag));
                }).map(talk => (
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
        paddingVertical: 20,
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
        justifyContent: "center",
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },
    tagContainer: {
        marginHorizontal: 10,
        flexDirection: "row",
    },
    iconContainer: {
        height: 60,
        width: screenWidth / 1.3,
        backgroundColor: COLORS.lightgray,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        elevation: 12,
        margin: 13,
        paddingHorizontal: 10,
        flexDirection: 'column',
      },
      sectionTitle: {
        marginHorizontal: 20,
        marginVertical: 20,
        fontWeight: "bold",
        fontSize: 20,
      },
  })

export default TalksView;