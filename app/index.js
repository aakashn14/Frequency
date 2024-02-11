import React from 'react';
import { View } from 'react-native';
import SpotifyRanking from './SpotifyRanking';

const App = () => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <SpotifyRanking/>
        </View>
    );
}

export default App;
