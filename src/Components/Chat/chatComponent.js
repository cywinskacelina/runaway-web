import React, { useEffect, useState } from "react";
import socketioclient from "socket.io-client";
import { Launcher } from 'react-chat-window';
import "./chat.css";

class ChatComponent extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            messages: [],
            //socket: socketioclient("localhost:7000")
            socket: socketioclient("https://runaway-practicum.herokuapp.com/")
        }
        
        this._onMessageUpdate = this._onMessageUpdate.bind(this);
    }

    //Send the server the room number to join and connect socket.
    socket_joinRoom(room) {
        this.state.socket.emit("joinRoom", room);
        this.state.socket.emit("volunteerJoined", "joined");
        console.log("volunteerJoined sent");
    }


    componentDidMount() {
        this.socket_joinRoom(parseInt(this.props.props[0],10)) //join room.
    }// eslint-disable-line react-hooks/exhaustive-deps

    //Append new message to the message state.
    _onMessageUpdate(message){
        this.setState({messages:[...this.state.messages, {
            author: 'them',
            type: 'text',
            data: { message }
        }]}
        );
    }
    
    //Send new message to the server. 
    _onMessageWasSent(message) {
        this.setState({
            messages: [...this.state.messages, message]
        });
        console.log(this.state.messages);
        this.state.socket.emit("sendMessage", message.data.text);
    }


    render() {
        this.state.socket.on = this.state.socket.on.bind(this); //Binding the keyword "this" to this object.
        
        //When new message has been recieved
        this.state.socket.on("updateMessage", function (message) {
            console.log("message recieved");
            this._onMessageUpdate(message);
        })
        
        return (
            <div className ="chatComponent" style={{ "z-index": this.props.props[1],"height":"100%"}}>
                <Launcher
                    agentProfile={{
                        teamName: `Ongoing: Room #${this.props.props[0]}`
                    }}
                    onMessageWasSent={this._onMessageWasSent.bind(this)}
                    messageList={this.state.messages}
                    isOpen = {true}
                    showEmoji
                />
            </div >
        )
    }
}

export default ChatComponent;
