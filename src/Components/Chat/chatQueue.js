import React, { useEffect, useState } from "react";
import socketioclient from "socket.io-client";
import ChatComponent from "./chatComponent copy";
import 'react-chat-widget/lib/styles.css';
import "./chat.css";

let socket;
function ChatObservation(props) {

    const [queue, setQueue] = useState([0]);
    const [joinedRoom, setJoinedRoom] = useState([]);
    const [joinedRoomSize, setJoinedRoomSize] = useState(0);


    // Add room number to the joinedRoom state array.
    function socket_joinRoom(room) {
        console.log(joinedRoom instanceof Array);
        if(joinedRoomSize<3){
            setJoinedRoom(joinedRoom => joinedRoom.concat([[room, joinedRoomSize]]));
            setJoinedRoomSize(joinedRoomSize+1);
            console.log(joinedRoom.concat([[room, joinedRoomSize]]));
        }
    }

    useEffect(() => {
        //Connect with server.
        socket = socketioclient("https://runaway-practicum.herokuapp.com/");
        
        //Ask server for queue info.
        socket.emit("observeQueue", "joining General");
        
        //When received "updateQueue", update queue state.
        socket.on("updateQueue", queue => {
            console.log(queue);
            setQueue(queue);
        });
        
        /* ToDo: When volunteer closes chat, socket.disconnect with data showing the volunteer is volunteer */
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    function joinRoom(event) {
        socket_joinRoom(event.target.innerHTML);
        console.log(event.target)
    }
    
    // this delete room is called in the child component. Remove the room from the joinedRoom state array. 
    function deleteRoom(index){
        let temp = joinedRoom; 
        temp.splice(index,1)
        setJoinedRoom(temp);
        setJoinedRoomSize(joinedRoomSize-1);
    }

    return (
        <div style = {{display:"block", height:"100%"}} >
            <h3>Chat Room Queues ( click to join )</h3>
            <div>{queue.map((room) => {
                return (
                    <div onClick={joinRoom}>
                        {room}
                    </div>
                )
            })}</div>

            {/******************************************************/}
             
            <div style = {{"height":"90%"}}>
                {joinedRoom.map((roomInfo)=>{
                    return (<ChatComponent deleteRoom = {deleteRoom} joinedRoom = {joinedRoom} props = {roomInfo}/>);
                })}
            </div>
        </div>
    )
}

export default ChatObservation;
