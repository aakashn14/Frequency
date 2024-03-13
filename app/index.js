import React,{ useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';
import Logo from '../assets/images/frequency_logo/logo2.js';
import Twitter from '../assets/images/platform_logos/twitter.jsx';
import Instagram from '../assets/images/platform_logos/instagram.jsx';
import Facebook from '../assets/images/platform_logos/facebook.jsx';
import Google from '../assets/images/platform_logos/google.jsx';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Register = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1, justifyContent:'center', backgroundColor: '#24292f'}}>
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
                    color:'#8F929C',marginBottom:30,
                    }}>
                    Register
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
                        style={{marginRight: 5, color:'rgba(128,130,132,255)'}}/>
                    <TextInput
                        placeholder="Email ID"
                        placeholderTextColor={'rgba(128,130,132,255)'}
                        style={{flex: 1, paddingVertical: 0, color:'#3379b5'}}
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
                        style={{marginRight: 5, color:'rgba(128,130,132,255)'}}/>
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor={'rgba(128,130,132,255)'}
                        style={{flex: 1, paddingVertical: 0, color:'#3379b5'}}
                        secureTextEntry={true}
                    />
                </View>

                <TouchableOpacity 
                    onPress={() => navigation.replace('HomePage')}
                    style={{
                        backgroundColor:'#1fcafe',
                        borderColor:'#6cd5f5',
                        borderWidth:2,
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
                        Register
                    </Text>
                </TouchableOpacity>
                <Text 
                    style={{
                        textAlign:'center',
                        color:'rgba(153,157,160,255)',
                        marginBottom:30
                    }}>
                    Or, register with...
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
                            backgroundColor:'#1fcafe',
                            borderColor:'#6cd5f5',
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
                            backgroundColor:'#1fcafe',
                            borderColor:'#6cd5f5',
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
                            backgroundColor:'#1fcafe',
                            borderColor:'#6cd5f5',
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
                            backgroundColor:'#1fcafe',
                            borderColor:'#6cd5f5',
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
                    <Text style={{color:'rgba(153,157,160,255)',}}>Already Registered? </Text>
                    <TouchableOpacity onPress={() => navigation.replace('index')}>
                        <Text 
                            style={{
                                color:'#1fcafe',
                                fontWeight:'700'
                            }}>
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Register;
