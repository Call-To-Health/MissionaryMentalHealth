import {React, Navigation} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import {StyleSheet, Text,View, Pressable} from 'react-native';
import { useFonts } from "expo-font";
import Icon from 'react-native-ico-material-design';
import Tabs from './navigation/tabs';

import Home from "./screens/Home";
import Details from "./screens/Details";
import Library from "./screens/Library";
import UserAccount from "./screens/UserAccount";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import react from "react";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


// function TabNav() {
//   return(
//     <Tab.Navigator>
//       <Tab.Screen name="Feed" component={Feed} />
//       <Tab.Screen name="Messages" component={Messages} />
//     </Tab.Navigator>
//   )
// }

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};


const App = () => {
  const [loaded] = useFonts({InterBold: require("./assets/fonts/Inter-Bold.ttf"),InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),InterMedium: require("./assets/fonts/Inter-Medium.ttf"),InterRegular: require("./assets/fonts/Inter-Regular.ttf"),InterLight: require("./assets/fonts/Inter-Light.ttf"),});
  if (!loaded) return null;

return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{
            headerLeft:null,
            headerRight:null,
            //  this is what removes the header! 
            headerShown:false}}
        />
        <Stack.Screen
          name="Details"
          component={Details}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

