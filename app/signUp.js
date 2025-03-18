import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ImageBackground,
    ActivityIndicator,
    TouchableOpacity,
    Animated,
    KeyboardAvoidingView,
    Platform,
    Modal
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

export default function SignUpScreen({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [otpModalVisible, setOtpModalVisible] = useState(false);
    const [otp, setOtp] = useState('');
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Fade in effect
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    const handleSignUp = () => {
        setLoading(true);
        setErrorMessage(''); // Reset error message
        // Simulate a network request
        setTimeout(() => {
            if (email && firstName && lastName && password) {
                // Show OTP modal for verification
                setOtpModalVisible(true);
            } else {
                setErrorMessage('Please fill in all fields');
            }
            setLoading(false);
        }, 2000);
    };

    const handleOtpSubmit = () => {
        // Handle OTP submission logic
        if (otp === '123456') { // Replace this with actual OTP validation logic
            console.log('OTP verified, signed up!');
            setOtpModalVisible(false);
            // Navigate to the main app screen or perform further actions
        } else {
            setErrorMessage('Invalid OTP, please try again.');
        }
    };

    // Function to determine input border color
    const getBorderColor = (value) => {
        if (errorMessage && !value) {
            return '#FF0000'; // Red border for error
        }
        return '#32CD32'; // Default border color
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ImageBackground
                source={require('../assets/background.jpg')} // Ensure background image is available at this path
                style={styles.background} // Use flex to cover the full screen
                resizeMode="cover" // Ensure the image covers the whole background
            >
                <StatusBar hidden={true} />
                <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
                    <Text style={styles.header}>Create an Account</Text>
                    <TextInput
                        style={[styles.input, { borderColor: getBorderColor(email) }]}
                        placeholder="Email"
                        placeholderTextColor="#7d7d7d"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        style={[styles.input, { borderColor: getBorderColor(firstName) }]}
                        placeholder="First Name"
                        placeholderTextColor="#7d7d7d"
                        value={firstName}
                        onChangeText={setFirstName}
                    />
                    <TextInput
                        style={[styles.input, { borderColor: getBorderColor(lastName) }]}
                        placeholder="Last Name"
                        placeholderTextColor="#7d7d7d"
                        value={lastName}
                        onChangeText={setLastName}
                    />
                    <TextInput
                        style={[styles.input, { borderColor: getBorderColor(password) }]}
                        placeholder="Password"
                        placeholderTextColor="#7d7d7d"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
                    {loading ? (
                        <ActivityIndicator size="large" color="#228B22" />
                    ) : (
                        <>
                            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                                <Text style={styles.buttonText}>Sign Up</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.backButton}
                                onPress={() => router.replace('/signIn')} // Navigate back to Sign In screen
                            >
                                <Text style={styles.backButtonText}>Back to Sign In</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </Animated.View>
            </ImageBackground>

            {/* OTP Modal */}
            <Modal
                transparent={true}
                visible={otpModalVisible}
                animationType="slide"
            >
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
};

const styles = StyleSheet.create({
    background: {
        flex: 1, // Ensure the background fills the entire container
        ...StyleSheet.absoluteFillObject, // Ensures it covers full screen
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
        borderWidth: 1,
    },
    button: {
        backgroundColor: '#228B22',
        padding: 15,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
    },
    backButton: {
        marginTop: 10,
        padding: 15,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#228B22',
    },
    backButtonText: {
        color: '#228B22',
        fontSize: 16,
        fontWeight: 'bold',
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
