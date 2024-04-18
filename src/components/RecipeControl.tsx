// where the input is taken
/* 
    The way input is read all together after the user presses the 'submit' button to send the prompts to create the recipe, instead
    of using a state variable for every input value, in the 'submit' function the each value is taken from it's respective text box
    or however else the value is obtained (slider or checkbox)
*/
import { useEffect, useRef, useState } from "react";
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

// prompts for saving the state of inputs while this element is unmounted
interface RecipeControlItems {
  // two items for getting back the ref objects when mounting anew
  passedPromptComponentsMap: Map<string, string[]>;
  passedGeneratedRecipesMap: Map<string, string>;
  // function for passing the ref objects to children elements when they are remounted
  returnRefObjects: (
    promptComponents: Map<string, string[]>,
    generatedRecipes: Map<string, string>
  ) => void;
  // generate initial suggestion function implemented in App.tsx, passed down
  generateInitialSuggestions: (
    map: Map<string, string[]>
  ) => Promise<Map<string, string>>;
}

const RecipeControl: React.FC<RecipeControlItems> = ({
  passedPromptComponentsMap,
  passedGeneratedRecipesMap,
  returnRefObjects,
  generateInitialSuggestions,
}) => {
  //store the prompt components locally as a ref to not rerender everything
  let promptComponentMapRef = useRef(passedPromptComponentsMap);
  let generatedSuggestionsMapRef = useRef(passedGeneratedRecipesMap);

  // values for contorting the visibility of collapsible input sections
  const [showIngInput, setShowIngInput] = useState(false);
  const [showStyleInput, setShowStyleInput] = useState(false);
  const [showAllergies, setShowAllergies] = useState(false);

  /*
Cleanup and setup function
On mount set the map ref to what was saved before,
On unmount run the passed function the map ref the inputs
 */
  useEffect(() => {
    promptComponentMapRef.current = passedPromptComponentsMap;
    return () => {};
  }, [
    returnRefObjects(
      promptComponentMapRef.current,
      generatedSuggestionsMapRef.current
    ),
  ]);

  /*
Handle toggling of list items to reveal their content
Saving their inputs and passing them when opened again
 */
  const handleIngInputToggle = () => {
    // for dish general ingredients
    setShowIngInput(!showIngInput);
  };
  const handleIngredientsTabClose = (values: string[]) => {
    promptComponentMapRef.current.set("ing", values);
  };
  const getIngredientsValues = () => {
    return promptComponentMapRef.current.get("ing")!;
  };

  const handleStyleInputToggle = () => {
    // for dish style
    setShowStyleInput(!showStyleInput);
  };
  const handleStyleTabClose = (values: string[]) => {
    promptComponentMapRef.current.set("style", values);
  };
  const getStyleValues = () => {
    return promptComponentMapRef.current.get("style")!;
  };

  const handleAllergiesToggle = () => {
    // for allergies
    setShowAllergies(!showAllergies);
  };
  const handleAllergiesTabClose = (values: string[]) => {
    promptComponentMapRef.current.set("allergies", values);
  };
  const getAllergiesValues = () => {
    return promptComponentMapRef.current.get("allergies")!;
  };

  /*
Handle generating @{3} initial recipe suggestions
Send https request to server to generate 3 initial recipes
 */
  const handleGenerateInitialSuggestions = (
    promptComponents: Map<string, string[]>
  ) => {
    // call the function that connects to the server
    generateInitialSuggestions(promptComponents)
      .then((map) => {
        console.log("in recipe control 1: ", map);
      })
      .catch(() => {
        console.log("error");
      });

    //return the recipes in text form and display them
    console.log("in recipe control 2: ", generatedSuggestionsMapRef.current);
  };

  return (
    <ul>
      <li>
        <p onClick={handleIngInputToggle}>Ingredients</p>
        {showIngInput && (
          <>
            <DynamicIngredientsInput
              label="Ingredient"
              values={getIngredientsValues()}
              returnValues={handleIngredientsTabClose}
            />
          </>
        )}
      </li>
      <li>
        <p onClick={handleStyleInputToggle}>Style</p>
        {showStyleInput && (
          <>
            <DynamicIngredientsInput
              label="Custom Style"
              values={getStyleValues()}
              returnValues={handleStyleTabClose}
            />
          </>
        )}
      </li>
      <li>
        <p onClick={handleAllergiesToggle}>Allergies</p>
        {showAllergies && (
          <>
            <DynamicIngredientsInput
              label="Allergy"
              values={getAllergiesValues()}
              returnValues={handleAllergiesTabClose}
            />
          </>
        )}
      </li>
      <li className="recipe-generate-li">
        <p>Recipe Suggestions</p>
        <button
          onClick={() =>
            handleGenerateInitialSuggestions(promptComponentMapRef.current)
          }
        >
          Generate
        </button>
      </li>
    </ul>
  );
};

export default RecipeControl;
