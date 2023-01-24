import { View, Text } from 'react-native'
import {FocusedStatusBar} from "../components";
import React from 'react'

const Chat = () => {
  return (
    
    <View>
      <FocusedStatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <Text>Chat</Text>
    </View>
  )
}

export default Chat