import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

class ComingSoon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatrooms: {},
      newChatroomName: '',
      isAddModalVisible: false,
      timers: {},
    };
  }

  addNewChatroom = () => {
    const { newChatroomName, chatrooms } = this.state;
    if (newChatroomName.trim() && !chatrooms[newChatroomName]) {
      const timerId = setInterval(() => this.updateTimer(newChatroomName), 1000);
      this.setState(prevState => ({
        chatrooms: {
          ...prevState.chatrooms,
          [newChatroomName]: [],
        },
        newChatroomName: '',
        isAddModalVisible: false,
        timers: {
          ...prevState.timers,
          [newChatroomName]: {
            timeLeft: 3600, 
            timerId: timerId, 
          }
        }
      }));
    } else {
      alert('Please enter a unique chatroom name.');
    }
  };

  updateTimer = (chatroomName) => {
    this.setState(prevState => {
      let timeLeft = prevState.timers[chatroomName].timeLeft - 1;
      if (timeLeft === 0) {
        clearInterval(prevState.timers[chatroomName].timerId);
      }
      return {
        timers: {
          ...prevState.timers,
          [chatroomName]: {
            ...prevState.timers[chatroomName],
            timeLeft: timeLeft,
          },
        },
      };
    });
  };

  renderChatroomButtons() {
    const { chatrooms, timers } = this.state;
    return Object.keys(chatrooms).map((chatroom) => (
      <TouchableOpacity 
        key={chatroom} 
        style={styles.chatroomButton}
      >
        <Text style={styles.chatroomButtonText}>{chatroom}</Text>
        <Text>{timers[chatroom] ? timers[chatroom].timeLeft : 'Loading...'}</Text>
      </TouchableOpacity>
    ));
  }

  render() {
    const { isAddModalVisible } = this.state;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isAddModalVisible}
          onRequestClose={() => {
            this.setState({ isAddModalVisible: false });
          }}
        >
          <View style={styles.modalView}>
            <TextInput
              placeholder="Chatroom Name"
              value={this.state.newChatroomName}
              onChangeText={(name) => this.setState({ newChatroomName: name })}
              style={styles.modalTextInput}
            />
            <Button
              title="Add Chatroom"
              onPress={this.addNewChatroom}
            />
          </View>
        </Modal>

        <View style={styles.chatroomSelection}>
          <Button title="Add" onPress={() => this.setState({ isAddModalVisible: true })} />
          <ScrollView>
            {this.renderChatroomButtons()}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  chatroomSelection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatroomButton: {
    width: 200,
    height: 100,
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e1e1e1', 
  },
  chatroomButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalView: {
    marginTop: '50%',
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTextInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 20,
    padding: 10,
  },

});

export default ComingSoon;
