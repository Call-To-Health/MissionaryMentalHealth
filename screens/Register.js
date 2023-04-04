import { View, Text, StyleSheet, Image,SafeAreaView, TouchableOpacity, Button, Pressable, ScrollView  } from 'react-native'
import {FocusedStatusBar} from "../components";
import RegisterHeader from '../components/RegisterHeader';
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

const Register = () => {

  const [selectedOption, setSelectedOption] = useState('');
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
  

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate('Tabs', { screen: 'Home' })
      }
    })
    return unsubscribe;
  }, [])

  const handleSignUp = async () => {
    try {
      const userCredentials = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredentials.user;
    
      // Save the selected gender option to the database
      const gender = selectedOption;
      await user.updateProfile({
        displayName: gender
      });
  
      console.log(user.email + " user account was created with " + user.displayName + " gender.");
    
      navigation.navigate('Tabs', { screen: 'HomeStack' });
    } catch (error) {
      alert(error.message);
    }
  };
  


  return (
    <SafeAreaView style={{flex:1,backgroundColor: COLORS.primary}}>
      <ScrollView keyboardShouldPersistTaps="never" contentInsetAdjustmentBehavior="automatic" contentInset={{ bottom: 100 }} scrollIndicatorInsets={{ bottom: 100 }}>
        <SafeAreaView style={{alignItems:'center',flex:1,backgroundColor: COLORS.primary, paddingBottom: 110}}>
          <FocusedStatusBar translucent={false} backgroundColor={COLORS.primary}/>
          <RegisterHeader />

            <View>
              <Text style={styles.buttonText}>{auth.currentUser?.email}</Text>
            </View>
          
            <View style={styles.inputContainer}>
              <View>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput placeholder='name@missionary.org' value={email} onChangeText={text => setEmail(text)} style={styles.input}/>
              </View>
              <View>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput value={password} onChangeText={text => setPassword(text)} style={styles.input} secureTextEntry/>
              </View>
            </View>

            <View>
            <Text style={styles.inputLabel}>I am an...</Text>
            <View style={{ flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => handleOptionSelect('elder')} style={selectedOption === 'elder' ? styles.selectedButton : styles.unselectedButton}>
                <Text style={selectedOption === 'elder' ? styles.selectedButtonText : styles.unselectedButtonText}>{selectedOption === 'elder' ? '●' : '○'} Elder</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleOptionSelect('sister')} style={selectedOption === 'sister' ? styles.selectedButton : styles.unselectedButton}>
                <Text style={selectedOption === 'sister' ? styles.selectedButtonText : styles.unselectedButtonText}>{selectedOption === 'sister' ? '●' : '○'} Sister</Text>
              </TouchableOpacity>
            </View>

            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleSignUp} style={styles.button}>
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>

            <View style={{ flexDirection: 'row', paddingVertical: 25, paddingHorizontal: 50 }}>

            </View>
            </View>
            <View style ={styles.littleContainer}>

            </View>

            <View style={{ paddingTop: 30 }}> 
              {user}

              
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
  selectedButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    alignItems: 'center',
  },
  unselectedButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    alignItems: 'center',
  },
  selectedButtonText: {
    color: 'black',
    fontSize: 20,
  },
  unselectedButtonText: {
    color: 'white',
    fontSize: 20,},
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
    paddingVertical: 15,
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
export default Register;