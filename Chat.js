import { BlockList } from 'net';
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, Button, TextInput } from 'react-native';


export default function Chat({ socket, username, room }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };
            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData])
            setCurrentMessage("");
        }
    };
    useEffect(() => {
        socket.on("recived_message", (data) => {
            console.log("Data", data);
            setMessageList((list) => [...list, data])
        })
    }, [socket])
    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <View style={styles.chatheader}>
                    <Text style={styles.useNameText}>{username}</Text>
                    <Text style={styles.headerText}>Join A Chat</Text>

                </View>
                <View style={styles.chatbody}>
                    {
                        messageList.map((messageContent) =>
                            <View style={styles.message} id={username === messageContent.author ? "you" : "other"}>

                                <View>
                                    <View style={styles.messageContent}>
                                        <View>{messageContent.message}</View>
                                    </View>
                                    <View style={styles.messageMeta}>
                                        <View>{messageContent.time}</View>
                                        <View>{messageContent.author}</View>
                                    </View>
                                </View>

                            </View>)
                    }


                </View>
                <View style={styles.chatfooter}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Write Down Message...'
                        onChangeText={setCurrentMessage}
                        value={currentMessage}
                        onKeyPress={(event) => {
                            event.key === "Enter" && sendMessage();
                        }}

                    />
                    <Button
                        styles={styles.buttonTab}
                        onPress={sendMessage}
                        title='Send'
                    />
                </View>


            </View>

        </View>

    )
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginTop: 200,
        borderWidth: 3,
        marginBottom: 10,
        marginRight: 120,
        marginLeft: 120,
        alignItems: 'center',
        justifyContent: 'center',
    },

    chatheader: {

        alignItems: "center",
        fontSize: 20,
    },
    chatbody: {
        marginLeft: 30,
        marginRight: 30,
        height: (450 - (70 + 70)),
        width: 450,
        border: 2,
        backgroundColor: "lemonchiffon",

        position: "relative",
    },
    chatfooter: {
        marginLeft: 30,
        marginRight: 30,
        // height: (450 - (70 + 70)),
        width: 450,
        border: 2,
        backgroundColor: "white",
        position: "relative",
    },
    useNameText: {
        color: "red",
        fontSize: 40,
    },
    textInput: {
        //backgroundColor:"green",
        padding: 4,
        borderColor: "black",
        borderWidth: 2,
        marginBottom: 3
    },
    buttonTab: {
        marginBottom: 10,
        width: 400,
    },
    container: {
        flex: 1,
        marginTop: 15,
        marginBottom: 50,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 40,
        fontWeight: "bold"
    },
    messageContent: {
        color: "black",
        fontSize: 25,
        marginRight: 20,
        marginLeft: 20,
    },
    messageMeta: {
        color: "black",
        marginRight: 20,
        marginLeft: 20,
    }
})