// where the input is taken
/* 
    The way input is read all together after the user presses the 'submit' button to send the prompts to create the recipe, instead
    of using a state variable for every input value, in the 'submit' function the each value is taken from it's respective text box
    or however else the value is obtained (slider or checkbox)
*/

import { useEffect, useRef, useState } from "react";
import DynamicIngredientsInput from "./DynamicIngredientsInput";
import SelectFromList from "./SelectFromList";
import "../css/recipe_control.css";
// question mark by Nira Inds from <a href="https://thenounproject.com/browse/icons/term/question-mark/" target="_blank" title="question mark Icons">Noun Project</a> (CC BY 3.0)
import question_mark from "../assets/question_mark.png";

// from allergyuk.org
export enum Allergies {
  "Celery",
  "Gluten",
  "Eggs",
  "Seafood",
  "Lactose",
  "Mustard",
  "Peanuts",
  "Sesame",
  "Soyabeans",
  "Sulphates",
  "Tree Nuts",
}

interface RecipeControlItems {
  // two items for getting back the ref objects when mounting anew
  passedPromptComponentsMap: Map<string, string[]>;
  // function for passing the ref objects to children elements when they are remounted
  returnRefObjects: (promptComponents: Map<string, string[]>) => void;
  // generate initial suggestion function implemented in App.tsx, passed down
  generateInitialSuggestions: (
    map: Map<string, string[]>
  ) => Promise<Map<string, string>>;
}

const RecipeControl: React.FC<RecipeControlItems> = ({
  passedPromptComponentsMap,
  returnRefObjects,
  generateInitialSuggestions,
}) => {
  //store the prompt components locally as a ref to not rerender everything
  const promptComponentMapRef = useRef(passedPromptComponentsMap);

  // values for contorting the visibility of collapsible input and suggestion sections
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
  }, [returnRefObjects(promptComponentMapRef.current)]);

  /*
Handle toggling of list items to reveal their content
Saving their inputs and passing them when opened again
 */
  // ing (input)
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
  // style (input)
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
  // allergies (input)
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
    generateInitialSuggestions(promptComponents).catch((data) => {
      // log the error
      console.log("error", data);
    });
  };

  /*
Handle the user hovering over the question mark help image and toggle a helping popup
  */
  const handleShowPopup = (text: string, target: HTMLImageElement) => {
    const popup = document.createElement("div");
    popup.className = "popup-container";
    const hint_p = document.createElement("p");
    // hint_p.className = "popup-container-hint";
    hint_p.textContent = text;
    popup.appendChild(hint_p);

    console.log(text);

    if (target.parentElement!.querySelector(".popup-container") == null) {
      target.parentElement?.appendChild(popup);
    } else {
      target.parentElement!.removeChild(target.parentElement!.lastChild!);
    }
  };

  return (
    <>
      <ul>
        <li>
          <div className="tab-title-elements">
            <p onClick={handleIngInputToggle} className="tab-title">
              Ingredients
            </p>
            <img
              className="clue-popup-image"
              src={question_mark}
              onClick={(e) =>
                handleShowPopup(
                  "Add any ingredients you want to use in the recipe. e.g. Flour, Pasta, Milk, Pepper, Rice etc",
                  e.currentTarget
                )
              }
            />
          </div>
          {showIngInput && (
            <>
              <DynamicIngredientsInput
                label=""
                values={getIngredientsValues()}
                returnValues={handleIngredientsTabClose}
              />
            </>
          )}
        </li>
        <li>
          <div className="tab-title-elements">
            <p onClick={handleStyleInputToggle} className="tab-title">
              Style
            </p>
            <img
              className="clue-popup-image"
              src={question_mark}
              onClick={(e) =>
                handleShowPopup(
                  "Specify the style, e.g. desert, oven baked, korean, reduced fat, italian",
                  e.currentTarget
                )
              }
            />
          </div>
          {showStyleInput && (
            <>
              <DynamicIngredientsInput
                label=""
                values={getStyleValues()}
                returnValues={handleStyleTabClose}
              />
            </>
          )}
        </li>
        <li>
          <div className="tab-title-elements">
            <p onClick={handleAllergiesToggle} className="tab-title">
              Allergies
            </p>
            <img
              className="clue-popup-image"
              src={question_mark}
              onClick={(e) =>
                handleShowPopup("Check your allergies.", e.currentTarget)
              }
            />
          </div>
          {showAllergies && (
            <>
              <SelectFromList
                values={getAllergiesValues()}
                allAllergies={Object.entries(Allergies)
                  .filter((e) => !isNaN(e[0] as any))
                  .map((e) => e[1])}
                returnValues={handleAllergiesTabClose}
                label="allergy"
              />
            </>
          )}
        </li>
      </ul>
      <div className="recipe-generate">
        <button
          className="button-generate-suggestions"
          onClick={() =>
            handleGenerateInitialSuggestions(promptComponentMapRef.current)
          }
        >
          Generate Recipe Suggestions
        </button>
      </div>
    </>
  );
};

export default RecipeControl;
