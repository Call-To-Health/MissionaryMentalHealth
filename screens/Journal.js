import { View, Text, StyleSheet,FlatList, TextInput,SafeAreaView, Keyboard, TouchableOpacity} from 'react-native';
import FocusedStatusBar from '../components/FocusedStatusBar';
import React, {useState,useCallback,useEffect} from 'react';
import { JournalSearch, JournalCard, } from '../components';
import Header from '../components/Header';
import { COLORS } from '../constants';
import {firebase,db} from '../firebase.js';
import { createStackNavigator } from '@react-navigation/stack';

const Navigator = createStackNavigator();

const Journal = () => {

  const journalsCollection = firebase.firestore().collection('journalsCollection');
  const [addData, setAddData] = useState('');
  const [journals, setJournals] = useState([]);
  const [data, setData] = useState([]);

  // add a new field

  const addField = () => {
    //check if we have new field data 
    if (addData && addData.length > 0) {
      //get the timestamp 
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        heading: addData,
        createdAt: timestamp
      };
      journalsCollection
      .add(data)
      .then(() => {
        //release the new field state 
        setAddData('');
        // release keyboard
        Keyboard.dismiss();
      })

      .catch((error) => {
        // show an alert in case of error 
        alert(error); 
      })
    }
  }

  const handleSearch = useCallback(
    (value) => {
      if (value.length === 0) {
        setJournals(data);
      } else {
        const filteredData = data.filter((item) =>
          item.heading.toLowerCase().includes(value.toLowerCase())
        );
        setJournals(filteredData);
      }
    },
    [data]
  );

  useEffect(() => {
    const unsubscribe = journalsCollection.onSnapshot((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setJournals(data);
      setData(data);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (

    <SafeAreaView style={{flex:1,backgroundColor: COLORS.primary}}>
      <Header/>
      <FocusedStatusBar translucent={false} backgroundColor={COLORS.primary}/>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>   Add a Journal Entry</Text>
          <TextInput
            style={styles.input}
            placeholder='Add your journal entry here!'
            placeholderTextColor='#aaaaaa'
            onChangeText={(heading) => setAddData(heading)}
            value={addData}
            multiline={true}
            underlineColorAndroid='transparent'
            autoCapitalize='none'/>
            <View style={styles.formContainer}>
              <TouchableOpacity style={styles.button} onPress={addField}>
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
    
              {/* <TouchableOpacity style={style.button} onPress={() => navigation.navigate("JournalList")}>
                    <Text style={style.buttontext}>See Journal Entries</Text>
                  </TouchableOpacity> */}
          </View>
        </View>
          <View style={{ flex: 2.1 }}>
          <JournalSearch/>
        <View style={{ zIndex: 0 }}>

          <FlatList
            data={journals}
            renderItem={({ item }) => <JournalCard data={item} />}
            keyExtractor={(item) => item.id}/>
        </View>

        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <View style={{ height: 160, backgroundColor: COLORS.primary }} />
          <View style={{ flex: 1, backgroundColor: COLORS.white }} />
        </View>
      </View>
        
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 23,
  },
  input: {
    height: 120,
    padding: 10,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.white,
    textAlignVertical: 'top',
    fontSize: 16,
    color: COLORS.dark,
  },
  formContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: COLORS.gray,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'flex-end',
    margin: 10,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Journal;