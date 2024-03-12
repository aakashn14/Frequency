import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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

async function getPopularArtists(accessToken) {
  const popularArtistsUrl = 'https://api.spotify.com/v1/browse/new-releases?limit=50'; //new releases
  try {
      const response = await fetch(popularArtistsUrl, {
          headers: { 
              'Authorization': `Bearer ${accessToken}`,
          },
      });
      const data = await response.json();
      return data.albums.items.map(item => ({
          name: item.artists[0].name,
          image: item.images[0].url,
          spotifyId: item.artists[0].id
      }));
  } catch(error) {
      console.error('Error getting popular artists:', error);
      return [];
  }
}

const ArtistGridItem = ({ artist }) => {
  const handlePress = () => {
    const spotifyUrl = `https://open.spotify.com/artist/${artist.spotifyId}`;
    Linking.openURL(spotifyUrl);
  };

  return (
    <TouchableOpacity style={styles.gridItem} onPress={handlePress}>
      <Image source={{ uri: artist.image }} style={styles.artistImage} />
      <View style={styles.nameContainer}>
        <Text style={styles.artistName}>{artist.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Artists = () => {
  const [popularArtists, setPopularArtists] = useState([]);

  useEffect(() => {
      async function fetchData() {
          const accessToken = await getAccessToken();
          const popularArtistsData = await getPopularArtists(accessToken);
          setPopularArtists(popularArtistsData);
      }
      fetchData();
  }, []);

  return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.title}>Browse Top Artists:</Text>
        <FlatList
          data={popularArtists}
          renderItem={({ item }) => <ArtistGridItem artist={item} />}
          keyExtractor={(item) => item.name}
          numColumns={3}
          contentContainerStyle={styles.grid}
        />
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  safeArea: {
      flex: 1, 
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  grid: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  gridItem: {
    flex: 1,
    margin: 10,
    aspectRatio: 1, // item is a square
    justifyContent: 'center', // Center the content vertically 
    alignItems: 'center', // Center the content horizontally 
  },
  artistImage: {
    width: '100%', // full width of the grid item
    aspectRatio: 1, // a square
    height: '85%',
    resizeMode: 'cover', // image covers the square without stretching
  },
  nameContainer: {
    backgroundColor: 'white',
    width: '100%',
    padding: 5,
    alignItems: 'center', //  text is centered within the name container
  },
  artistName: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
  },
});  

export default Artists;
