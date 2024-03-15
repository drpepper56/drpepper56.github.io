import "../css/profile_circle.css";
import { useState } from "react";

interface ProfileCircleItems {
  letter: string;
  loginStatus: boolean;
  logoutFunction: () => void;
  pageNavigation: (webpage: string) => void;
}

const ProfileCircle: React.FC<ProfileCircleItems> = ({
  letter,
  loginStatus,
  logoutFunction,
  pageNavigation,
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleToggleUserMenu = () => {
    console.log(showUserMenu);
    if (showUserMenu) {
      setShowUserMenu(false);
    } else {
      setShowUserMenu(true);
    }
  };

  const handleLogoutUser = () => {
    logoutFunction();
  };

  const handleLoginPageNav = () => {
    pageNavigation("Login/Register");
  };

  return (
    <div className="container">
      <div className="circle" onClick={handleToggleUserMenu}>
        <span className="letter">{letter}</span>
      </div>
      {showUserMenu && (
        <div className="dropdown-menu" onClick={handleToggleUserMenu}>
          <ul>
            <li>placeholder1</li>

            {loginStatus ? (
              <li onClick={handleLogoutUser}>Logout</li>
            ) : (
              <li onClick={handleLoginPageNav}>Login</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileCircle;
