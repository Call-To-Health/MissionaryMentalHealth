import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import {StyleSheet,Text,View,Pressable} from 'react-native';
import { useFonts } from "expo-font";
import Icon from 'react-native-ico-material-design';
import Tabs from './navigation/tabs';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Details from "./screens/Details";
import UserAccount from "./screens/UserAccount";
import Register from "./screens/Register";
import Home from "./screens/Home";
import Journal from "./screens/Journal";
import StoriesView from "./screens/StoriesView";
import JournalList from "./screens/JournalList";
import SearchResults from "./screens/SearchResults";
import AdjustingToMission from "./screens/AdjustingToMission";
import AdjustingToMissionChaptersView from "./screens/AdjustingToMissionChaptersView";
import PsychologyTodayListView from "./screens/PsychologyTodayListView";
import TalksView from "./screens/TalksView";
import GeneralWebView from "./screens/GeneralWebView";
import Survey from "./screens/Survey";
import Results from "./screens/Results";
import DayResult from "./screens/DayResult";
import EditJournalEntry from "./screens/EditJournalEntry";
import { auth } from './firebase';

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};


const App = () => {
  const [user, setUser] = useState(null);
  const [loaded] = useFonts({InterBold: require("./assets/fonts/Inter-Bold.ttf"), InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),InterMedium: require("./assets/fonts/Inter-Medium.ttf"),InterRegular: require("./assets/fonts/Inter-Regular.ttf"),InterLight: require("./assets/fonts/Inter-Light.ttf"),});
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

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
        <Stack.Screen
          options={{headerShown: false}}
          name="StoriesView"
          component={StoriesView}
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
          name="PsychologyTodayListView"
          component={PsychologyTodayListView}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="TalksView"
          component={TalksView}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="GeneralWebView"
          component={GeneralWebView}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Register"
          component={Register}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Survey"
          component={Survey}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="EditJournalEntry"
          component={EditJournalEntry}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Results"
          component={Results}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Journal"
          component={Journal}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="DayResult"
          component={DayResult}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="SearchResults"
          component={SearchResults}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;