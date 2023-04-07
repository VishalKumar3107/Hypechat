import React, { useState, useEffect } from "react";
import { Chat } from "./Component/Chat.js";
import Cookies from "universal-cookie";
import "./App.css";
import "./Component/Signin.css";
import { Authenticate } from "./Component/Auth";
import { Signin } from "./Component/Signin.js";
import { Button, TextField } from "@mui/material";
import logo from "./Component/logo.jpg";
import panda from "./Component/pandawelcome.png";
import video from "./Component/video.mp4";

const cookies = new Cookies();

function ChatApp() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [isInChat, setIsInChat] = useState(null);
  const [room, setRoom] = useState("");

  if (!isAuth) {
    return (
      <Authenticate
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        setIsInChat={setIsInChat}
      >
        <Signin setIsAuth={setIsAuth} />
      </Authenticate>
    );
  }

  return (
    <Authenticate
      isAuth={isAuth}
      setIsAuth={setIsAuth}
      setIsInChat={setIsInChat}
    >
      {!isInChat ? (
        <div className="auth">
          <video className="authvideo" autoPlay loop muted>
            <source src={video} type="video/mp4" />
          </video>
          <div className="room">
            <div className="authcontainer">
              <img src={logo} />
              <TextField
                id="filled-basic"
                label="Enter Room Name"
                variant="filled"
                required
                onChange={(e) => setRoom(e.target.value)}
              />
              <Button
                variant="contained"
                onClick={() => {
                  setIsInChat(true);
                }}
              >
                Enter Chat
              </Button>
            </div>
          </div>
          <img className="pandaimage" src={panda} />
        </div>
      ) : (
        <Chat room={room} />
      )}
    </Authenticate>
  );
}

export default ChatApp;
