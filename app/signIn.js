import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, ActivityIndicator, TouchableOpacity, Animated, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignInScreen() {
    const navigation = useNavigation(); // Get navigation object
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [otpModalVisible, setOtpModalVisible] = useState(false); // State for OTP modal
    const [otp, setOtp] = useState(''); // State for OTP input
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {

        async function checkUser() {
            if (await AsyncStorage.getItem("user") != null) {
                router.replace("/home");
            }
        }

        checkUser();
        
        // Fade in effect
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    const handleSignIn = async () => {
        setLoading(true);
        setErrorMessage(''); // Reset error message
        setTimeout(async () => {
            if (email != "" && password != "") {
                const response = await fetch("http://192.168.1.2:8080/SoilApp/SignIn?email=" + email + "&password=" + password);

                if (response.ok) {
                    let data = await response.json();

                    console.log(data.user);

                    if (data.success) {
                        await AsyncStorage.setItem("user", JSON.stringify(data.user));
                        router.replace("/home");
                    } else {
                        setErrorMessage(data.msg);
                    }
                } else {
                    setErrorMessage("Something Went Wrong! Please Try Again Later.");
                }
            } else {
                setErrorMessage('Invalid email or password');
            }
            setLoading(false);
        }, 2000);
    };

    const handleOtpSubmit = () => {
        if (otp === '123456') { // Replace with actual OTP validation logic
            console.log('OTP verified, signed in!');
            setOtpModalVisible(false);
        } else {
            setErrorMessage('Invalid OTP, please try again.');
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            {/* <ImageBackground
                source={require('../assets/background.jpg')} // Ensure the background image is available at this path
                style={styles.background}
                resizeMode="cover"
            > */}
                <StatusBar hidden={true} />
                <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
                    <Text style={styles.header}>Welcome to My Plant Manager</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#7d7d7d"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        keyboardType='number-pad'
                        placeholderTextColor="#7d7d7d"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
                    {loading ? (
                        <ActivityIndicator size="large" color="#228B22" />
                    ) : (
                        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                            <Text style={styles.buttonText}>Sign In</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity
                        style={styles.registerButton}
                        onPress={() => navigation.navigate("signUp")} // Navigate to Register screen
                    >
                        <Text style={styles.registerText}>Did not register?</Text>
                    </TouchableOpacity>
                </Animated.View>
            {/* </ImageBackground> */}

            <Modal transparent={true} visible={otpModalVisible} animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalHeader}>Enter OTP</Text>
                        <TextInput
                            style={styles.otpInput}
                            placeholder="OTP"
                            placeholderTextColor="#7d7d7d"
                            keyboardType="number-pad"
                            value={otp}
                            onChangeText={setOtp}
                        />
                        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
                        <TouchableOpacity style={styles.modalButton} onPress={handleOtpSubmit}>
                            <Text style={styles.buttonText}>Submit OTP</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        ...StyleSheet.absoluteFillObject,
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
    },
    header: {
        fontSize: 32,
        color: '#ffffff',
        fontWeight: 'bold',
        marginBottom: 40,
        textAlign: 'center',
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 12,
        borderRadius: 8,
        marginBottom: 20,
        width: '100%',
        color: '#000',
        borderColor: '#32CD32',
        borderWidth: 1,
    },
    button: {
        backgroundColor: '#228B22',
        padding: 15,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
    },
    registerButton: {
        marginTop: 20,
    },
    registerText: {
        color: '#ffffff',
        fontSize: 16,
        textAlign: 'center',
    },
    error: {
        color: '#FF0000',
        marginBottom: 10,
        textAlign: 'center',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalHeader: {
        fontSize: 24,
        marginBottom: 20,
    },
    otpInput: {
        width: '100%',
        padding: 12,
        borderRadius: 8,
        marginBottom: 20,
        borderColor: '#32CD32',
        borderWidth: 1,
        color: '#000',
    },
    modalButton: {
        backgroundColor: '#228B22',
        padding: 15,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
    },
});
