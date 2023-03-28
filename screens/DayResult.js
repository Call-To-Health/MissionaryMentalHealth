import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FocusedStatusBar } from '../components';
import Header from "../components/Header";
import { SafeAreaView } from 'react-navigation';
import { COLORS, SIZES, FONTS } from '../constants';
import { useNavigation, useRoute } from '@react-navigation/native';

const DayResult = () => {

    const navigation = useNavigation();

    const route = useRoute();
    const { selectedDate } = route.params;

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
                <Text style={style.text}>This is where check-in results for this day will go.</Text>
            </View>

            <TouchableOpacity
                style={style.button}
                onPress={() => navigation.navigate("Checkin")}>
                <Text style={style.buttonText}>Return to Check-in</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )

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
        justifyContent: 'space-between',
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
        fontSize: SIZES.medium,
        color: COLORS.white,
    }
});

export default DayResult;