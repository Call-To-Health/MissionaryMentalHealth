import { View, Text, StyleSheet } from 'react-native'
import {FocusedStatusBar} from "../components";
import React from 'react';
import Header from '../components/Header';
import { SafeAreaView } from 'react-navigation';
import { COLORS } from '../constants';

const Chat = () => {
  return (
    <SafeAreaView style={{flex:1,backgroundColor: COLORS.primary}}>
      <Header/>
      <FocusedStatusBar translucent={false} backgroundColor={COLORS.primary}/>
      
        <View style={style.header}>
        </View>
          <View style={{backgroundColor:COLORS.primary, height:120,paddingHorizontal:20}}>
            <Text style={style.headerTitle}>Chat</Text>
          </View>
        
    </SafeAreaView>
  )
}

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
  }
})

export default Chat