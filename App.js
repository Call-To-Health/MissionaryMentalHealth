import {React} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import {StyleSheet,Text,View,Pressable} from 'react-native';
import { useFonts } from "expo-font";
import Icon from 'react-native-ico-material-design';
import Tabs from './navigation/tabs';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Details from "./screens/Details";
import UserAccount from "./screens/UserAccount";
import Home from "./screens/Home";
import JournalList from "./screens/JournalList";

const Stack = createStackNavigator();

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
            //  this is what removes the header! 
            headerShown:false}}
        />
        <Stack.Screen
          name="Details"
          component={Details}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="UserAccount"
          component={UserAccount}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="JournalList"
          component={JournalList}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={Home}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;