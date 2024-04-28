/*
  Component for rendering the top right circle with some profile functionality, right now only logout works
*/

import "../css/profile_circle.css";
import { useState } from "react";
import { PageMode } from "../App";
import { useOutsideClick } from "../util/useOutsideClick";

interface ProfileCircleItems {
  // what to display in the circle
  letter: string;
  // what functionalities to show
  loginStatus: boolean;
  // logout function
  logoutFunction: () => void;
  // change page mode
  pageNavigation: (pageMode: PageMode) => void;
}

const ProfileCircle: React.FC<ProfileCircleItems> = ({
  letter,
  loginStatus,
  logoutFunction,
  pageNavigation,
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  // on/off
  const handleToggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };
  const ref1 = useOutsideClick(() => {
    handleToggleUserMenu();
  });

  // logout
  const handleLogoutUser = () => {
    logoutFunction();
  };

  // change page mode, used for going to main page after login
  const handleLoginPageNav = () => {
    pageNavigation(PageMode.LoginRegister);
  };

  return (
    <>
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
              <>
                <li>Profile</li>
                <li>Subscription Plan</li>
                <li onClick={handleLogoutUser}>Logout</li>
              </>
            ) : (
              <>
                <li onClick={handleLoginPageNav}>Login</li>
                <li>Pricing</li>
              </>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default ProfileCircle;
