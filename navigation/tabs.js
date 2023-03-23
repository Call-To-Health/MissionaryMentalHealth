import { createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Home from '../screens/Home';
import Library from '../screens/Library';
import Journal from "../screens/Journal";
import Checkin from '../screens/Checkin';
import UserAccount from '../screens/UserAccount';
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import JournalList from "../screens/JournalList";
import { createStackNavigator } from "@react-navigation/stack";

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const CustomTabBarButton = ({children, onPress}) => (
    <TouchableOpacity
    style={{
        top:-20,
        justifyContent:'center',
        alignItems:'center',
        ...styles.shadow
    }}
    onPress={onPress}>

        {/* These are the settings to change to change the check-in icon  */}
        <View
        style={{
            width:70,
            height:70,
            borderRadius:35,
            backgroundColor: '#e32f45',
            elevation: 7
        }}>
            {children}
            
            {/* The "bottom" setting is what chooses where the "Check in" text goes vertically */}
            <Text style={{ color: 'white', fontSize: 12, position:'absolute', bottom:10 }}>    Check in</Text>
        </View>
    </TouchableOpacity>
)

const Tabs = () => {
    return(
        
        <Tab.Navigator
        screenOptions = {{
            tabBarShowLabel:false,
            tabBarHideOnKeyboard: true,
            tabBarStyle: {
                position: 'absolute',
                bottom: 6,
                left: 14,
                right: 14,
                backgroundColor: "#ffffff",
                borderRadius:30,
                height: 65,
                ...styles.shadow}}}>

            <Tab.Screen name="Home" component={Home} 
            options={{
                //  this is what removes the header! 
                headerShown:false,
                tabBarIcon: ({focused}) => (
                    <View style= {{alignItems: 'center', justifyContent: 'center', top:10}}>
                        <Image
                        source={require('../assets/icons/home.png')}
                        resizeMode='contain'
                        style={{
                            width:25,
                            height:25,
                            tintColor: focused ? '#e32f45' : '#748c94',
                            marginTop: -15}}/>

                        {/* This is what shows on the navbar */}
                        <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>
                            Home
                            </Text>
                    </View>
                ), }} />

            <Tab.Screen name="JournalStack" component={JournalStack} options={{ 
                headerShown: false, 
                tabBarIcon: ({ focused }) => ( 
                <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}> 
                    <Image 
                    source={require('../assets/icons/diary.png')} 
                    resizeMode='contain' 
                    style={{ 
                        width: 25, 
                        height: 25, 
                        tintColor: focused ? '#e32f45' : '#748c94' ,
                        marginTop: -15
                    }} /> 
                    <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12 }}> 
                    Journal 
                    </Text> 
                </View> 
                ), 
            }} 
            />

            <Tab.Screen name="Checkin" component={Checkin}
                options={{headerShown:false, tabBarIcon: ({focused}) => (
                <Image source={require('../assets/icons/calendar.png')}
                    resizeMode="contain"
                    style={{
                        width:30,
                        height:30,
                        tintColor:'#fff',
                    marginTop: -11}}/>),
                tabBarButton: (props) => (
                    <CustomTabBarButton {...props}/>
                    
                )}}/>

            <Tab.Screen name="Library" component={Library}
            options={{
                headerShown:false,
                tabBarIcon: ({focused}) => (
                    <View style= {{alignItems: 'center', justifyContent: 'center', top:10}}>
                        <Image
                        source={require('../assets/icons/library.png')}
                        resizeMode='contain'
                        style={{
                            width:25,
                            height:25,
                            tintColor: focused ? '#e32f45' : '#748c94',
                            marginTop: -15
                        }}/>
                        <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>
                            Library
                            </Text>
                    </View>
                ),
            }} />

            <Tab.Screen name="Settings" component={UserAccount}
            options={{
                headerShown:false,
                tabBarIcon: ({focused}) => (
                    <View style= {{alignItems: 'center', justifyContent: 'center',top:10}}>
                        <Image
                        source={require('../assets/icons/settings.png')}
                        resizeMode='contain'
                        
                        style={{
                            width:25,
                            height:25,
                            tintColor: focused ? '#e32f45' : '#748c94',
                            marginTop: -15
                        }}/>
                        <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>
                            Account
                            </Text>
                    </View>
                ),
            }} />

        </Tab.Navigator>
        
    )
}

function JournalStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen 
          name="Journal" 
          component={Journal} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="JournalList" 
          component={JournalList} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }
  

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
        width: 0,
        height: 10, 
    },
    shadowOpacity: 0.35,
    shadowRadius: 4.5,
    elevation: 20
    }
});

export default Tabs;    