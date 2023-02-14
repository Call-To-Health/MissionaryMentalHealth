import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, TouchableOpacity  } from 'react-native'
import {FocusedStatusBar} from "../components";
import React from 'react';
import Header from '../components/Header';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-navigation';
import { COLORS } from '../constants';
import { TextInput } from 'react-native-gesture-handler';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import NavigationContainer from '@react-navigation/native';


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
            <TextInput placeholder='Email'
            value={email.trim()}
            onChangeText={text => setEmail(text)}
            style={styles.input}
            />
            <TextInput placeholder='Password'
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.input}
            secureTextEntry/>
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
