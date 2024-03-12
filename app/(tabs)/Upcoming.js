import React, { useState, useCallback } from 'react';
import { View, TextInput, Button, FlatList, Text, Linking, StyleSheet, Image } from 'react-native';

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSearchPress = () => {
    // onSearch(`most recent news ${input}`); // news prefix
    onSearch(`"${input}" music news OR "latest updates" OR "exclusive interview" OR "album review" OR "new release" OR "live performance" OR "concert tour" OR "behind the scenes" OR "award nomination"`);
  };

  return (
    <View style={styles.header}>
      <TextInput
        style={styles.searchInput}
        value={input}
        onChangeText={setInput}
        placeholder="Enter artist name"
        returnKeyType="search"
        onSubmitEditing={handleSearchPress} // Trigger the search when the user submits the keyboard
      />
      <Button title="Search" onPress={handleSearchPress} />
    </View>
  );
};

const Upcoming = () => {
  const [results, setResults] = useState([]);

  const getSearchResults = useCallback(async (query) => {
    const apiKey = 'AIzaSyCZPtNrwxU5plviOh-E-o6ajpCCV3EO-gg'; // Use the provided API key
    const cx = 'b42de8df5ac8c4901'; // Use the provided Custom Search Engine ID
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(query)}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setResults(data.items.slice(0, 10)); // top 10 results
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <FlatList
      data={results}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={<SearchBar onSearch={getSearchResults} />}
      renderItem={({ item }) => (
        <View style={styles.card}>
          {item.pagemap?.cse_thumbnail?.length > 0 && (
            <Image
              style={styles.thumbnail}
              source={{ uri: item.pagemap.cse_thumbnail[0].src }}
            />
          )}
          <Text style={styles.title} onPress={() => Linking.openURL(item.link)}>
            {item.title}
          </Text>
          <Text style={styles.snippet}>{item.snippet}</Text>
        </View>
      )}
      contentContainerStyle={styles.listContentContainer}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    paddingTop: 50,
  },
  searchInput: {
    height: 40,
    borderColor: '#dddddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  listContentContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  snippet: {
    fontSize: 14,
  },
});

export default Upcoming;
