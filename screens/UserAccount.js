import { View, Text, SafeAreaView, Image, StatusBar, FlatList } from "react-native";
import React from 'react';
import { CircleButton, RectButton, SubInfo, DetailsDesc, DetailsArticle, FocusedStatusBar } from "../components";
import { assets } from '../constants';

const UserAccount = () => {
  return (
    <View>
      <FocusedStatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />

    <CircleButton
      imgUrl={assets.left}
      handlePress={() => navigation.goBack()}
      left={15}
      top={StatusBar.currentHeight + 10}/>
    
      <Text>User Account</Text>

      
    </View>

);
}

export default UserAccount