import React, { Component } from 'react';
import { 
  Text, 
  View, 
  TextInput, 
  Button, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  ImageBackground,
  Modal
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

class Live extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username || "Anonymous",
      text: '',
      messages: {},
      chatrooms: {
        'Kanye': [],
        'Travis Scott': [],
        'Drake': [],
      },
      currentChatroom: null,
      isAddModalVisible: false,
      newChatroomName: '',
      error: "none",
    };
  }

  handleTextChange = (text) => {
    this.setState({ text });
  };

  sendMessage = () => {
    const { text, currentChatroom, messages } = this.state;
    if (text.trim() && currentChatroom) {
      const newMessage = { username: this.state.username, message: text };
      const updatedMessages = messages[currentChatroom]
        ? [...messages[currentChatroom], newMessage]
        : [newMessage];

      this.setState(prevState => ({
        messages: {
          ...prevState.messages,
          [currentChatroom]: updatedMessages,
        },
        text: '',
      }));
    }
  };

  selectChatroom = (chatroom) => {
    this.setState({ currentChatroom: chatroom });
  };

  leaveChatroom = () => {
    this.setState({ currentChatroom: null });
  };
  

  addNewChatroom = () => {
    const { newChatroomName, chatrooms } = this.state;
    if (newChatroomName.trim() && !chatrooms[newChatroomName]) {
      this.setState(prevState => ({
        chatrooms: {
          ...prevState.chatrooms,
          [newChatroomName]: [],
        },
        messages: {
          ...prevState.messages,
          [newChatroomName]: [],
        },
        newChatroomName: '',
        isAddModalVisible: false,
      }));
    } else {
      alert('Please enter a unique chatroom name.');
    }
  };

  renderChatroomButtons() {
    return Object.keys(this.state.chatrooms).map((chatroom) => (
      <TouchableOpacity 
        key={chatroom} 
        style={styles.chatroomButton} 
        onPress={() => this.selectChatroom(chatroom)}
      >
        <Text style={styles.chatroomButtonText}>{chatroom}</Text>
      </TouchableOpacity>
    ));
  }

  renderChatroomView() {
    const { currentChatroom, messages } = this.state;
    return (
      <View style={styles.chatroomContainer}>
        {/* Leave button */}
        <Button title="Leave" onPress={this.leaveChatroom} style={styles.leaveButton} />
  
        <ScrollView style={styles.messageContainer}>
          {messages[currentChatroom] && messages[currentChatroom].map((msg, index) => (
            <View key={index} style={styles.messageBubble}>
              <Text style={styles.messageUsername}>{msg.username}</Text>
              <Text>{msg.message}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={this.state.text}
            onChangeText={this.handleTextChange}
            placeholder="Type a message..."
          />
          <Button title="Send" onPress={this.sendMessage} />
        </View>
      </View>
    );
  }
  

  render() {
    const { currentChatroom, isAddModalVisible } = this.state;

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

        {currentChatroom ? (
          this.renderChatroomView()
        ) : (
          <View style={styles.chatroomSelection}>
            <Button title="Add" onPress={() => this.setState({ isAddModalVisible: true })} />
            {this.renderChatroomButtons()}
          </View>
        )}
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
        overflow: 'hidden',
    },
    chatroomButtonImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chatroomButtonImageStyle: {
        borderRadius: 10,
    },
    chatroomButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 5,
    },
});

export default Live;

