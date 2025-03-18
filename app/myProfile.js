import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import icons
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyProfileScreen = () => {
    const navigation = useNavigation(); // Initialize navigation
    const [isConnected, setIsConnected] = useState(true); // State for Wi-Fi connectivity
    const [userDetails, setUserDetails] = useState("");

    useEffect(() => {

        async function getUser() {
            const data = JSON.parse(await AsyncStorage.getItem("user"));
            setUserDetails(data);
        }

        getUser();

    });

    // Sample user data (in a real application, this might come from an API or state management)
    const user = {
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
    };

    // Logout function
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem("user"); // Clear user data from AsyncStorage
            router.replace("/signIn"); // Navigate to SignIn or any other login screen
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={isConnected ? '#228B22' : '#ff4d4d'} />

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

            {/* Profile Information */}
            <View style={styles.profileContainer}>
                <Text style={styles.profileText}>First Name: {user.firstName}</Text>
                <Text style={styles.profileText}>Last Name: {user.lastName}</Text>
                <Text style={styles.profileText}>Email: {user.email}</Text>
            </View>

            {/* Buttons at Bottom */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Ionicons name="log-out" size={24} color="white" />
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
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
        padding: 20, // Added padding
    },
    wifiStatusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        width: '100%',
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',
        marginBottom: 20, // Increased spacing
    },
    wifiStatusText: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    profileContainer: {
        marginTop: 30,
        alignItems: 'flex-start', // Align to the left
        width: '100%',
        padding: 10, // Added padding for better layout
        borderRadius: 5,
        backgroundColor: 'white', // Background color for profile information
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
    },
    profileText: {
        fontSize: 18,
        color: '#228B22',
        marginVertical: 5, // Vertical spacing between lines
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 40, // Spacing from other elements
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#228B22', // Style for back button
        padding: 10,
        borderRadius: 10,
        width: '45%',
        justifyContent: 'center',
    },
    backButtonText: {
        marginLeft: 10,
        fontSize: 18,
        color: 'white', // Text color
        fontWeight: 'bold',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ff4d4d', // Style for logout button
        padding: 10,
        borderRadius: 10,
        width: '45%',
        justifyContent: 'center',
    },
    logoutButtonText: {
        marginLeft: 10,
        fontSize: 18,
        color: 'white', // Text color
        fontWeight: 'bold',
    },
});

export default MyProfileScreen;
