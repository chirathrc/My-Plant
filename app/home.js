import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Image,
    Platform,
    PermissionsAndroid,
    Alert,
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons'; // Import icons
import { useNavigation } from '@react-navigation/native';
import * as NetInfo from '@react-native-community/netinfo';


const HomeScreen = () => {

    const navigation = useNavigation();
    const [isConnected, setIsConnected] = useState(false); // State for Wi-Fi connectivity


    useEffect(() => {
        // Subscribe to network state changes
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
            console.log(state.isConnected);
        });

        // Cleanup the listener on component unmount
        return () => unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={isConnected ? '#228B22' : '#ff4d4d'} />
            {/* Top Wi-Fi Connectivity Status */}
            <View style={[styles.wifiStatusContainer, { backgroundColor: isConnected ? '#228B22' : '#ff4d4d' }]}>
                <Ionicons
                    name={isConnected ? "wifi" : "wifi"}
                    size={24}
                    color={isConnected ? "green" : "red"}
                />
                <Text style={[styles.wifiStatusText, { color: isConnected ? 'white' : 'red' }]}>
                    {isConnected ? "Connected" : "Disconnected"}
                </Text>
            </View>

            {/* Main Topics */}
            <View style={styles.topicsContainer}>
                <TouchableOpacity
                    style={styles.topicButton}
                    onPress={() => navigation.navigate('myProfile')}
                >
                    <Ionicons name="person-circle" size={48} color="#228B22" />
                    <Text style={styles.topicText}>My Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.topicButton}
                    onPress={() => {
                        
                        if (isConnected) {
                            
                           navigation.navigate('myPlant'); 
                        } else {
                            
                            Alert.alert("Waring", "Connect Your Network First");

                        }
                    }
                    }
                >
                    <Ionicons name="leaf" size={48} color="#228B22" />
                    <Text style={styles.topicText}>My Plant</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.topicButton}
                    onPress={() => navigation.navigate('tempCurrent')}
                >
                    <Ionicons name="thermometer" size={48} color="#228B22" />
                    <Text style={styles.topicText}>Current Temperature</Text>
                </TouchableOpacity>
            </View>

            {/* Logo Section */}
            <View style={styles.logoContainer}>
                {/* <Image
                    source={require('../assets/plant.png')} // Make sure to have your logo image in this path
                    style={styles.logo}
                /> */}
                <Text style={styles.logoText}>My Plant Manager</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f5f5f5', // Light background
    },
    wifiStatusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        width: '100%',
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',
    },
    wifiStatusText: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    topicsContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap', // Allow wrapping for grid layout
        justifyContent: 'space-evenly', // Evenly distribute buttons
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
        paddingHorizontal: 10, // Add padding to the sides
    },
    topicButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
        margin: 10, // Space between buttons
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        width: '40%', // Set a width for better grid alignment
    },
    topicText: {
        marginTop: 10,
        fontSize: 16,
        color: '#228B22',
        textAlign: 'center',
        fontWeight: '600', // Make the font slightly bolder
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20, // Space from the bottom
        paddingVertical: 10, // Add padding around the logo
    },
    logo: {
        width: 100, // Adjust the size of your logo
        height: 100,
        resizeMode: 'contain', // Maintain aspect ratio
    },
    logoText: {
        marginTop: 5,
        fontSize: 18,
        color: '#228B22',
        fontWeight: 'bold',
    },
});

export default HomeScreen;
