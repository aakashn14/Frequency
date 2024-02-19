import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, TouchableOpacity, Alert } from 'react-native';

const client_id = '047f8ea696a0445abf64e1738a07ac71'; //change this to test on your own spotify dev account
const client_secret = 'd02b717f549c4ed29744df3059b7a342'; //change this to test on your own spotify dev account
global.Buffer = require('buffer').Buffer;

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

async function searchTracks(accessToken, query) {
    const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`;
    try {
        const response = await fetch(searchUrl, {
            headers: { 
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        const data = await response.json();
        console.log('Search API response:', data);
        return data.tracks.items;
    } catch(error) {
        console.error('Error searching tracks:', error);
        return [];
    }
}

//artists
async function searchArtists(accessToken, query) {
    const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist`;
    try {
        const response = await fetch(searchUrl, {
            headers: { 
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        const data = await response.json();
        console.log('Search Artist API response:', data);
        return data.artists.items;
    } catch(error) {
        console.error('Error searching artists:', error);
        return [];
    }
}

const SpotifyRanking = () => {
    const [trackSearchQuery, setTrackSearchQuery] = useState('');
    const [artistSearchQuery, setArtistSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedTracks, setSelectedTracks] = useState([]);
    const [selectedArtists, setSelectedArtists] = useState([]);

    const handleSearchTracks = async () => {
        try {
            const accessToken = await getAccessToken();
            const results = await searchTracks(accessToken, trackSearchQuery);
            setSearchResults(results);
        } catch(error) {
            console.error('Error searching tracks:', error);
        }
    };

    //artists
    const handleSearchArtists = async () => {
        try {
            const accessToken = await getAccessToken();
            const results = await searchArtists(accessToken, artistSearchQuery);
            setSelectedArtists(results);
        } catch(error) {
            console.error('Error searching artists:', error);
        }
    };

    const handleTrackSelection = (track) => {
        if(selectedTracks.length < 5) {
            setSelectedTracks([...selectedTracks, track]);
        } else {
            Alert.alert('You can only select up to 5 tracks.');
        }
    };

    return (
        <View>
            <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>Search Tracks:</Text>
            <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10}}
                placeholder="Enter track name"
                value={trackSearchQuery}
                onChangeText={setTrackSearchQuery}
            />
            <Button title="Search Tracks" onPress={handleSearchTracks}/>

            <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>Search Artists:</Text>
            <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10}}
                placeholder="Enter artist name"
                value={artistSearchQuery}
                onChangeText={setArtistSearchQuery}
            />
            <Button title="Search Artists" onPress={handleSearchArtists}/>

            <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10}}>Selected Tracks:</Text>
            <FlatList
                data={selectedTracks}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                        <Image
                            source={{uri: item.album.images[0].url}}
                            style={{width: 50, height: 50, marginRight: 10}}
                        />
                        <Text>{item.name} - {item.artists.map(artist => artist.name).join(', ')}</Text>
                    </View>
                )}
            />

            <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10}}>Search Results:</Text>
            <FlatList
                data={searchResults}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => handleTrackSelection(item)}>
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
            
            <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10}}>Selected Artists:</Text>
            <FlatList
                data={selectedArtists}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <View style={{marginBottom: 10}}>
                        <Text>{item.name}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default SpotifyRanking;
