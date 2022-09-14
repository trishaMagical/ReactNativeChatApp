import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import io from 'socket.io-client';
import Chat from './Chat';

const socket = io.connect("http://localhost:3005")

export default function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);



  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  }
  return (
    <View>
      {!showChat ? (
        <View style={styles.mainContainer}>
          <View style={styles.container}>
            <Text style={styles.headerText}>Join A Chat</Text>
            <TextInput
              style={styles.textInput}
              placeholder='Write Down Name...'
              onChangeText={setUsername}
              value={username}


            />
            <TextInput
              style={styles.textInput}
              placeholder='Write Down Room Name...'
              onChangeText={setRoom}
              value={room}


            />
            <Button
              onPress={joinRoom}
              title="Join A Room"
              color="#009933"
              style={styles.buttonTab}
            />
          </View>
        </View>

      )
        : (
          <Chat socket={socket} username={username} room={room} />

        )}

    </View>

  );
}

const styles = StyleSheet.create({
  mainContainer:{
    flex: 1,
    marginTop: 200,
    borderWidth:3,
    marginBottom:10,
    marginRight:120,
    marginLeft:120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    marginTop: 15,
    marginBottom:50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    backgroundColor: "yellow",
    padding: 4,
    borderColor: "black",
    borderWidth: 4,
    marginBottom: 3
  },
  buttonTab:{
    marginBottom:12,
    fontWeight:"bold"
    
  },
  headerText:{
    fontSize:20,
    fontWeight:"bold"
  }

});
