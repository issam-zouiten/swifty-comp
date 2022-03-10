import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../Home';
import ProfileScreen from './profile';
import ProjectsScreen from './projects';
import AchievementsScreen from './achievements';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createMaterialTopTabNavigator();


export default function Index({ route }) {
    const { userData } = route.params;
    console.log(userData)
    return (
        <Tab.Navigator
            initialRouteName="Profile"
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                tabBarStyle: {
                    elevation: 0,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    height: 70,
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    } else if (route.name === 'Projects') {
                        iconName = focused ? 'briefcase' : 'briefcase-outline';
                    } else if (route.name === 'Achievements') {
                        iconName = focused ? 'wallet' : 'wallet-outline';
                    } else if (route.name === 'Home') {
                        iconName = focused ? 'search' : 'search-outline';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={25} color={color} />;
                },
                tabBarActiveTintColor: 'orange',
                tabBarInactiveTintColor: 'gray',
            })
            }
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} initialParams={{ userData: userData }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} initialParams={{ userData: userData }} />
            <Tab.Screen name="Projects" component={ProjectsScreen} options={{ headerShown: false }} initialParams={{ userData: userData }} />
            <Tab.Screen name="Achievements" component={AchievementsScreen} options={{ headerShown: false }} initialParams={{ userData: userData }} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        padding: 10,
    },
 
    Button: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80vw'
    },
});