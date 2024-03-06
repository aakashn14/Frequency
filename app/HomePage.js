import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, TouchableOpacity, Alert } from 'react-native';

const client_id = '047f8ea696a0445abf64e1738a07ac71'; //change this to test on your own spotify dev account
const client_secret = 'd02b717f549c4ed29744df3059b7a342'; //change this to test on your own spotify dev account
global.Buffer = require('buffer').Buffer;

//getAccessToken(): retrieves an access token for requests from the Spotify API using necessary authentication data.
async function getAccessToken() {
    const authUrl = 'https://accounts.spotify.com/api/token';
    const credentials = Buffer.from(client_id + ':' + client_secret).toString('base64');
    const bodyData = 'grant_type=client_credentials';

    try {
        const response = await fetch(authUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: bodyData
        });
        const data = await response.json();
        return data.access_token;
    } catch(error) {
        console.error('Error getting access token:', error.message);
        return null;
    }
}

async function getTrendingArtists(accessToken) {
    const trendingUrl = 'https://api.spotify.com/v1/browse/new-releases?limit=3';
    try {
        const response = await fetch(trendingUrl, {
            headers: { 
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        const data = await response.json();
        return data.albums.items.map(item => ({
            name: item.name,
            images: item.images,
        }));
    } catch(error) {
        console.error('Error getting trending artists:', error);
        return [];
    }
}

async function getTopSongsOfTheWeek(accessToken) {
    const topSongsUrl = 'https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF/tracks?limit=3';
    try {
        const response = await fetch(topSongsUrl, {
            headers: { 
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        const data = await response.json();
        return data.items.map(item => ({
            name: item.track.name,
            artists: item.track.artists,
            album: item.track.album,
        }));
    } catch(error) {
        console.error('Error getting top songs of the week:', error);
        return [];
    }
}

const HomePage = () => {
    const [trendingArtists, setTrendingArtists] = useState([]);
    const [topSongsOfTheWeek, setTopSongsOfTheWeek] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const accessToken = await getAccessToken();
            const trendingArtistsData = await getTrendingArtists(accessToken);
            const topSongsData = await getTopSongsOfTheWeek(accessToken);
            setTrendingArtists(trendingArtistsData);
            setTopSongsOfTheWeek(topSongsData);
        }
        fetchData();
    }, []);

    //Home page layout
    return (
        <View>
            <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>Trending Artists:</Text>
            <FlatList
                data={trendingArtists}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                renderItem={({item}) => (
                    <View style={{marginRight: 10}}>
                        <Image
                            source={{uri: item.images[0].url}}
                            style={{width: 100, height: 100, borderRadius: 50}}
                        />
                        <Text>{item.name}</Text>
                    </View>
                )}
            />

            <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10}}>Songs of the Week:</Text>
            <FlatList
                data={topSongsOfTheWeek}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => Alert.alert('Selected song', `Name: ${item.name}\nArtist: ${item.artists.map(artist => artist.name).join(', ')}\nAlbum: ${item.album.name}`)}>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                            <Image
                                source={{uri: item.album.images[0].url}}
                                style={{width: 50, height: 50, marginRight: 10}}
                            />
                            <Text>{item.name} - {item.artists.map(artist => artist.name).join(', ')}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default HomePage;
