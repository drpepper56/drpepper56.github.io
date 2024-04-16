// where the input is taken
/* 
    The way input is read all together after the user presses the 'submit' button to send the prompts to create the recipe, instead
    of using a state variable for every input value, in the 'submit' function the each value is taken from it's respective text box
    or however else the value is obtained (slider or checkbox)
*/
import { useEffect, useState } from "react";
import DynamicIngredientsInput from "./DynamicIngredientsInput";

// from allergyuk.org
export enum Allergies {
  "Celery",
  "Gluten Cereals",
  "Eggs",
  "Seafood",
  "Milk",
  "Mustard",
  "Peanuts",
  "Sesame",
  "Soyabeans",
  "Sulphites",
  "Tree Nuts",
}

interface RecipeControlItems {
  ingListPassed: string[];
  spiceListPassed: string[];
  styleListPassed: string[];
  returnIngList: (values: string[]) => void;
  returnSpiceList: (values: string[]) => void;
  returnStyleList: (values: string[]) => void;
}

//everything in here, live
const RecipeControl: React.FC<RecipeControlItems> = ({
  ingListPassed,
  spiceListPassed,
  styleListPassed,
  returnIngList,
  returnSpiceList,
  returnStyleList,
}) => {
  // prompt component lists
  const [ingList, setIngList] = useState<string[]>(ingListPassed);
  const [spiceList, setSpiceList] = useState<string[]>(spiceListPassed);
  const [styleList, setStyleList] = useState<string[]>(styleListPassed);
  // other bullshit
  const [showIngInput, setShowIngInput] = useState(false);
  const [showStyleInput, setShowStyleInput] = useState(false);
  const [showOptionalInput, setShowOptionalInput] = useState(false);

  const handleClose = () => {
    returnIngList(ingList);
    returnSpiceList(spiceList);
    returnStyleList(styleList);
  };

  useEffect(() => {
    // Action to be executed once on component mount;
    setIngList(ingListPassed);
    setSpiceList(spiceListPassed);
    setStyleList(styleListPassed);
    return () => {};
  }, [handleClose]);

  const handleIngInputToggle = () => {
    setShowIngInput(!showIngInput);
  };
  const handleIngredientsTabClose = (values: string[]) => {
    setIngList(values);
  };

  const handleStyleInputToggle = () => {
    setShowStyleInput(!showStyleInput);
  };

  const handleOptionalInputToggle = () => {
    setShowOptionalInput(!showOptionalInput);
  };

  return (
    <ul>
      <li>
        <p onClick={handleIngInputToggle}>Ingredients</p>
        {showIngInput && (
          <>
            <DynamicIngredientsInput
              values={ingList}
              returnValues={handleIngredientsTabClose}
            />
          </>
        )}
      </li>

      <li>
        <p onClick={handleStyleInputToggle}>Style</p>
        {showStyleInput && <div className="main_ingredients_input"></div>}
      </li>
      <li>
        <p onClick={handleOptionalInputToggle}>Optional Additions</p>
        {showOptionalInput && (
          <>
            <div>sum div</div>
          </>
        )}
      </li>
      {/* <li className="recipe-li">
        <p>Recipe</p>
      </li> */}
    </ul>
  );
};

export default RecipeControl;
