// LoadingScreen.js
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function App(){
   const fadeAnim = useRef(new Animated.Value(0)).current;

   useEffect(() => {
     Animated.timing(fadeAnim, {
       toValue: 1,
       duration: 2000,
       useNativeDriver: true,
     }).start();
   }, [fadeAnim]);

   const handleAnimationFinish = () => {
     // Trigger the function after 5 seconds
     setTimeout(() => {
       router.replace("/signIn");
     }, 1000);
   };

   return (
     <LinearGradient
       colors={['#32CD32', '#FFFFFF']}
       start={{ x: 0, y: 0 }}
       end={{ x: 0, y: 1 }}
       style={styles.container}
     >
       
       <StatusBar hidden={true} />
       <LottieView
         source={require('../assets/plant-loading-animation.json')} // Use .json Lottie animation file here
         autoPlay
         loop={false}
         style={styles.animation}
         onAnimationFinish={handleAnimationFinish}
       />
       <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
         My Plant Manager
       </Animated.Text>
       <Text style={styles.footerText}>My Plant Manager</Text>
     </LinearGradient>
   );
};

const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
   },
   animation: {
     width: 200,
     height: 200,
   },
   text: {
     color: '#4F7942', // Softer green to contrast with gradient
     fontSize: 24,
     fontWeight: '600',
     marginTop: 20,
   },
   footerText: {
     position: 'absolute',
     bottom: 30,
     fontSize: 14,
     color: '#4F7942',
   },
});

