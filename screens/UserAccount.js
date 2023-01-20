import { View, Text } from 'react-native'
import React from 'react'

const UserAccount = ({ data, navigation }) => (
  <View style={{ width: "100%", height: 373 }}>
    

    <CircleButton
      imgUrl={assets.left}
      handlePress={() => navigation.goBack()}
      left={15}
      top={StatusBar.currentHeight + 10}/>
    
      <Text>UserAccount</Text>

      
    </View>
);

export default UserAccount