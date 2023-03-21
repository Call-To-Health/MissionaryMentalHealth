import React from 'react';
import {View,Text,SafeAreaView,StyleSheet,TouchableOpacity,FlatList,ScrollView,} from 'react-native';
import { FocusedStatusBar } from '../components';
import Header from '../components/Header';
import { useNavigation } from "@react-navigation/native";
import { COLORS } from '../constants';
// import Card from '../components';

const Home = () => {
  const recentlyViewed = [
    { id: 1, title: 'Adjusting to Missionary Life' },
    { id: 2, title: 'Journal Entry' },
    { id: 3, title: 'Yep' },
    { id: 4, title: 'PLease stop scrolling because I aint got more ' },
  ];
  const othersExperiences = [1,2,3,4]; // Figure out how to include the stories here
  const navigation = useNavigation();
return (
<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
  <Header />
  <FocusedStatusBar
     translucent={false}
     backgroundColor={COLORS.primary}/>

  <View style={style.header}></View>
    <View
    style={{ backgroundColor: COLORS.primary, height: 30, paddingHorizontal: 20 }}>
    <Text style={style.headerTitle}>Welcome, Missionary! </Text></View>
  <View style={style.body}>
    <TouchableOpacity onPress={() => navigation.navigate("Checkin")} style={[style.button, style.redButton]}>
      <Text style={[style.buttonText, { color: COLORS.white }]}>Start Check-in</Text>
    </TouchableOpacity>
    </View>
    <View style={style.body}>
    <TouchableOpacity onPress={() => navigation.navigate("Journal")} style={[style.button, style.whiteButton]}>
      <Text style={[style.buttonText, { color: COLORS.primary }]}>Start Journal Entry</Text>
    </TouchableOpacity>
  </View>

  
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
    <Text style={style.scrollTitle}>Learn from other's experiences</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>

    </ScrollView>
  </View>
  </View>
</SafeAreaView>
  );
};


const style = StyleSheet.create ({
  header: {
    paddingVertical:20,
    flexDirection:'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,

  },
  headerTitle: {
    color:COLORS.white,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems:'center',
    fontWeight:'bold',
    fontSize: 23,
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15 ,
    marginHorizontal:20,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginHorizontal: 10,
  },
  redButton: {
    backgroundColor: COLORS.red,
  },
  whiteButton: {
    backgroundColor: COLORS.white,
  },
  blueButton: {
    backgroundColor: COLORS.blue,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  cardContainer: {
    backgroundColor: COLORS.white,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal:10,
    borderRadius: 20,
  },
  cardContainerWrapper: {
    marginHorizontal: 12,
  },
  card: {
    backgroundColor: COLORS.lightGray,
    width: 150,
    height: 100,
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },})
  
  export default Home;