/* eslint-disable prefer-const */
import { useRef, useState } from "react";
import "../css/left_side_menu.css";
import RecipeControl from "./RecipeControl";

/*
  Element for handling all of the left side closable menu which holds the input forms for recipe components
  And triggering the generation functions, this element is only unmounted when a user logs out so it holds variables
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
  const generatedInitialSuggestions = useRef(
    new Map([
      ["rec1", ""],
      ["rec2", ""],
      ["rec3", ""],
    ])
  );

  /*
  Pass this to the children elements to save what they pass in this function for when they are unmounted
  */
  const handleRecipeControlClose = (
    promptComponents: Map<string, string[]>,
    generatedSuggestions: Map<string, string>
  ) => {
    promptComponentMapRef.current = promptComponents;
    generatedInitialSuggestions.current = generatedSuggestions;
  };

  return (
    <div className="container-for-left-side">
      {showMenu && (
        <div className="menu">
          <div className="empty_space_in_my_head"></div>
          <RecipeControl
            passedGeneratedRecipesMap={generatedInitialSuggestions.current}
            passedPromptComponentsMap={promptComponentMapRef.current}
            returnRefObjects={handleRecipeControlClose}
            generateInitialSuggestions={generateInitialSuggestions}
          />
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
