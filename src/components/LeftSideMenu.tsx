import { useState } from "react";
import "../css/left_side_menu.css";
import RecipeControl from "./RecipeControl";

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
      {showMenu && (
        <div className="menu">
          <div className="empty_space_in_my_head"></div>
          <RecipeControl placeholder={"hi"} />
        </div>
      )}
      <div className="image_icon" onClick={handleToggleShowMenu}>
        <p /*image, placeholder for now, fork knife spoon three lines menu idea*/
        >
          EE
        </p>
      </div>
    </div>
  );
};

export default LeftSideMenu;
