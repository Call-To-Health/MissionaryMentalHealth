import { View, Text, StyleSheet, Image, TouchableOpacity, Button  } from 'react-native'
import {FocusedStatusBar} from "../components";
import Header from '../components/Header';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-navigation';
import { COLORS, FONTS, SIZES, assets} from '../constants';
import { TextInput } from 'react-native-gesture-handler';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

// Keys for OAuth
// Web: 733294962332-vlsshtk13q21uc5hosvd6l4pmk8nivs4.apps.googleusercontent.com
// Android: 733294962332-cv38cd85frv3gt18p2m6d6mmkg4nhe9r.apps.googleusercontent.com
// iOS: 733294962332-497egn0ig9480umhto7rvtplh8boc6du.apps.googleusercontent.com

WebBrowser.maybeCompleteAuthSession()

const UserAccount = () => {
  
  const HandleSignOut = () => {
    auth
    .signOut()
    .then(()=> {
      setEmail("");
      setPassword("");
      navigation.navigate("Home")
    })
    .catch(error => alert(error.message))
  }
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate("Home")
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
          <Text style={{fontSize:35, fontWeight: 'bold', marginBottom:20}}>Welcome {user.name}</Text>
          <Image source={{uri:user.picture}} style={{width: 100, height:100, borderRadius:50}}/>
          <Pressable onPress={() => navigation.navigate("Home")}>
            <Image source={assets.go} resizeMode="contain" style={{ width: "100%", height: "100%", borderRadius: 50 }}/>
          </Pressable>
          <Text style={{fontSize:20, fontWeight: 'bold'}}>{user.name}</Text>
        </View>
      )
    }
  }

  return (
    <SafeAreaView style={{flex:1,backgroundColor: COLORS.primary}}>
      <Header/>

      <SafeAreaView style={{alignItems:'center',flex:1,backgroundColor: COLORS.primary}}>
      <FocusedStatusBar translucent={false} backgroundColor={COLORS.primary}/>

          <View style={{justifyContent:'center',alignItems:'center',backgroundColor:COLORS.primary, height:120,paddingHorizontal:20}}>
            <Text style={styles.headerTitle}>User Account</Text>
            <Text style={styles.buttonText}>{auth.currentUser?.email} </Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput placeholder='Email'value={email}onChangeText={text => setEmail(text)}style={styles.input}/>
            <TextInput placeholder='Password'value={password}onChangeText={text => setPassword(text)}style={styles.input}secureTextEntry/>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSignUp} style={[styles.button, styles.buttonOutline]}>
              <Text style={styles.buttonOutlineText}>Register</Text>
            </TouchableOpacity>

          </View>
          <View style ={styles.littleContainer}>
            
            <TouchableOpacity onPress={HandleSignOut} style={styles.redButton}>
              <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>

          </View>
          <View>
            {user && <ShowUserInfo/>}
            {user === null && <>
            <Text style={{fontSize:20, fontWeight: 'bold',marginBottom: 20,marginLeft: 20, color: 'white'}}>Google Account</Text>
            <TouchableOpacity
              disabled={!request}
              onPress={() => {promptAsync();}}>
              <Image source={assets.google} style={{width:200, height:50}} />
            </TouchableOpacity></>}
          </View>
          </SafeAreaView>
    </SafeAreaView>

  )
}
const styles = StyleSheet.create ({
  header: {
    paddingVertical:20,
    flexDirection:'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
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
    color:COLORS.white,
    fontWeight:'bold',
    fontSize: 23,
  },
inputContainer : {
  width: '80%',
  height: 60,
  
},
input : {
  backgroundColor: 'white',
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
  backgroundColor: '#0782F9',
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
buttonText:{
  color: 'white',
  fontWeight: '700',
  fontSize:16, 
},
buttonOutline : {
  backgroundColor: 'white',
  marginTop:5,
  borderColor: '#0782F9'
},
buttonOutlineText : {
  color: '#0782F9',
  fontWeight: '700',
  fontSize:16, 
},
})
export default UserAccount
