import "./css/page.css";
import { useState } from "react";
import LoginRegisterPage from "./components/LoginRegisterPage";
import ProfileCircle from "./components/ProfileCircle";
import LeftSideMenu from "./components/LeftSideMenu";

export enum PageMode {
  "LoginRegister",
  "Home",
}

/*
  Server connectivity,
  replace with proper http later
  B)
*/

const server_port = 5000;
// const server_address = "floating-island-38755-1b0593cccb18.herokuapp.com";
const server_address = "127.0.0.1";

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
  };

  //method to pass to elements that need to change the mode of the page
  const triggerPageModeChange = (pageMode: PageMode) => {
    setCurrentPageMode(pageMode);
  };

  return (
    <div className="App">
      <LeftSideMenu />
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

        {!isLoggedIn && currentPageMode == PageMode.LoginRegister && (
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
    </div>
  );
};

export default App;
