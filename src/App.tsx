import "./App.css";
import { useState } from "react";
import LoginRegisterPage from "./components/LoginRegisterPage";

/*
  Server connectivity,
  replace with proper http later
*/
const server_port = 5500;
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

  let loginItems1 = [
    {
      serverPort: server_port,
      serverAddress: server_address,
      loginSuccess: handleLoginSuccess,
      setIsLoggedIn: setIsLoggedIn,
      onLogin: handleLoginClick,
    },
  ];

  return (
    <div className="App">
      <p>i am so done with this</p>
      <LoginRegisterPage
        serverPort={server_port}
        serverAddress={server_address}
        loginSuccess={handleLoginSuccess}
        setIsLoggedIn={setIsLoggedIn}
        onLogin={handleLoginClick}
      />
    </div>
  );
};

export default App;
