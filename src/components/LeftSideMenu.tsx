import { useState } from "react";
import "../css/left_side_menu.css";

interface LeftSideMenuItems {
  placeholder?: string;
}

const LeftSideMenu: React.FC<LeftSideMenuItems> = (
  {
    /*some bs*/
  }
) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleToggleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="container-for-left-side">
      {showMenu ? (
        <div className="menu">
          <ul>
            <li>opt1</li>
            <li>opt2</li>
            <li>skdbgsdkjgb</li>
            <li>opt3</li>
          </ul>
        </div>
      ) : (
        /*image, placeholder for now*/ <p
          className="image_icon"
          onClick={handleToggleShowMenu}
        >
          EE
        </p>
      )}
    </div>
  );
};

export default LeftSideMenu;
