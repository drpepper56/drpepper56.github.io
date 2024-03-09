import "./App.css";
import { useState } from "react";
import LoginRegisterPage from "./components/LoginRegisterPage";
import NavigationBar from "./components/NavigationBar";

/*
  Server connectivity,
  replace with proper http later
*/
const server_port = 8000;
const server_address = "127.0.0.1";

export interface User {
  name: string;
  email: string;
  password: string;
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState("Home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const handleLoginClick = () => {
    setCurrentPage("Login/Register");
  };

  const handleLoginSuccess = (user: User) => {
    setUser(user);
    setIsLoggedIn(true);
    setCurrentPage("Home");
  };

  const handleLogoutClick = () => {
    setUser(null);
    setIsLoggedIn(false);
    setCurrentPage("Login");
  };

  //method to pass to navigation bar component that let's it change the current page
  const pageNavigation = (webpage: string) => {
    setCurrentPage(webpage);
  };

  return (
    <div className="App">
      <NavigationBar
        currentPage={currentPage}
        onLoginClick={handleLoginClick}
        isLoggedIn={isLoggedIn}
        onLogoutClick={handleLogoutClick}
        pageNavigation={pageNavigation}
        user={user}
      />

      {currentPage == "Login/Register" && (
        <LoginRegisterPage
          serverPort={server_port}
          serverAddress={server_address}
          loginSuccess={handleLoginSuccess}
          setIsLoggedIn={setIsLoggedIn}
          onLogin={handleLoginClick}
        />
      )}
    </div>
  );
};

export default App;
