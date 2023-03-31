import { View, Text, StyleSheet, Image,SafeAreaView, TouchableOpacity, Button, Pressable, ScrollView  } from 'react-native'
import {FocusedStatusBar} from "../components";
import LoginHeader from '../components/LoginHeader';
import React, { useState, useEffect } from 'react';
import { COLORS, FONTS, SIZES, assets} from '../constants';
import { TextInput } from 'react-native-gesture-handler';
import { Separator } from '../components';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

// Keys for OAuth
// Web: 733294962332-vlsshtk13q21uc5hosvd6l4pmk8nivs4.apps.googleusercontent.com
// Android: 733294962332-cv38cd85frv3gt18p2m6d6mmkg4nhe9r.apps.googleusercontent.com
// iOS: 733294962332-497egn0ig9480umhto7rvtplh8boc6du.apps.googleusercontent.com

WebBrowser.maybeCompleteAuthSession()

const UserAccountLoggedIn = () => {

  const [accessToken, setAccessToken] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "733294962332-vlsshtk13q21uc5hosvd6l4pmk8nivs4.apps.googleusercontent.com",
    iosClientId: "733294962332-497egn0ig9480umhto7rvtplh8boc6du.apps.googleusercontent.com",
    androidClientId: "733294962332-cv38cd85frv3gt18p2m6d6mmkg4nhe9r.apps.googleusercontent.com"});

  React.useEffect(()=> {
    if(response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
      accessToken && fetchUserInfo();}},[response, accessToken])
  
  const HandleSignOut = () => {
    auth
    .signOut()
    .then(()=> {
      setEmail("");
      setPassword("");
      navigation.navigate('Tabs', { screen: 'Home' })
    })
    .catch(error => alert(error.message))
  }
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate('Tabs', { screen: 'Home' })
      }
    })
    return unsubscribe
  }, [])

  const handleSignUp = () => {
    auth 
    .createUserWithEmailAndPassword(email,password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log(user.email); 
    })
    .catch(error=> alert(error.message))
  }

  const handleLogin = () => {
    auth
    .signInWithEmailAndPassword(email,password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log('Logged in with: ', user.email);
    })
    .catch(error=> alert(error.message))
  }

  async function fetchUserInfo() {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me",{
      headers: {
        Authorization: 'Bearer ${accessToken}' }});
    const useInfo = await response.json();
    setUser(useInfo);
  }

  const ShowUserInfo = ()  => {
    if(user) {
      return(
        <View style={{flex:1, alignItems: 'center', justifyContent:'center'}}>
          <Text style={{fontSize:35,marginTop: 500, color: "white", fontWeight: 'bold', marginBottom:20}}>Google Sign In Successful! {user.name}</Text>
          <Image source={{uri:user.picture}} style={{width: 100, height:100, borderRadius:50}}/>
          <Pressable onPress={() => navigation.navigate('Tabs', { screen: 'Home' })}>
            <Text>Go Home</Text>
          </Pressable>
          <Text style={{fontSize:20, fontWeight: 'bold'}}>{user.name}</Text>
        </View>
      )
    }
  }

  return (
    <SafeAreaView style={{flex:1,backgroundColor: COLORS.primary}}>
      <ScrollView keyboardShouldPersistTaps="always" contentInsetAdjustmentBehavior="automatic" contentInset={{ bottom: 100 }} scrollIndicatorInsets={{ bottom: 100 }}>
        <SafeAreaView style={{alignItems:'center',flex:1,backgroundColor: COLORS.primary, paddingBottom: 110}}>
          <FocusedStatusBar translucent={false} backgroundColor={COLORS.primary}/>
          <LoginHeader />

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={HandleSignOut} style={styles.redButton}>
                <Text style={[styles.buttonText, {color: COLORS.white}]}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
      </ScrollView>
    </SafeAreaView>

  )
}
const styles = StyleSheet.create ({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
  },
  loginHeader: {
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: COLORS.primary, 
    paddingHorizontal: 30,
  },
  container: {
    flex:1,
    justifyContent:'center',
    alignItems: 'center',
  },
  littleContainer: {
    flex:0.25,
    justifyContent:'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: COLORS.white,
    fontWeight:'bold',
    fontSize: 25,
  },
  inputContainer : {
    width: '80%',
  },
  input : {
    backgroundColor: COLORS.secondary,
    color: COLORS.white,
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 2,
  },
buttonContainer : {
  width: '60%',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 40,
},
button : {
  backgroundColor: COLORS.white,
  width: '100%',
  padding: 15,
  borderRadius:15,
  alignItems: 'center'
},
redButton : {
  backgroundColor: 'red',
  width: '100%',
  padding: 15,
  borderRadius:15,
  alignItems: 'center'
},
buttonText: {
  color: COLORS.primary,
  fontWeight: '700',
  fontSize:16, 
},
buttonOutline : {
  backgroundColor: 'white',
  marginTop: 5,
  borderColor: '#0782F9'
},
buttonOutlineText : {
  color: '#0782F9',
  fontWeight: '700',
  fontSize: 16, 
},
inputLabel: {
  color: COLORS.white,
  paddingHorizontal: 5,
  paddingTop: 10,
  fontSize: SIZES.medium
},
})
export default UserAccountLoggedIn;
