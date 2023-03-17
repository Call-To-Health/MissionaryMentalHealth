import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import {FocusedStatusBar} from "../components";
import React from 'react';
import Header from '../components/Header';
import { SafeAreaView } from 'react-navigation';
import { COLORS, SIZES, FONTS, assets } from '../constants';
import { useNavigation } from "@react-navigation/native";

const Results = ({ route }) => {
  const navigation = useNavigation();

  const { zone } = route.params;


  return (
    <SafeAreaView style={{flex:1,backgroundColor: COLORS.primary}}>
      <Header/>
      <FocusedStatusBar translucent={false} backgroundColor={COLORS.primary}/>
        
        <View style={{backgroundColor:COLORS.primary, height:120, paddingHorizontal:20}}>
        <Text style={style.headerTitle}>Results</Text>
        </View>

        <View style={style.container}>
            <View>
            <Text style={style.text}>You are in the {zone} zone!</Text>
            </View>
    
            <View style={style.imgView}>
            <Image source={require("../assets/images/yellow.png")} style={style.image}/>
            </View>

            <TouchableOpacity
                style={{
                    backgroundColor: COLORS.white,
                    padding: SIZES.small,
                    borderRadius: SIZES.medium,
                    width: '60%',
                    alignSelf: 'center',
                    marginVertical: 20
                }}
                onPress={() => navigation.navigate("Checkin")}
            >
                <Text
                    style={{
                    fontFamily: FONTS.semiBold,
                    fontSize: SIZES.medium,
                    color: COLORS.primary,
                    textAlign: "center",
                    }}
                >
                See Previous Results
                </Text>
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
  text: {
    color:COLORS.white,
    fontWeight:'bold',
    fontSize: 20,
    textAlign: 'center',
    marginTop: -50,
  },
  container: {
    paddingHorizontal: 15,
    padding: SIZES.medium,
    justifyContent: 'space-between',
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    alignSelf: 'center',

  },
  imgView: {
    flex: 1,
    borderRadius: 20,
    marginVertical: 20,
  }
});

export default Results;