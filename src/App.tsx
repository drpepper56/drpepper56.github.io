import "./css/page.css";
import { useState } from "react";
import LoginRegisterPage from "./components/LoginRegisterPage";
import ProfileCircle from "./components/ProfileCircle";
import LeftSideMenu from "./components/LeftSideMenu";
import BuilderContainer from "./components/BuilderContainer";

export enum PageMode {
  "LoginRegister",
  "Home",
}

/*
  Server connectivity,
  replace with proper http later
  B)
*/

const server_address = "floating-island-38755-1b0593cccb18.herokuapp.com"; // actual
// const server_address = "127.0.0.1"; // testing
const server_port = 5000; // testing

export interface User {
  name: string;
  email: string;
}

const App: React.FC = () => {
  const [currentPageMode, setCurrentPageMode] = useState(PageMode.Home);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  //for login
  const handleLoginClick = () => {
    setCurrentPageMode(PageMode.LoginRegister);
    console.log("go to login");
  };
  //for setting user after login
  const handleLoginSuccess = (user: User) => {
    setUser(user);
    setIsLoggedIn(true);
    setCurrentPageMode(PageMode.Home);
  };
  //for logout
  const handleLogoutClick = () => {
    setUser(null);
    setIsLoggedIn(false);
    setCurrentPageMode(PageMode.LoginRegister);
  };
  // for closing login from within
  const handleLoginCloseItself = () => {
    setCurrentPageMode(PageMode.Home);
    console.log("go to home");
  };
  //method to pass to elements that need to change the mode of the page
  const triggerPageModeChange = (pageMode: PageMode) => {
    setCurrentPageMode(pageMode);
    console.log(currentPageMode);
  };

  // create the {3} initial suggestions for the user to chose from
  const generateInitialSuggestions = async (
    map: Map<string, string[]>
  ): Promise<Map<string, string>> => {
    return new Promise((resolve, reject) => {
      // do some checks on the prompt components to filter only sensible stuff

      /* 
      Compose the message to the server
      Set the url, if the port is localhost or 127.0.0.1 (e.g. server is run in a local environment for testing purposes) use the port
    */
      if (server_address == "127.0.0.1") {
        var url =
          "http://" + server_address + ":" + server_port + "/init_suggestions";
      } else {
        var url = "https://" + server_address + "/init_suggestions";
      }
      // PORT or NO PORT
      console.log(url);

      //create http request object and set it's parameters
      var xhr = new XMLHttpRequest();
      xhr.responseType = "json";
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json"); // '; charset=utf-8' add later

      /*
        Send the request
        Create the url string
        Create the return map
      */
      let loginJSON = {
        ing: map.get("ing"),
        style: map.get("style"),
      };
      let jsonPayload = JSON.stringify(loginJSON);
      // let returnMap = new Map<string, string>([
      //   ["error", "should have done business management"],
      // ]);
      // console.log(returnMap);
      console.log(jsonPayload);
      xhr.send(jsonPayload);

      //resolve the server's response
      xhr.onload = () => {
        if (xhr.status == 200) {
          // if request  successful
          //receive response and parse the json
          let data = xhr.response;
          console.log("good good: ", data);

          let returnRecipes = new Map<string, string>([
            ["rec1", data["rec1"]],
            ["rec2", data["rec2"]],
            ["rec3", data["rec3"]],
          ]);

          resolve(returnRecipes);
        } else {
          // if request unsuccessful
          // probably error message in there
          let data = xhr.response;
          console.log("something fugged up: ", data);
          let returnErrorMessage = new Map<string, string>([
            ["error", data["should have done business management"]],
          ]);
          reject(returnErrorMessage);
        }
      };
    });
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <>
          <LeftSideMenu
            generateInitialSuggestions={generateInitialSuggestions}
          />
          <div className="container-for-right_side">
            <div className="container-for-profile-circle">
              <ProfileCircle
                letter={
                  isLoggedIn && user != null
                    ? user.name.substring(0, 1).toUpperCase()
                    : "?"
                }
                loginStatus={isLoggedIn}
                logoutFunction={handleLogoutClick}
                pageNavigation={triggerPageModeChange}
              />
            </div>
            <BuilderContainer placeholder={"gay"} />
          </div>
        </>
      ) : (
        <LoginRegisterPage
          serverPort={server_port}
          serverAddress={server_address}
          loginSuccess={handleLoginSuccess}
          selfClose={handleLoginCloseItself}
          setIsLoggedIn={setIsLoggedIn}
          onLogin={handleLoginClick}
        />
      )}
    </div>
  );
};

export default App;
