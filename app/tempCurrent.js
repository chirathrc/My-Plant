import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import icons
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import { router } from 'expo-router';

const CurrentTemperatureScreen = () => {
    const navigation = useNavigation(); // Initialize navigation
    const [isConnected, setIsConnected] = useState(true); // State for Wi-Fi connectivity
    const [temperature, setTemperature] = useState(null); // Temperature state
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        // Simulate fetching temperature data
        const fetchTemperature = () => {
            if (isConnected) {
                setTimeout(() => {
                    setTemperature(25); // Set temperature to 25°C for simulation
                    setLoading(false); // Stop loading after fetching
                }, 2000); // Simulate a network request delay
            } else {
                setTemperature(null); // Set to null if not connected
                setLoading(false); // Stop loading if not connected
            }
        };

        fetchTemperature();
    }, [isConnected]); // Fetch temperature when connection status changes

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

            {/* Loading Indicator */}
            <View style={styles.loadingContainer}>
                {loading ? (
                    <>
                        <ActivityIndicator size="large" color="#228B22" />
                        <Text style={styles.loadingText}>Loading Temperature...</Text>
                    </>
                ) : (
                    <Text style={styles.temperatureText}>
                        {isConnected ? `Current Temperature: ${temperature}°C` : 'Temperature: N/A'}
                    </Text>
                )}
            </View>

            {/* Back Button at Bottom */}
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="white" />
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    loadingText: {
        fontSize: 18,
        color: '#228B22',
        marginTop: 10,
    },
    temperatureText: {
        fontSize: 24,
        color: '#228B22',
        fontWeight: 'bold',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 40, // Spacing from other elements
        backgroundColor: '#228B22', // Style for back button
        padding: 10,
        borderRadius: 10,
        width: '60%',
        justifyContent: 'center',
    },
    backButtonText: {
        marginLeft: 10,
        fontSize: 18,
        color: 'white', // Text color
        fontWeight: 'bold',
    },
});

export default CurrentTemperatureScreen;
