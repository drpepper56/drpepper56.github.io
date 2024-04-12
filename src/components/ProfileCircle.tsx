import "../css/profile_circle.css";
import { useState } from "react";
import { PageMode } from "../App";
import { useOutsideClick } from "../util/useOutsideClick";

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
  const ref1 = useOutsideClick(() => {
    handleToggleUserMenu();
  });

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
        <div
          className="dropdown-menu"
          onClick={handleToggleUserMenu}
          ref={ref1}
        >
          <ul>
            {loginStatus ? (
              <li onClick={handleLogoutUser}>Logout</li>
            ) : (
              <li onClick={handleLoginPageNav}>Login</li>
            )}
            <li>akdhf</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileCircle;
