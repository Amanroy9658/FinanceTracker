import React, { useEffect, useRef } from 'react';
import { 
    View, 
    Text, 
    Animated, 
    Easing,
    Dimensions,
    StatusBar
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const AppLoadingScreen = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
                easing: Easing.out(Easing.cubic),
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 40,
                friction: 7,
                useNativeDriver: true,
            }),
        ]).start();

        // Continuous wallet rotation animation
        const rotateAnimation = Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 4000,
                useNativeDriver: true,
                easing: Easing.inOut(Easing.ease),
            })
        );

        // Pulse animation for dots
        const pulseAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 0.5,
                    duration: 800,
                    useNativeDriver: true,
                    easing: Easing.inOut(Easing.ease),
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                    easing: Easing.inOut(Easing.ease),
                }),
            ])
        );

        rotateAnimation.start();
        pulseAnimation.start();

        return () => {
            rotateAnimation.stop();
            pulseAnimation.stop();
        };
    }, []);

    const spin = rotateAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['-10deg', '10deg', '-10deg'],
    });

    return (
        <LinearGradient
            colors={['#0A0A0A', '#1A1A1A', '#0A0A0A']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            className="flex-1"
        >
            <StatusBar barStyle="light-content" />
            <View className="flex-1 justify-center items-center px-6">
                {/* Background Pattern - Financial Symbols */}
                <View className="absolute inset-0 opacity-[0.03]">
                    <View className="flex-1 flex-row flex-wrap justify-around items-center">
                        {[...Array(24)].map((_, i) => (
                            <View key={i} className="m-6">
                                <Icon name="business-outline" size={24} color="#FFF" />
                            </View>
                        ))}
                    </View>
                </View>

            {/* Main Loading Card */}
            <Animated.View 
                style={{
                    opacity: fadeAnim,
                    transform: [{ scale: scaleAnim }]
                }}
                className="bg-[#1D1B1B]/80 backdrop-blur-md border border-[#2A2A2A] rounded-[40px] p-10 shadow-2xl w-full max-w-sm mx-auto"
            >
                {/* Brand Section */}
                <View className="items-center mb-10">
                    <View className="bg-white/5 rounded-3xl p-5 mb-5 border border-white/10">
                        <Animated.View
                            style={{
                                transform: [{ rotate: spin }],
                            }}
                        >
                            <Icon name="wallet-outline" size={48} color="#69CDB9" />
                        </Animated.View>
                    </View>
                    
                    <Text 
                        style={{ fontFamily: 'Lexend-Bold' }}
                        className="text-3xl text-white text-center mb-2 tracking-tight"
                    >
                        Ledger
                    </Text>
                    <Text 
                        style={{ fontFamily: 'Poppins-Regular' }}
                        className="text-xs text-[#A3A3A3] text-center leading-5 uppercase tracking-[2px]"
                    >
                        Secure • Smart • Modern
                    </Text>
                </View>

                {/* Loading Status */}
                <View className="items-center mb-10">
                    <Text 
                        style={{ fontFamily: 'Poppins-Medium' }}
                        className="text-base text-white/90 mb-4"
                    >
                        Analyzing your wealth...
                    </Text>
                    
                    {/* Animated Dots */}
                    <View className="flex-row gap-x-3">
                        {[0, 1, 2].map((index) => (
                            <Animated.View
                                key={index}
                                style={{
                                    opacity: pulseAnim,
                                    transform: [{ scale: pulseAnim }],
                                }}
                                className="w-2 h-2 bg-[#69CDB9] rounded-full"
                            />
                        ))}
                    </View>
                </View>

                {/* Features Icons - Finance Version */}
                <View className="flex-row justify-around items-center pt-6 border-t border-white/5">
                    <View className="items-center">
                        <View className="bg-[#69CDB9]/10 rounded-2xl p-3 mb-2">
                            <Icon name="shield-checkmark-outline" size={20} color="#69CDB9" />
                        </View>
                        <Text 
                            style={{ fontFamily: 'Poppins-Medium' }}
                            className="text-[10px] text-[#A3A3A3] uppercase tracking-wider"
                        >
                            Secure
                        </Text>
                    </View>
                    
                    <View className="items-center">
                        <View className="bg-blue-500/10 rounded-2xl p-3 mb-2">
                            <Icon name="pie-chart-outline" size={20} color="#3b82f6" />
                        </View>
                        <Text 
                            style={{ fontFamily: 'Poppins-Medium' }}
                            className="text-[10px] text-[#A3A3A3] uppercase tracking-wider"
                        >
                            Insights
                        </Text>
                    </View>
                    
                    <View className="items-center">
                        <View className="bg-purple-500/10 rounded-2xl p-3 mb-2">
                            <Icon name="trending-up-outline" size={20} color="#8b5cf6" />
                        </View>
                        <Text 
                            style={{ fontFamily: 'Poppins-Medium' }}
                            className="text-[10px] text-[#A3A3A3] uppercase tracking-wider"
                        >
                            Growth
                        </Text>
                    </View>
                </View>
            </Animated.View>

            {/* Bottom Insight Text */}
            <Animated.View style={{ opacity: fadeAnim }} className="mt-12 px-10">
                <Text 
                    style={{ fontFamily: 'Poppins-Regular' }}
                    className="text-center text-[#555] text-[11px] leading-5 italic"
                >
                    "Your personal financial companion, securing every transaction with precision."
                </Text>
            </Animated.View>
            </View>
        </LinearGradient>
    );
};

export default AppLoadingScreen;