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

/*searchTracks() and searchArtist(): searches for tracks and artists on Spotify by using the given query string to construct a search URL 
and sending a request to the Spotify API with the access token to retrieve relevant search results.*/
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

//SpotifyRanking: sets up states for managing search queries, search results, and selected tracks/artists.
const SpotifyRanking = () => {
    const [trackSearchQuery, setTrackSearchQuery] = useState('');
    const [artistSearchQuery, setArtistSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedTracks, setSelectedTracks] = useState([]);
    const [selectedArtists, setSelectedArtists] = useState([]);

    //handleSearchTracks() and handleSearchArtists(): calls searchTracks() and searchArtist() functions with the search queries.
    const handleSearchTracks = async () => {
        try {
            const accessToken = await getAccessToken();
            const results = await searchTracks(accessToken, trackSearchQuery);
            setSearchResults(results);
        } catch(error) {
            console.error('Error searching tracks:', error);
        }
    };

    const handleSearchArtists = async () => {
        try {
            const accessToken = await getAccessToken();
            const results = await searchArtists(accessToken, artistSearchQuery);
            setSelectedArtists(results);
        } catch(error) {
            console.error('Error searching artists:', error);
        }
    };

    //handleTrackSelection: adds user selected tracks to a list of up to 5 tracks.
    const handleTrackSelection = (track) => {
        if(selectedTracks.length < 5) {
            setSelectedTracks([...selectedTracks, track]);
        } else {
            Alert.alert('You can only select up to 5 tracks.');
        }
    };

    /*Inside the return statement, there are UI components for inputting text, 
    buttons to start searches, and lists for displaying search results and selected items.*/
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
