import { useRef, useState } from "react";
import "../css/left_side_menu.css";
import RecipeControl from "./RecipeControl";
// menu by Adrien Coquet from <a href="https://thenounproject.com/browse/icons/term/menu/" target="_blank" title="menu Icons">Noun Project</a> (CC BY 3.0)
import menu from "../assets/menu.png";

/*
  Element for handling all of the left side closable menu which holds the input forms for recipe components
  And triggering the generation function for suggestion, this element is only unmounted when a user logs out so it holds variables
  for all of its children when they are unmounted
*/

interface LeftSideMenuItems {
  // generate initial suggestion function defined in App.tsx, passed down
  generateInitialSuggestions: (
    map: Map<string, string[]>
  ) => Promise<Map<string, string>>;
}

const LeftSideMenu: React.FC<LeftSideMenuItems> = ({
  generateInitialSuggestions,
}) => {
  // control if the menu is visible or not
  const [showMenu, setShowMenu] = useState(true);
  const handleToggleShowMenu = () => {
    setShowMenu(!showMenu);
  };
  // ref objects for storing maps used by this elements unmounted children
  const promptComponentMapRef = useRef(
    new Map([
      ["ing", [""]],
      ["style", [""]],
      ["allergies", [""]],
    ])
  );

  /*
  Pass this to the children elements to save what they pass in this function for when they are unmounted
  */
  const handleRecipeControlClose = (
    promptComponents: Map<string, string[]>
  ) => {
    promptComponentMapRef.current = promptComponents;
  };

  return (
    <div className="container-for-left-side">
      {showMenu && (
        <div className="menu">
          <div className="empty_space_in_my_head"></div>
          <RecipeControl
            passedPromptComponentsMap={promptComponentMapRef.current}
            returnRefObjects={handleRecipeControlClose}
            generateInitialSuggestions={generateInitialSuggestions}
          />
        </div>
      )}
      <div className="image_icon" onClick={handleToggleShowMenu}>
        <img className="menu_toggle_image" src={menu} />
      </div>
    </div>
  );
};

export default LeftSideMenu;
