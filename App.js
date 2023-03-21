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
import Modal from "./screens/Modal";
import Home from "./screens/Home";
import Stories from "./screens/Stories";
import JournalList from "./screens/JournalList";
import AdjustingToMission from "./screens/AdjustingToMission";
import AdjustingToMissionChaptersView from "./screens/AdjustingToMissionChaptersView";
import TalksView from "./screens/TalksView";
import TalkWebView from "./screens/TalkWebView";
import Survey from "./screens/Survey";
import Results from "./screens/Results";

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

const App = () => {
  const [loaded] = useFonts({InterBold: require("./assets/fonts/Inter-Bold.ttf"), InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),InterMedium: require("./assets/fonts/Inter-Medium.ttf"),InterRegular: require("./assets/fonts/Inter-Regular.ttf"),InterLight: require("./assets/fonts/Inter-Light.ttf"),});
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
          name="Modal"
          component={Modal}
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
        <Stack.Screen
          options={{headerShown: false}}
          name="Stories"
          component={Stories}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="AdjustingToMission"
          component={AdjustingToMission}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="AdjustingToMissionChaptersView"
          component={AdjustingToMissionChaptersView}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="TalksView"
          component={TalksView}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="TalkWebView"
          component={TalkWebView}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="Survey"
          component={Survey}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Results"
          component={Results}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;