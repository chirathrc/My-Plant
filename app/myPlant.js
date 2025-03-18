import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Animated,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; // Import icons
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import { router } from 'expo-router';

const MyPlantScreen = () => {
    const navigation = useNavigation(); // Initialize navigation
    const [isConnected, setIsConnected] = useState(true); // State for Wi-Fi connectivity
    const [waterLevel, setWaterLevel] = useState(50); // Initial water level (in percentage)
    const [isWatering, setIsWatering] = useState(false); // State for watering status
    const animatedWaterLevel = useState(new Animated.Value(0))[0];

    useEffect(() => {
        if (isConnected) {
            // Animate water level from 0 to the desired percentage
            Animated.timing(animatedWaterLevel, {
                toValue: waterLevel,
                duration: 2000,
                useNativeDriver: false,
            }).start();
        } else {
            setWaterLevel(0); // Set to 0 if not connected
            animatedWaterLevel.setValue(0); // Reset animation
        }
    }, [isConnected]); // Run when connection status changes

    const toggleWaterFlow = () => {
        setIsWatering(prev => !prev);
        if (!isWatering) {
            console.log("Watering started!");
        } else {
            console.log("Watering stopped!");
        }
    };

    const waterLevelText = isConnected ? `${waterLevel}%` : '0%';

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={isConnected ? '#228B22' : '#ff4d4d'} />

            {/* Top Wi-Fi Connectivity Status */}
            <View style={[styles.wifiStatusContainer, { backgroundColor: isConnected ? '#228B22' : '#ff4d4d' }]}>
                <MaterialIcons 
                    name={isConnected ? "wifi" : "wifi-off"} 
                    size={24} 
                    color={isConnected ? "green" : "red"} 
                />
                <Text style={[styles.wifiStatusText, { color: isConnected ? 'white' : 'red' }]}>
                    {isConnected ? "Connected" : "Disconnected"}
                </Text>
            </View>

            {/* Water Percentage Level */}
            <View style={styles.waterLevelContainer}>
                <Text style={styles.waterLevelText}>Water Level: <Text style={styles.waterPercentage}>{waterLevelText}</Text></Text>
                <Animated.View style={[styles.waterLevelBar, { width: animatedWaterLevel.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%']
                }) }]}>
                    <View style={styles.waterFill} />
                </Animated.View>
            </View>

            {/* Water Flow Button */}
            <TouchableOpacity style={styles.toggleButton} onPress={toggleWaterFlow}>
                <Ionicons name={isWatering ? "water" : "alert-circle"} size={48} color="white" />
                <Text style={styles.toggleButtonText}>{isWatering ? "Stop Watering" : "Start Watering"}</Text>
            </TouchableOpacity>

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
    waterLevelContainer: {
        marginTop: 30,
        alignItems: 'center',
        width: '80%',
    },
    waterLevelText: {
        fontSize: 24, // Increased font size
        color: '#228B22',
        fontWeight: 'bold',
    },
    waterPercentage: {
        fontSize: 36, // Larger font size for percentage
        color: '#228B22',
    },
    waterLevelBar: {
        height: 30,
        borderRadius: 5,
        backgroundColor: '#e0e0e0',
        overflow: 'hidden',
        width: '100%',
        marginTop: 10,
    },
    waterFill: {
        height: '100%',
        backgroundColor: '#228B22',
    },
    toggleButton: {
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#228B22',
        padding: 15,
        borderRadius: 10,
        width: '60%',
    },
    toggleButtonText: {
        marginTop: 10,
        fontSize: 16,
        color: 'white',
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

export default MyPlantScreen;
