import React,{ useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { Stack, useRouter, Link, useNavigation } from 'expo-router';

import Logo from '../assets/images/frequency_logo/logo.js';
import Twitter from '../assets/images/platform_logos/twitter.jsx';
import Instagram from '../assets/images/platform_logos/instagram.jsx';
import Facebook from '../assets/images/platform_logos/facebook.jsx';
import Google from '../assets/images/platform_logos/google.jsx';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Login = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const checkTokenValidity = async () => {
            const accessToken = await AsyncStorage.getItem("token");
            const expirationDate = await AsyncStorage.getItem("expirationDate");
            console.log("access token", accessToken);
            console.log("expiration date", expirationDate);
            
            if (accessToken && expirationDate) {
                const currentTime = Date.now();
                if (currentTime < parseInt(expirationDate)) {
                    navigation.navigate("SpotifyRankings");
                }
                else {
                    AsyncStorage.removeItem("token");
                    AsyncStorage.removeItem("expirationDate");
                }
            }
        }
    },[])
    async function authenticate () {
        const config = {
            issuer:"https://accounts.spotify.com",
            client_id:"047f8ea696a0445abf64e1738a07ac71",
            scopes: [
                "user-read-email",
                "user-library-read",
                "user-read-recently-played",
                "user-top-read",
                "playlist-read-private",
                "playlist-read-collaborative",
                "playlist-modify-public"
            ],
            redirectURI:"exp://localhost:192.168.1.83:8081"
        }
        const result = await fetch(config);
        console.log(result);
        if (result.accessToken) {
            console.log(accessToken);
            const expirationDate = new Date(result.accessTokenExpirationDate).getTime();
            AsyncStorage.setItem("token", result.accessToken);
            AsyncStorage.setItem("expirationDate", expirationDate.toString());
            navigation.navigate("SpotifyRankings");
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, justifyContent:'center'}}>
            <View style={{paddingHorizontal:25}}>
                <View style={{alignItems: 'center'}}>
                    <Logo
                        height={200}
                        width={200}
                    />
                </View>

                <Text style={{
                    fontFamily: 'RMMedium',
                    fontSize:28, fontWeight:'500',
                    color:'#333',marginBottom:30,
                    }}>
                    Login
                </Text>

                <View 
                    style={{
                        flexDirection:'row',
                        borderBottomColor:'#ccc',
                        borderBottomWidth:1,
                        paddingBottom: 8,
                        marginBottom: 25,
                    }}>
                    <MaterialIcons 
                        name="alternate-email" 
                        size={20} color="#666" 
                        style={{marginRight: 5}}/>
                    <TextInput
                        placeholder="Email ID"
                        style={{flex: 1, paddingVertical: 0}}
                        keyboardType="email-address" 
                    />
                </View>

                <View 
                    style={{
                        flexDirection:'row',
                        borderBottomColor:'#ccc',
                        borderBottomWidth:1,
                        paddingBottom: 8,
                        marginBottom: 25,
                    }}>
                    <Ionicons 
                        name="lock-closed-outline"
                        size={20} color="#666" 
                        style={{marginRight: 5}}/>
                    <TextInput
                        placeholder="Password"
                        style={{flex: 1, paddingVertical: 0}}
                        secureTextEntry={true}
                    />
                    <TouchableOpacity onPress={() => {}}>
                        <Text style={{fontWeight:'700'}}>Forgot?</Text>
                    </TouchableOpacity>
                </View>
                <Link href="/HomePage" asChild>
                    <TouchableOpacity //h
                        onPress={() => navigation.navigate('HomePage')}
                        style={{
                            backgroundColor:'#AD40AF',
                            padding:20,
                            borderRadius:10,
                            marginBottom:30
                        }}>
                        <Text 
                            style={{
                                textAlign:'center',
                                fontWeight:'700',
                                fontSize:16,
                                color:'#fff'
                            }}>
                            Login
                        </Text>
                    </TouchableOpacity>
                </Link>
                <Text 
                    style={{
                        textAlign:'center',
                        color:'#666',
                        marginBottom:30
                    }}>
                    Or, login with...
                </Text>
                <View 
                    style={{
                        flexDirection:'row',
                        justifyContent:'space-between',
                        marginBottom:30
                    }}>
                    <TouchableOpacity 
                        onPress={() => {}} 
                        style={{
                            borderColor:'#ddd',
                            borderWidth:2,
                            borderRadius:10,
                            paddingHorizontal:30,
                            paddingVertical:10
                        }}>
                        <Facebook height={24} width={24} />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => {}} 
                        style={{
                            borderColor:'#ddd',
                            borderWidth:2,
                            borderRadius:10,
                            paddingHorizontal:30,
                            paddingVertical:10
                        }}>
                        <Google height={24} width={24} />
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        onPress={() => {}} 
                        style={{
                            borderColor:'#ddd',
                            borderWidth:2,
                            borderRadius:10,
                            paddingHorizontal:30,
                            paddingVertical:10
                        }}>
                        <Instagram height={24} width={24} />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => {}} 
                        style={{
                            borderColor:'#ddd',
                            borderWidth:2,
                            borderRadius:10,
                            paddingHorizontal:30,
                            paddingVertical:10
                        }}>
                        <Twitter height={24} width={24} />
                    </TouchableOpacity>
                </View>

                <View 
                    style={{
                        flexDirection:'row',
                        justifyContent:'center',
                        marginBottom:30
                    }}>
                    <Text>New to the app? </Text>
                    <TouchableOpacity onPress={() => router.push('register')}>
                        <Text 
                            style={{
                                color:'#AD40AF',
                                fontWeight:'700'
                            }}>
                            Register
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Login;