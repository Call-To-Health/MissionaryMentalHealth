import { createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Home from '../screens/Home';
import Chat from '../screens/Chat';
import Library from '../screens/Library';
import Journal from "../screens/Journal";
import UserAccount from '../screens/UserAccount';
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => (
    <TouchableOpacity
    style={{
        top:-20,
        justifyContent:'center',
        alignItems:'center',
        ...styles.shadow
    }}
    onPress={onPress}>

        {/* These are the settings to change to change the diary icon  */}
        <View
        style={{
            width:70,
            height:70,
            borderRadius:35,
            backgroundColor: '#e32f45',
            elevation: 8
        }}>
            {children}
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
                bottom: 8,
                left: 15,
                right: 15,
                backgroundColor: "#ffffff",
                borderRadius:22,
                height: 75,
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
                            tintColor: focused ? '#e32f45' : '#748c94'}}/>

                        {/* This is what shows on the navbar */}
                        <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>
                            Home
                            </Text>
                    </View>
                ), }} />

            <Tab.Screen name="Chat" component={Chat}
            options={{
                tabBarIcon: ({focused}) => (
                    <View style= {{alignItems: 'center', justifyContent: 'center', top:10}}>
                        <Image
                        source={require('../assets/icons/chat.png')}
                        resizeMode='contain'
                        style={{
                            width:25,
                            height:25,
                            tintColor: focused ? '#e32f45' : '#748c94'
                        }}/>
                        <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>
                            Chat
                            </Text>
                    </View>
                ),
            }} 
            />

            <Tab.Screen name="Journal" component={Journal}
            options={{
                tabBarIcon: ({focused}) => (
                <Image source={require('../assets/icons/diary.png')} resizeMode="contain"
                    style={{
                        width:30,
                        height:30,
                        tintColor:'#fff'
                }}
                />
                ),
                tabBarButton: (props) => (
                    <CustomTabBarButton {...props}/>
                )
            }}
            />

            <Tab.Screen name="Library" component={Library}
            options={{
                tabBarIcon: ({focused}) => (
                    <View style= {{alignItems: 'center', justifyContent: 'center', top:10}}>
                        <Image
                        source={require('../assets/icons/library.png')}
                        resizeMode='contain'
                        style={{
                            width:25,
                            height:25,
                            tintColor: focused ? '#e32f45' : '#748c94'
                        }}/>
                        <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>
                            Library
                            </Text>
                    </View>
                ),
            }} />

            <Tab.Screen name="Settings" component={UserAccount}
            options={{
                
                tabBarIcon: ({focused}) => (
                    <View style= {{alignItems: 'center', justifyContent: 'center',top:10}}>
                        <Image
                        source={require('../assets/icons/settings.png')}
                        resizeMode='contain'
                        
                        style={{
                            width:25,
                            height:25,
                            tintColor: focused ? '#e32f45' : '#748c94'
                        }}/>
                        <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>
                            Settings
                            </Text>
                    </View>
                ),
            }} />

        </Tab.Navigator>
        
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
        width: 0,
        height: 10, 
    },
    shadowOpacity: 0.45,
    shadowRadius: 6.5,
    elevation: 20
    }
});

export default Tabs;    