import React, { useState } from "react";
import { User } from "../App";
import Button from "./Button";
import "../css/login.css";
import TriggerTextBox from "./TriggerTextBox";
import { useOutsideClick } from "../util/useOutsideClick";

interface LoginItems {
  serverPort: number;
  serverAddress: string;
  loginSuccess: (user: User) => void;
  selfClose: () => void;
  setIsLoggedIn?: (loggedIn: boolean) => void;
  onLogin?: () => void;
  handleLogin?: () => void;
}

const LoginRegisterPage: React.FC<LoginItems> = ({
  serverPort,
  serverAddress,
  loginSuccess,
  setIsLoggedIn,
  onLogin,
  selfClose,
}) => {
  //control Value
  const [showRegister, setRegister] = useState(false);
  const ref1 = useOutsideClick(() => {
    selfClose();
  });

  //Login parts
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginErrorMessage] = useState("");

  const handleLoginEmailChange = (value: string) => {
    setLoginEmail(value);
  };

  const handleLoginPasswordChange = (value: string) => {
    setLoginPassword(value);
  };

  //LOGIN LOGIC
  const handleLoginClick = () => {
    //set the url, if the port is localhost or 127.0.0.1 (e.g. server is run in a local environment for testing purposes) use the port
    if (serverAddress == "127.0.0.1") {
      var url = "http://" + serverAddress + ":" + serverPort + "/login";
    } else {
      var url = "https://" + serverAddress /* + ":" + serverPort */ + "/login";
    }
    // PORT or NO PORT
    console.log(url);

    //create http request object and set it's parameters
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json"); // '; charset=utf-8' add later

    //resolve the server's response
    xhr.onload = () => {
      //if login successful
      //FOR TESTING: assume true
      if (xhr.status == 200) {
        //the response should come in a json so just save it as local variable
        let data = xhr.response;

        if (setIsLoggedIn) {
          //call login function from the main app
          setIsLoggedIn(true);
        }

        if (onLogin) {
          //perform the routine to do upon a user'g login
          onLogin();
        }

        loginSuccess({
          name: data["username"],
          email: data["email"],
        });
      } /* else {
        //TODO: fix later add proper error handling
        setLoginErrorMessage("incorrect login");
        console.log("incorrect login or password");
      } */
    };

    //create the url string
    let loginJSON = {
      email: loginEmail,
      password: loginPassword,
    };
    let jsonPayload = JSON.stringify(loginJSON);
    console.log(jsonPayload);
    xhr.send(jsonPayload);
  };

  const handleRegisterFormClick = () => {
    setRegister(true);
  };

  //Register parts
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [registerErrorMessage, setRegisterErrorMessage] = useState("");

  const handleRegistrationNameChange = (value: string) => {
    setRegisterName(value);
  };

  const handleRegistrationEmailChange = (value: string) => {
    setRegisterEmail(value);
  };

  const handleRegistrationPasswordChange = (value: string) => {
    setRegisterPassword(value);
  };

  const handleRegistrationConfirmPasswordChange = (value: string) => {
    setRegisterConfirmPassword(value);
  };

  const handleRegisterClick = () => {
    if (!/\S+@\S+\.\S+/.test(registerEmail)) {
      setRegisterErrorMessage("Please enter a valid email address.");
      return;
    }

    if (
      !registerName ||
      !registerEmail ||
      !registerPassword ||
      !registerConfirmPassword
    ) {
      setRegisterErrorMessage("All fields are required");
      return;
    }
    if (registerPassword !== registerConfirmPassword) {
      setRegisterErrorMessage("Passwords do not match");
      return;
    }

    // Perform validation on the email and password

    //CREATE USER AND POST DETAILS TO SAVE PERMANENTLY ON SERVER LOGIC

    // Assuming validation passes
    loginSuccess({
      name: registerName,
      email: registerEmail,
    });
  };

  const handleRegisterFormCancel = () => {
    setRegister(false);
  };

  return (
    <div className="login-container" ref={ref1}>
      {showRegister ? (
        <div>
          <TriggerTextBox
            label="Name"
            value={registerName}
            onChange={handleRegistrationNameChange}
          />
          <TriggerTextBox
            label="Email"
            value={registerEmail}
            onChange={handleRegistrationEmailChange}
          />
          <TriggerTextBox
            label="Password"
            value={registerPassword}
            onChange={handleRegistrationPasswordChange}
            isPassword
          />
          <TriggerTextBox
            label="Confirm Password"
            value={registerConfirmPassword}
            onChange={handleRegistrationConfirmPasswordChange}
            isPassword
          />
          {registerErrorMessage && (
            <div className="error">{registerErrorMessage}</div>
          )}
          <Button label="Register" onClick={handleRegisterClick} />
          <Button label="Login" onClick={handleRegisterFormCancel} />
        </div>
      ) : (
        <div>
          <TriggerTextBox
            label="Email"
            value={loginEmail}
            onChange={handleLoginEmailChange}
          />
          <TriggerTextBox
            label="Password"
            value={loginPassword}
            onChange={handleLoginPasswordChange}
            isPassword
          />
          {loginErrorMessage && (
            <div className="error">{loginErrorMessage}</div>
          )}
          <Button label="Login" onClick={handleLoginClick} />
          <Button label="Register" onClick={handleRegisterFormClick} />
        </div>
      )}
    </div>
  );
};

export default LoginRegisterPage;
