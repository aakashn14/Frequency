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
  Modal,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, database } from '../firebaseConfig';
import { ref, push, onValue, off } from 'firebase/database';

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

  componentDidMount() {
    const user = auth.currentUser;
    if (user) {
      this.setState({ username: user.email });
    } else {
      console.log('No authenticated user, navigate to login');
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // current chatroom has changed
    if (this.state.currentChatroom !== prevState.currentChatroom) {
      // if leaving a chatroom, remove the listener from the old chatroom
      if (prevState.currentChatroom) {
        const prevChatroomRef = ref(database, 'chatrooms/' + prevState.currentChatroom);
        off(prevChatroomRef);
      }

      // if joining a new chatroom, set up a listener for the new chatroom
      if (this.state.currentChatroom) {
        const chatroomRef = ref(database, 'chatrooms/' + this.state.currentChatroom);
        onValue(chatroomRef, (snapshot) => {
          if (snapshot.exists()) {
            this.setState({
              messages: {
                ...this.state.messages,
                [this.state.currentChatroom]: Object.values(snapshot.val())
              }
            });
          } else {
            this.setState({
              messages: {
                ...this.state.messages,
                [this.state.currentChatroom]: []
              }
            });
          }
        });
      }
    }
  }

  componentWillUnmount() {
    //  listeners  removed when the component unmounts
    if (this.state.currentChatroom) {
      const chatroomRef = ref(database, 'chatrooms/' + this.state.currentChatroom);
      off(chatroomRef);
    }
  }

  handleTextChange = (text) => {
    this.setState({ text });
  };

  sendMessage = () => {
    const { text, currentChatroom } = this.state;
    if (text.trim() && currentChatroom) {
      const newMessage = { username: this.state.username, message: text };
      const chatroomRef = ref(database, 'chatrooms/' + currentChatroom);
      push(chatroomRef, newMessage);

      this.setState({ text: '' });
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
        <TouchableOpacity
          onPress={this.leaveChatroom}
          style={{
              backgroundColor:'#cf5906',
              padding:20,
              borderRadius:10,
              marginBottom:30
          }}>
          <Text 
              style={{
                  textAlign:'center',
                  fontWeight:'700',
                  fontSize:16,
                  color: '#000',
              }}>
              Leave
          </Text>
        </TouchableOpacity>
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
      <SafeAreaView style={{ flex: 1, backgroundColor: '#24292f', }}>
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
              placeholderTextColor={'rgba(128,130,132,255)'}
              value={this.state.newChatroomName}
              onChangeText={(name) => this.setState({ newChatroomName: name })}
              style={styles.modalTextInput}
            />
            <TouchableOpacity
              onPress={this.addNewChatroom}
              style={{
                backgroundColor:'#cf5906',
                padding:20,
                borderRadius:10,
                marginBottom:30
              }}>
              <Text 
                style={{
                    textAlign:'center',
                    fontWeight:'700',
                    fontSize:16,
                    color: '#000',
                }}>
                Add Chatroom
              </Text>
              </TouchableOpacity>
          </View>
        </Modal>

        {currentChatroom ? (
          this.renderChatroomView()
        ) : (
          <View style={styles.chatroomSelection}>
            <TouchableOpacity
              onPress={() => this.setState({ isAddModalVisible: true })}
              style={{
                backgroundColor:'#cf5906',
                padding:20,
                borderRadius:10,
                marginBottom:30
              }}>
              <Text 
                style={{
                    textAlign:'center',
                    fontWeight:'700',
                    fontSize:16,
                    color: '#000',
                }}>
                Add
              </Text>
            </TouchableOpacity>
            {this.renderChatroomButtons()}
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const { width, height } = Dimensions.get('window');

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
      backgroundColor: '#cf5906',
    },
    chatroomButtonText: {
      color: 'black',
      fontSize: 18,
      fontWeight: 'bold',
    },
    chatroomContainer: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    messageContainer: {
      flex: 1,
      padding: 10,
    },
    messageBubble: {
      backgroundColor: '#cf5906', // Example message bubble color
      padding: 10,
      borderRadius: 5,
      marginVertical: 5,
    },
    messageUsername: {
      fontWeight: 'bold',
    },
    inputContainer: {
      flexDirection: 'row',
      padding: 10,
    },
    input: {
      flex: 1,
      borderColor: 'gray',
      borderWidth: 1,
      marginRight: 10,
      padding: 10,
    },
    modalView: {
      position: 'absolute', // Use absolute positioning
      top: height / 4, // Position the modal at 1/4th from the top of the screen
      left: width / 10, // Center the modal with some margin from the left
      width: '80%', // Use 80% of screen width for the modal
      minHeight: 200, // Minimum height for the modal
      backgroundColor: '#323941',
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
      backgroundColor: "#666",
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      width: '100%',
      marginBottom: 20,
      padding: 10,
    },
  });

export default Live;
