import { Button } from "@mui/material";
import { auth, provider } from "./firebaseconfig";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import "./styles.css";
import "./Signin.css";
import logo from "./logo.jpg";
import panda from "./panda.png";
import video from "./video.mp4"

const cookies = new Cookies();

export const Signin = ({ setIsAuth }) => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="auth">
      <video className="authvideo" autoPlay loop muted>
        <source src = {video} type="video/mp4" />
        </video>
      <div className="authcontainer">
        <img src={logo} />
        <Button variant="contained" onClick={signInWithGoogle}>
          Sign In With Google
        </Button>
      </div>
      <img className="pandaimage" src={panda} />
    </div>
  );
};
