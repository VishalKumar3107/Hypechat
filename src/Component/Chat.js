import React, { useState, useEffect, useRef } from "react";
import { db, auth } from "./firebaseconfig";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import minilogo from "./logosmall.png";
import "./styles.css";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export const Chat = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const messagesRef = collection(db, "messages");
  const messageEndRef = useRef(null);


  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      console.log(messages);
      setMessages(messages);
    });

    return () => unsuscribe();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      image: auth.currentUser.photoURL,
      room,
    });

    setNewMessage("");
    messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;
  };


  return (
    <div className="chat-app">
      <div className="header">
        <div className="logomini"><img src={minilogo} alt="logo" /></div>
        <div className="logotext"><h1>WELCOME TO {room.toUpperCase()}</h1></div>
      </div>
      <div className="messages" ref={messageEndRef}>
        {messages.map((message) => (
          <div key={message.id} className={`message ${ message.user === auth.currentUser.displayName ? "sent" : "received"}`} >
            <span className="avatarimage">
              <img src={message.image} />
            </span>
            <span className="user">{message.user}:</span> {message.text}
          </div>
        ))}

      </div>

      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          className="new-message-input"
          placeholder="Type your message here..."
        />
        <button type="submit" className="send-button">
        <span>Send</span>
        <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>

    </div>
  );
};
