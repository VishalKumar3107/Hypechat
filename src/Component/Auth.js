import { auth } from "./firebaseconfig.js";
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";
import "./styles.css";
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const cookies = new Cookies();

export const Authenticate = ({ children, isAuth, setIsAuth, setIsInChat }) => {
  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setIsInChat(false);
  };

  return (
    <div className="App">
      <div className="app-header">
      </div>

      <div className="app-container">{children}</div>
      {isAuth && (
        <div className="sign-out">
          <Button className="signoutButton" onClick={signUserOut}> <FontAwesomeIcon className="btnicon" icon={faArrowRightFromBracket} /><span>Sign Out</span></Button>
        </div>
      )}
    </div>
  );
};
