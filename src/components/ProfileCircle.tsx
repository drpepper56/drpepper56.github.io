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
    if (showUserMenu) {
      setShowUserMenu(false);
    } else {
      setShowUserMenu(true);
    }
  };

  const handleLogoutUser = () => {
    logoutFunction();
  };

  return (
    <div className="container">
      <div className="circle" onClick={handleToggleUserMenu}>
        <span className="letter">{letter}</span>
      </div>
      {showUserMenu && (
        <div className="dropdown-menu">
          <ul>
            <li>placeholder1</li>

            {loginStatus ? (
              <li
                onClick={() => {
                  handleToggleUserMenu;
                  handleLogoutUser;
                }}
              >
                Logout
              </li>
            ) : (
              <li
                onClick={() => {
                  handleToggleUserMenu;
                  pageNavigation("Login");
                }}
              >
                Login
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileCircle;
