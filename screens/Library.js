import { View, Text } from 'react-native'
import {FocusedStatusBar} from "../components";
import React from 'react'

const Library = () => {
  return (
    <View>
      <FocusedStatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <Text>Library</Text>
    </View>
  )
}

export default Library