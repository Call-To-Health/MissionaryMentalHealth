import { View, Text, StyleSheet,ScrollView, FlatList, TextInput,SafeAreaView, Keyboard, TouchableOpacity} from 'react-native';
import FocusedStatusBar from '../components/FocusedStatusBar';
import React, {useState,useCallback,useEffect} from 'react';
import { JournalSearch, JournalCard } from '../components';
import JournalHeader from '../components/JournalHeader';
import { COLORS } from '../constants';
import { firebase, auth } from '../firebase.js';
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

const Navigator = createStackNavigator();

const Journal = () => {
  const navigation = useNavigation();
  const journalsCollection = firebase.firestore().collection('journals');
  const userContentCollection = firebase.firestore().collection('userContent');
  const [tags,setTags] = useState([])
  const [addData, setAddData] = useState('');
  const [journals, setJournals] = useState([]);
  const [data, setData] = useState([]);

  const addField = () => {
    //check if we have new field data 
    if (addData && addData.length > 0) {
      //get the timestamp 
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        journalEntry: addData,
        tags:tags,
        createdAt: timestamp
      };
      userContentCollection.doc(auth.currentUser?.uid).collection('journals')
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

  // useEffect(() => {
  //   const unsubscribe = journalsCollection.onSnapshot((querySnapshot) => {
  //     const data = [];
  //     querySnapshot.forEach((doc) => {
  //       data.push({
  //         id: doc.id,
  //         ...doc.data(),
  //       });
  //     });
  //     setJournals(data);
  //     setData(data);
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  return (

    <SafeAreaView style={{flex:1,backgroundColor: COLORS.primary}}>
      <JournalHeader/>
      <FocusedStatusBar translucent={false} backgroundColor={COLORS.primary}/>
      <View style={styles.container}>
        {/* <Text style={styles.headerTitle}>   Add a Journal Entry</Text> */}
          <TextInput
            style={styles.input}
            placeholder='Add your journal entry here!'
            placeholderTextColor='#aaaaaa'
            onChangeText={(journalEntry) => setAddData(journalEntry)}
            value={addData}
            multiline={true}
            underlineColorAndroid='transparent'
            autoCapitalize='none'/>
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.tagsContainer}>
          <TouchableOpacity
            style={tags.includes('Depression') ? styles.tagButtonActive : styles.tagButton}
            onPress={() => {
              if (tags.includes('Depression')) {
                setTags(tags.filter(tag => tag !== 'Depression'));
            } else {
                setTags([...tags, 'Depression']);}}}>
            <Text style={styles.tagText}>Depression</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tags.includes('Homesickness') ? styles.tagButtonActive : styles.tagButton}
            onPress={() => {
              if (tags.includes('Homesickness')) {
                setTags(tags.filter(tag => tag !== 'Homesickness'));
            } else {
                setTags([...tags, 'Homesickness']);}}}>
            <Text style={styles.tagText}>Homesickness</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tags.includes('Anxiety') ? styles.tagButtonActive : styles.tagButton}
            onPress={() => {
              if (tags.includes('Anxiety')) {
                setTags(tags.filter(tag => tag !== 'Anxiety'));
            } else {
                setTags([...tags, 'Anxiety']);}}}>
            <Text style={styles.tagText}>Anxiety</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tags.includes('Happy') ? styles.tagButtonActive : styles.tagButton}
            onPress={() => {
              if (tags.includes('Happy')) {
                setTags(tags.filter(tag => tag !== 'Happy'));
            } else {
                setTags([...tags, 'Happy']);}}}>
            <Text style={styles.tagText}>Happy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tags.includes('Exhaustion') ? styles.tagButtonActive : styles.tagButton}
            onPress={() => {
              if (tags.includes('Exhaustion')) {
                setTags(tags.filter(tag => tag !== 'Exhaustion'));
            } else {
                setTags([...tags, 'Exhaustion']);}}}>
            <Text style={styles.tagText}>Exhaustion</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tags.includes('Frustration') ? styles.tagButtonActive : styles.tagButton}
            onPress={() => {
              if (tags.includes('Frustration')) {
                setTags(tags.filter(tag => tag !== 'Frustration'));
            } else {
                setTags([...tags, 'Frustration']);}}}>
            <Text style={styles.tagText}>Frustration</Text>
          </TouchableOpacity>
        </View>
        
      </ScrollView>  
      </View>
      <View style={styles.formContainer}>
              <TouchableOpacity style={styles.button} onPress={addField}>
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
    
              <TouchableOpacity style={styles.buttonPink} onPress={() => navigation.navigate("JournalList", {refresh: true})}>
                    <Text style={styles.buttonText}>See Journal Entries</Text>
                  </TouchableOpacity>
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
    height: 200,
    padding: 20,
    margin: 12,
    borderWidth: 1,
    borderRadius: 20,
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
    backgroundColor: '#e32f45',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation:10,
    alignSelf: 'flex-end',
    margin: 10,
  },
  buttonPink: {
    backgroundColor: '#E17474',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation:10,
    alignSelf: 'flex-end',
    margin: 10,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 53,
    paddingTop: 10,
  },
  tagButton: {
    backgroundColor: COLORS.white,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  tagButtonActive: {
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  tagText: {
    color: COLORS.dark,
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export default Journal;