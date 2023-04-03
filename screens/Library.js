import { SafeAreaView, View, StyleSheet,StatusBar,ScrollView, Text, Pressable, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FocusedStatusBar } from "../components";
import { COLORS, SIZES } from '../constants';
import LibraryHeader from '../components/LibraryHeader';
import LibrarySearch from '../components/LibrarySearch';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";
import { getTopViewed, auth } from '../firebase';
import { assets } from '../constants';
import { GrantType } from 'expo-auth-session';

const Library = () => {  
  const [topViewed, setTopViewed] = useState(null);
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

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
    const fetchTopViewed = async () => {
      if (user) {
        const topViewed = await getTopViewed(user.uid);
        setTopViewed(topViewed);
      }
    };

    fetchTopViewed();
  }, []);

  const categoryIcons = [
    {icon: <MaterialCommunityIcons name="bookshelf" size={30} color={COLORS.primary} />, label: "Talks", navLocation: "TalksView"},
    {icon: <Feather name="book-open" size={30} color={COLORS.primary} />, label: "Missionary Stories",  navLocation: "StoriesView"},
    {icon: <FontAwesome5 name="pencil-alt" size={24} color={COLORS.primary} />, label: "My Journal Entries",  navLocation: "JournalList"},
  ];


  const ListCategories = () => {
    return (
      <View style={style.categoryContainer}>
        {categoryIcons.map(({icon, label, navLocation}, index) => (
          <View style={{alignItems: "center"}} key={index}>
            <Pressable onPress={() => navigation.navigate(navLocation)}>
              <View>
                <View key={index} style={style.iconContainer}>
                  {icon}
                </View>
              </View>
            </Pressable>
            <Text style={style.labelContainer}>{label}</Text>
          </View>
        ))}
      </View>
    );
  };
  
  return (
    <SafeAreaView style={{flex: 1,backgroundColor: COLORS.primary}}>
      <LibraryHeader/>
      <LibrarySearch/>
      <FocusedStatusBar translucent={false} backgroundColor={COLORS.primary}/>
        
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: COLORS.white }}>
          <View style={{backgroundColor: COLORS.primary, height: 0}}>
            <View style={{ marginLeft: 10, marginRight: 10}}>
              
            </View>
          </View>
          
          {/* <ListCategories /> */}
          <Text style={style.sectionTitle}>Recently Viewed</Text>
            {/* {user ? 
             topViewed?.map(doc => (
              <View key={doc.id} style={style.card}>
                  <Pressable onPress={() => 
                      {addRecentView(user.uid, doc.docId, doc.type);
                      navigation.navigate('GeneralWebView', {url: doc.talk.url, title: doc.talk.title})
                  }}> 
                          <View style={style.iconContainer}>
                              <Text numberOfLines={2} ellipsizeMode='tail'>{doc.talk.title}</Text>
                          </View>
                  </Pressable>
              </View>
            ))
          : '' } */}

          <Text style={style.sectionTitle}>Resources</Text>
          <View>
            
          <ScrollView>
            <View style={style.gridContainer}>
          <View style={style.cardContainer}>
              <TouchableOpacity onPress={() => navigation.navigate("AdjustingToMissionChaptersView")}>
              <Image
                source={assets.adjustToML}
                style={style.cardImage}
              />
              
              <Text style={style.cardLabel}>Adjusting to Missionary Life</Text>
              </TouchableOpacity>
            </View>

            <View style={style.cardContainer}>
              <TouchableOpacity onPress={() => navigation.navigate("TalksView")}>
              <Image
                source={assets.Christ}
                style={style.cardImage}
              />
              
              <Text style={style.cardLabel}>Talks</Text>
              </TouchableOpacity>
            </View>

            <View style={style.cardContainer}>
              <TouchableOpacity onPress={() => navigation.navigate("JournalList")}>
              <Image
                source={assets.journal}
                style={style.cardImage}
              />
              
              <Text style={style.cardLabel}>My Journal Entries</Text>
              </TouchableOpacity>
            </View>

            <View style={style.cardContainer}>
              <TouchableOpacity onPress={() => navigation.navigate("PsychologyTodayListView")}>
              <Image
                source={assets.psychologytoday}
                style={[style.cardImage, {resizeMode: 'contain'}]}
              />
              
              <Text style={style.cardLabel}>Psychology Today</Text>
              </TouchableOpacity>
            </View>

            <View style={style.cardContainer}>
              <TouchableOpacity onPress={() => navigation.navigate("StoriesView")}>
              <Image
                source={assets.missionaries3}
                style={style.cardImage}
              />
              
              <Text style={style.cardLabel}>Others' Stories</Text>
              </TouchableOpacity>
            </View>
            </View>
            </ScrollView>
          </View>
          <View style={{backgroundColor: COLORS.white, height: 100}}></View>
        </ScrollView>

    </SafeAreaView>
  )
}

const style = StyleSheet.create ({
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection:'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    color:COLORS.white,
    fontWeight:'bold',
    fontSize: 23,
  },
  inputContainer: {
    height: 50,
    width: '100%',
    backgroundColor: COLORS.lightgray,
    borderRadius: 15,
    position: 'absolute',
    top: 90,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 12
  },
  categoryContainer: {
    marginTop: 40,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  iconContainer: {
    height: 60,
    width: 60,
    backgroundColor: COLORS.lightgray,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    elevation: 12,
  },
  labelContainer: {
    width: 100,
    color: COLORS.black,
    alignItems: "center",
    textAlign: "center",
    fontSize: 13,
    paddingTop: 10
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginVertical: 20,
    fontWeight: "bold",
    fontSize: 20,
  },
  cardContainer: {
    width: 150,
    backgroundColor:'white',
    marginBottom:20,
    marginTop:10,
    marginLeft:5,
    padding:10,
    marginRight:5,
    elevation: 10, 
    borderRadius: 15,
    
  },
  cardImage: {
    height: 180,
    borderRadius:15,
    width: 130,
    padding: 20,
  },
  cardLabel: {
    padding: 5,
    textAlign:'center',
    fontSize:12,
    fontWeight:'bold'
  }
})
export default Library;