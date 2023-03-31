import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, FlatList, ScrollView, Pressable } from 'react-native';
import { FocusedStatusBar } from '../components';
import HomeHeader from '../components/HomeHeader';
import { useNavigation} from "@react-navigation/native";
import { COLORS, SIZES } from '../constants';
import { fetchJournals } from '../firebase';
import { fetchRandomQuote, fetchRandomDocs, auth, getTopViewed, addRecentView, getUserProfile } from '../firebase';

const Home = () => {
  const recentlyViewed = [
    { id: 1, title: 'Adjusting to Missionary Life' },
    { id: 2, title: 'Journal Entry' },
    { id: 3, title: 'Yep' },
    { id: 4, title: 'Please stop scrolling because I aint got more ' },
  ];

  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const navigation = useNavigation();
  const [randomQuote, setRandomQuote] = useState([]);
  const [journals, setJournals] = useState([]);
  const [randomDocs, setRandomDocs] = useState([]);

  const handleStoryPress = (story) => {
    navigation.navigate('Details', { story: story });
    console.log(`Story id ${story.id} clicked. ${story.experience}` );
  };

  const handleJournalPress = (journal) => {
    navigation.navigate('EditJournalEntry', { doc: journal });
    console.log(`Journal id ${journals.id} clicked. ${journals.journalEntry}` );
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const userProfile = await getUserProfile(user.uid);
        setUserProfile(userProfile);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchAndSetJournals = async () => {
      const fetchedJournals = await fetchJournals();
      setJournals(fetchedJournals);
    };
    fetchAndSetJournals();
  }, []);

  useEffect(() => {
    const getRandomDocs = async () => {
      const randomDocs = await fetchRandomDocs();
      setRandomDocs(randomDocs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    getRandomDocs();
  }, []);

  useEffect(() => {
    const getRandomQuote = async () => {
      const randomQuote = await fetchRandomQuote();
      setRandomQuote(randomQuote.map((doc) => ({ id: doc.id, ...doc.data() })));
      console.log("Here is the content of randomQuote in the Home component" + randomQuote);
    };
    getRandomQuote();
  }, []);

return (
<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
  <HomeHeader userProfile={userProfile}/>
  <FocusedStatusBar
     translucent={false}
     backgroundColor={COLORS.primary}/>

  <View style={style.header}></View>
    <ScrollView style={{ backgroundColor: COLORS.white}}>
      <View style={style.body}>
        <Text style={style.instructionalText}>Have you done your daily check-in yet?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Checkin")} style={[style.button, style.redButton]}>
          <Text style={[style.buttonText, { color: COLORS.white }]}>Start Check-in</Text>
        </TouchableOpacity>
        </View>
        <View style={style.body}>
          <Text style={style.instructionalText}>Write about how you're feeling today.</Text>
          <TouchableOpacity onPress={() => navigation.navigate('JournalStack', { screen: 'Journal' })} style={[style.button, style.primaryButton]}>
          <Text style={[style.buttonText, { color: COLORS.white }]}>Start Journal Entry</Text>
        </TouchableOpacity>
      </View>

      <View style={style.cardContainerWrapper}>
        <View style={style.cardContainer}>
          <Text style={style.scrollTitle}>Quote of the Day</Text>
          
            <View style={style.quoteCard}>
              {randomQuote.map(doc => (
              <View key={doc.id}>
                <Text>{doc.text}</Text>
                <Text>  -{doc.speaker}</Text>
            </View>))}
            </View>
        </View>
      </View>

  <ScrollView contentContainerStyle={{ paddingBottom: 100 }}
    showsVerticalScrollIndicator={false}>
    <View style={style.cardContainerWrapper}>
      <View style={style.cardContainer}>
        <Text style={style.scrollTitle}>Recently viewed</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {recentlyViewed.map(item => (
            <View key={item.id} style={style.card}>
              <Text>{item.title}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>

    <View style={style.cardContainerWrapper}>
      <View style={style.cardContainer}>
        <Text style={style.scrollTitle}>Recent Journal Entries</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {journals.map(doc => (
            <Pressable
            key={doc.id}
            onPress={() => handleJournalPress(doc)}>
            <View key={doc.id} style={style.card}>
              <Text>{doc.journalEntry}</Text>
            </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>

    <View style={style.cardContainerWrapper}>
      <View style={style.cardContainer}>
        <Text style={style.scrollTitle}>Others' experiences</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {randomDocs.map(doc => (
            <Pressable
            key={doc.id}
            onPress={() => handleStoryPress(doc)}>
            <View key={doc.id} style={style.card}>
              <Text>{doc.solution}</Text>
            </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>
  </ScrollView>
</ScrollView>
</SafeAreaView>
  );
};


const style = StyleSheet.create ({
  header: {
    paddingVertical: 0,
    flexDirection:'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    color: COLORS.white,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems:'center',
    fontWeight:'bold',
    fontSize: 23,
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10 ,
    marginHorizontal:20,
  },
  instructionalText: {
    fontSize: SIZES.large,
    paddingBottom: 12,
    paddingTop: 1,
    fontWeight: "bold"
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginHorizontal: 10,
    alignItems: 'center',
    width: '60%'
  },
  redButton: {
    backgroundColor: COLORS.red,
    elevation:12
  },
  whiteButton: {
    backgroundColor: COLORS.white,
    elevation:12
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    elevation:7
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  cardContainer: {
    backgroundColor: COLORS.white,
    // paddingVertical: 10,
    paddingHorizontal:10,
    borderRadius: 20,
  },
  cardContainerWrapper: {
    marginHorizontal: 18,
  },
  card: {
    backgroundColor: COLORS.lightgray,
    elevation:5,
    width: 130,
    height: 80,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quoteCard: {
    backgroundColor: COLORS.lightgray,
    elevation:5,
    width: 318,
    height: 120,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },})
  
  export default Home;