import React, { useState, useRef, useEffect } from "react";
import "../css/navigationBar.css";
import { User } from "../App";

interface NavigationBarItems {
  currentPage: string;
  onLoginClick: () => void;
  isLoggedIn: boolean;
  onLogoutClick: () => void;
  pageNavigation: (webpage: string) => void;
  user: User | null;
}

const NavigationBar: React.FC<NavigationBarItems> = ({
  currentPage,
  onLoginClick,
  isLoggedIn,
  onLogoutClick,
  pageNavigation,
  user,
}) => {
  const [dropdown, setDropdown] = useState(false);
  const dropdownExit = useRef<HTMLUListElement>(null);
  const [timer, setTimer] = useState<number | undefined>(undefined);

  const handleWebpageChange = (newWebpage: string) => {
    pageNavigation(newWebpage);
  };

  const handleMouseHover = (mouseHover: boolean) => {
    if (mouseHover) {
      setDropdown(true);
      if (timer) {
        clearTimeout(timer);
      }
    } else {
      // Set a timeout to hide the dropdown box after an amount of time
      let timer1 = setTimeout(() => setDropdown(false), 5000);
    }
  };

  const handleClickOut = (event: MouseEvent) => {
    if (
      dropdownExit.current &&
      !dropdownExit.current.contains(event.target as Node)
    ) {
      setDropdown(false);
      if (timer) {
        clearTimeout(timer);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOut);
    return () => {
      document.removeEventListener("mousedown", handleClickOut);
    };
  }, []);

  return (
    <>
      {/* NEEDS TO BE GONE, NO NAV BARS IN 2024
       */}
      <nav className="NavigationBar">
        <ul>
          {/* CODE FOR ADDING A TITLE TO THE NAV BAR
          <li>
            <a
              className={`logo ${currentPage === "Home" ? "active" : ""}`}
              href="#"
              onClick={() => handleWebpageChange("Home")}
            >
              <span className="logo-text">MENTORPRISE</span>
            </a>
          </li>
  */}
          <li
            onMouseEnter={() => handleMouseHover(true)}
            onMouseLeave={() => handleMouseHover(false)}
          >
            <a
              className={currentPage === "Match" ? "active" : ""}
              href="/#match"
              onClick={() => handleWebpageChange("MatchMain")}
            >
              match
            </a>
            {dropdown && (
              <ul ref={dropdownExit} className="dropdown-box">
                {isLoggedIn && (
                  <div className="dropdown-box-container">
                    <li>
                      <a
                        href="/#auto-match"
                        onClick={() => handleWebpageChange("AutoMatch")}
                      >
                        <div className="dropdown-item">automatic match</div>
                      </a>
                    </li>
                  </div>
                )}
                {isLoggedIn && (
                  <div className="dropdown-box-container">
                    <li>
                      <a
                        href="/#manual-match"
                        onClick={() => handleWebpageChange("Match")}
                      >
                        <div className="dropdown-item">manual match</div>
                      </a>
                    </li>
                  </div>
                )}
              </ul>
            )}
          </li>
          {/* @2 li elements are dependent on user being set: profile, */}
          {isLoggedIn && user && (
            <li>
              <a
                className={currentPage === "UserProfile" ? "active" : ""}
                href="/#profile"
                onClick={() => handleWebpageChange("UserProfile")}
              >
                profile
              </a>
            </li>
          )}
          <li>
            {isLoggedIn ? (
              <a href="#" onClick={onLogoutClick}>
                logout
              </a>
            ) : (
              <a
                className={currentPage === "LoginRegister" ? "active" : ""}
                href="/#login_register"
                onClick={onLoginClick}
              >
                login/register
              </a>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavigationBar;
