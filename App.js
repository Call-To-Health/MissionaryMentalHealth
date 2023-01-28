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

const Stack = createStackNavigator();
const TabNavigator = createBottomTabNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const [loaded] = useFonts({
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
  });



  if (!loaded) return null;

  return (
      
    <NavigationContainer theme={theme}>

      <Tabs/>
      
    </NavigationContainer>
  );
};

export default App;


{/* <Stack.Navigator screenOptions={{headerShown: false,}}initialRouteName="Home">
  <Stack.Screen name="TabNav" component={TabNav}></Stack.Screen>
  <Stack.Screen name="Home" component={Home}></Stack.Screen>
  <Stack.Screen name="Details" component={Details} />
</Stack.Navigator>   */}