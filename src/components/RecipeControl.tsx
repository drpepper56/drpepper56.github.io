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
  // FUNction to generate a full recipe, given a pre-generated suggestion and the components that went into that suggestions
  generateFinalRecipe: (
    componentsMap: Map<string, string[]>,
    recipeDescription: string
  ) => Promise<Map<string, string>>;
}

const RecipeControl: React.FC<RecipeControlItems> = ({
  passedPromptComponentsMap,
  passedGeneratedRecipesMap,
  returnRefObjects,
  generateInitialSuggestions,
  generateFinalRecipe,
}) => {
  //store the prompt components locally as a ref to not rerender everything
  const promptComponentMapRef = useRef(passedPromptComponentsMap);
  const recipeSuggestionsMapRef = useRef(passedGeneratedRecipesMap);

  // values for contorting the visibility of collapsible input and suggestion sections
  const [showIngInput, setShowIngInput] = useState(false);
  const [showStyleInput, setShowStyleInput] = useState(false);
  const [showAllergies, setShowAllergies] = useState(false);
  const [suggestionsGenerated, setSuggestionsGenerated] = useState(false);
  // values for displaying and updating the suggestions locally
  const [suggestions, setSuggestion] = useState([""]);
  const suggestionsLimit = 9;

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
      recipeSuggestionsMapRef.current
    ),
  ]);

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
  // suggestions (output)
  const suggestionsGeneratedComplete = () => {
    setSuggestionsGenerated(true);
    // add the new suggestions in front of the old ones
    setSuggestion(
      [...recipeSuggestionsMapRef.current.values()].concat(suggestions)
    );
    console.info(suggestions);
  };
  const clearSuggestions = () => {
    setSuggestion([""]);
  };

  /*
Handle generating @{3} initial recipe suggestions
Send https request to server to generate 3 initial recipes
 */
  const handleGenerateInitialSuggestions = (
    promptComponents: Map<string, string[]>
  ) => {
    // suggestions limit check
    if (!(suggestions.length >= suggestionsLimit)) {
      // call the function that connects to the server
      generateInitialSuggestions(promptComponents)
        .then((raw_data) => {
          //return the recipe suggestions in text form
          recipeSuggestionsMapRef.current = new Map(Object.entries(raw_data));
          suggestionsGeneratedComplete();
        })
        .catch((data) => {
          // log the error
          console.log("error", data);
        });
    }
  };

  const handleGenerateFinalRecipe = (
    recipeComponents: Map<string, string[]>,
    recipeDescription: string
  ) => {
    // call the function that connects to the server
    generateFinalRecipe(recipeComponents, recipeDescription)
      .then((raw_data) => {
        //return the recipe suggestions in text form
        // let tmp = new Map(Object.entries(raw_data));
        console.log(raw_data);
        setSuggestion([""]);
      })
      .catch((data) => {
        // log the error
        console.log("error", data);
      });
  };

  return (
    <ul>
      <li>
        <p onClick={handleIngInputToggle}>Ingredients</p>
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
        <p onClick={handleAllergiesToggle}>Custom Allergies</p>
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
        {suggestions.length < suggestionsLimit ? (
          <button
            onClick={() =>
              handleGenerateInitialSuggestions(promptComponentMapRef.current)
            }
          >
            Generate
          </button>
        ) : (
          <button onClick={clearSuggestions}>Clear</button>
        )}

        {
          //TODO: add some way of this <p> saving what went into making it component wise
          suggestionsGenerated && (
            <div className="suggestions-display">
              <ul>
                {suggestions.map((value, key) => (
                  <li
                    key={key}
                    onClick={() =>
                      handleGenerateFinalRecipe(
                        promptComponentMapRef.current,
                        value
                      )
                    }
                  >
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          )
        }
      </li>
    </ul>
  );
};

export default RecipeControl;
