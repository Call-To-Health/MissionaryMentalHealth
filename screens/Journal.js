import { View, Text } from 'react-native'
import {FocusedStatusBar} from "../components";
import React from 'react'

const Journal = () => {
  return (
    
    <View>
      <FocusedStatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <Text>Journal</Text>
    </View>
  )
}

export default Journal