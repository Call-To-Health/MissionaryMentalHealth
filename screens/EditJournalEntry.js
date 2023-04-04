import { View, Text, StyleSheet,ScrollView, FlatList, TextInput,SafeAreaView, Keyboard, TouchableOpacity} from 'react-native';
import FocusedStatusBar from '../components/FocusedStatusBar';
import React, {useState,useCallback,useEffect} from 'react';
import { JournalSearch, JournalCard } from '../components';
import JournalEditHeader from '../components/JournalEditHeader';
import { COLORS } from '../constants';
import {firebase, auth} from '../firebase.js';
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

const Navigator = createStackNavigator();

const EditJournalEntry = ({route}) => {
  const navigation = useNavigation();
  const journalsCollection = firebase.firestore().collection('journals');
  const userContentCollection = firebase.firestore().collection('userContent');
  const [tags, setTags] = useState(route.params.doc.tags);
  const [addData, setAddData] = useState(route.params.doc.journalEntry);
  const [journals, setJournals] = useState([]);
  const [data, setData] = useState([]);
  const {doc} = route.params;

  const updateField = () => {
    const updatedData = {
      journalEntry: addData,
      tags: tags,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    userContentCollection.doc(auth.currentUser?.uid).collection('journals')
      .doc(route.params.doc.id)
      .update(updatedData)
      .then(() => {
        navigation.navigate('JournalList');
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (

    <SafeAreaView style={{flex:1,backgroundColor: COLORS.primary}}>
      <JournalEditHeader/>
      <FocusedStatusBar translucent={false} backgroundColor={COLORS.primary}/>
      <ScrollView keyboardShouldPersistTaps="never">
      <View style={styles.container}>
  
      <TextInput
          style={styles.input}
          placeholderTextColor='#aaaaaa'
          onChangeText={(journalEntry) => setAddData(journalEntry)}
          value={addData}
          multiline={true}
          underlineColorAndroid='transparent'
          autoCapitalize='none' />
        <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.tagsContainer}>
          <TouchableOpacity
            style={tags.includes('Depressed') ? styles.tagButtonActive : styles.tagButton}
            onPress={() => {
              if (tags.includes('Depressed')) {
                setTags(tags.filter(tag => tag !== 'Depressed'));
            } else {
                setTags([...tags, 'Depressed']);}}}>
            <Text style={styles.tagText}>Depressed</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tags.includes('Homesick') ? styles.tagButtonActive : styles.tagButton}
            onPress={() => {
              if (tags.includes('Homesick')) {
                setTags(tags.filter(tag => tag !== 'Homesick'));
            } else {
                setTags([...tags, 'Homesick']);}}}>
            <Text style={styles.tagText}>Homesick</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tags.includes('Anxious') ? styles.tagButtonActive : styles.tagButton}
            onPress={() => {
              if (tags.includes('Anxious')) {
                setTags(tags.filter(tag => tag !== 'Anxiety'));
            } else {
                setTags([...tags, 'Anxious']);}}}>
            <Text style={styles.tagText}>Anxious</Text>
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
            style={tags.includes('Excited') ? styles.tagButtonActive : styles.tagButton}
            onPress={() => {
              if (tags.includes('Excited')) {
                setTags(tags.filter(tag => tag !== 'Excited'));
            } else {
                setTags([...tags, 'Excited']);}}}>
            <Text style={styles.tagText}>Excited</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tags.includes('Sick') ? styles.tagButtonActive : styles.tagButton}
            onPress={() => {
              if (tags.includes('Sick')) {
                setTags(tags.filter(tag => tag !== 'Sick'));
            } else {
                setTags([...tags, 'Sick']);}}}>
            <Text style={styles.tagText}>Sick</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tags.includes('Exhausted') ? styles.tagButtonActive : styles.tagButton}
            onPress={() => {
              if (tags.includes('Exhausted')) {
                setTags(tags.filter(tag => tag !== 'Exhausted'));
            } else {
                setTags([...tags, 'Exhausted']);}}}>
            <Text style={styles.tagText}>Exhausted</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tags.includes('Frustrated') ? styles.tagButtonActive : styles.tagButton}
            onPress={() => {
              if (tags.includes('Frustrated')) {
                setTags(tags.filter(tag => tag !== 'Frustrated'));
            } else {
                setTags([...tags, 'Frustrated']);}}}>
            <Text style={styles.tagText}>Frustrated</Text>
          </TouchableOpacity>
        </View>
        
      </ScrollView>  
      </View>
      <View style={styles.formContainer}>
              <TouchableOpacity style={styles.button} onPress={updateField}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
    
              <TouchableOpacity style={styles.buttonPink} onPress={() => navigation.navigate("JournalList")}>
                    <Text style={styles.buttonText}>See Journal Entries</Text>
                  </TouchableOpacity>
          </View>
        </View> 
        </ScrollView>
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

export default EditJournalEntry;