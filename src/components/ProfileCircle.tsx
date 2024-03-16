import "../css/profile_circle.css";
import { useState } from "react";
import { PageMode } from "../App";

interface ProfileCircleItems {
  letter: string;
  loginStatus: boolean;
  logoutFunction: () => void;
  pageNavigation: (pageMode: PageMode) => void;
}

const ProfileCircle: React.FC<ProfileCircleItems> = ({
  letter,
  loginStatus,
  logoutFunction,
  pageNavigation,
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleToggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleLogoutUser = () => {
    logoutFunction();
  };

  const handleLoginPageNav = () => {
    pageNavigation(PageMode.LoginRegister);
  };

  return (
    <div className="container">
      <div className="circle" onClick={handleToggleUserMenu}>
        <span className="letter">{letter}</span>
      </div>
      {showUserMenu && (
        <div className="dropdown-menu" onClick={handleToggleUserMenu}>
          <ul>
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
